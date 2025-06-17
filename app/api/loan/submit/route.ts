export const runtime = 'nodejs'

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import sharp from 'sharp';
import { sendLoanApplicationEmail } from '@/lib/email';
import { Resend } from 'resend';
import { EmailTemplate } from '@/lib/email-template';
import { ReactElement } from 'react';

// Progress tracking
interface UploadProgress {
  totalFiles: number;
  uploadedFiles: number;
  currentFile: string;
  currentStep: string;
  status: 'preparing' | 'uploading' | 'processing' | 'completed' | 'error' | 'downloading';
  percentage: number;
  steps: {
    name: string;
    status: 'pending' | 'in-progress' | 'completed' | 'error';
    files: {
      name: string;
      folder?: string;
      isProcessing?: boolean;
    }[];
    error?: string;
  }[];
}

// Global progress tracking
let uploadProgress: UploadProgress = {
  totalFiles: 0,
  uploadedFiles: 0,
  currentFile: '',
  currentStep: '',
  status: 'preparing',
  percentage: 0,
  steps: [
    { name: 'Creating Folders', status: 'pending', files: [] },
    { name: 'Processing Files', status: 'pending', files: [] },
    { name: 'Finalizing Application', status: 'pending', files: [] }
  ]
};

// Document configurations
const applicantDocuments = [
  { name: 'PAN Card', key: 'pan' },
  { name: 'Aadhaar Card', key: 'aadhaar' },
  { name: 'Photographs', key: 'photos' },
  { name: 'Bank Statement', key: 'bank_statement' },
  { name: 'ITR', key: 'itr' },
  { name: 'GST Returns', key: 'gst' },
  { name: 'Loan History', key: 'loan_history' },
  { name: 'Property Documents', key: 'property_docs' },
  { name: 'Property Photos and Videos', key: 'property_photos_and_videos' },
  { name: 'Other Documents', key: 'other' },
];

const coApplicantDocuments = [
  { name: 'PAN Card', key: 'co_pan' },
  { name: 'Aadhaar Card', key: 'co_aadhaar' },
  { name: 'Photographs', key: 'co_photos' },
  { name: 'Income Proof', key: 'co_income' },
];

// Progress update helper
function updateProgress(currentFile: string, currentStep: string, status: UploadProgress['status'], folder?: string) {
  uploadProgress.currentFile = currentFile;
  uploadProgress.currentStep = currentStep;
  uploadProgress.status = status;
  
  // Reset error state when starting a new file
  if (status !== 'error') {
    uploadProgress.uploadedFiles++;
    uploadProgress.percentage = Math.round((uploadProgress.uploadedFiles / uploadProgress.totalFiles) * 100);
  }
  
  // Update step status
  const currentStepIndex = uploadProgress.steps.findIndex(step => step.name === currentStep);
  if (currentStepIndex !== -1) {
    // Reset isProcessing flag and error for all files in this step
    uploadProgress.steps[currentStepIndex].files.forEach(file => {
      file.isProcessing = false;
    });
    uploadProgress.steps[currentStepIndex].error = undefined;

    // Add new file with isProcessing flag
    uploadProgress.steps[currentStepIndex].status = status === 'error' ? 'error' : 'in-progress';
    uploadProgress.steps[currentStepIndex].files.push({
      name: currentFile,
      folder: folder,
      isProcessing: status !== 'error'
    });
  }
  
  console.log(`📊 Progress: ${uploadProgress.percentage}% - ${currentStep} - ${folder ? folder + '/' : ''}${currentFile} (${status})`);
}

// Performance logging helper
const logPerformance = (operation: string, startTime: number) => {
  const endTime = performance.now();
  console.log(`⏱️ ${operation} took ${(endTime - startTime).toFixed(2)}ms`);
  return endTime;
};

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
});

// Initialize Google APIs
const sheets = google.sheets({ version: 'v4', auth });
const drive = google.drive({ version: 'v3', auth });
const resend = new Resend(process.env.RESEND_API_KEY);

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper functions
async function appendToSheet(values: any[]) {
  const startTime = performance.now();
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Loan Application!A:Z',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
    logPerformance('Append to sheet', startTime);
    return response.data;
  } catch (error) {
    console.error('❌ Error appending to sheet:', error);
    throw error;
  }
}

async function createFolder(folderName: string, parentFolderId?: string) {
  const startTime = performance.now();
  try {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [DRIVE_FOLDER_ID!],
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    logPerformance(`Create folder: ${folderName}`, startTime);
    return response.data?.id;
  } catch (error) {
    console.error('❌ Error creating folder:', error);
    throw error;
  }
}

async function compressFile(file: File): Promise<Buffer> {
  const startTime = performance.now();
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Only compress images
    if (file.type.startsWith('image/')) {
      const compressed = await sharp(buffer)
        .resize(1920, 1920, { // Max dimensions
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 }) // Adjust quality
        .toBuffer();
      
      logPerformance(`Compress image: ${file.name}`, startTime);
      return compressed;
    }
    
    return buffer;
  } catch (error) {
    console.error('❌ Error compressing file:', error);
    return Buffer.from(await file.arrayBuffer());
  }
}

async function uploadFile(file: any, folderId: string, fileName: string) {
  const startTime = performance.now();
  try {
    updateProgress(fileName, 'preparing', 'preparing');
    
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    updateProgress(fileName, 'processing', 'processing');
    const compressedBuffer = await compressFile(file);
    
    const media = {
      mimeType: file.type,
      body: Readable.from(compressedBuffer),
    };

    updateProgress(fileName, 'uploading', 'uploading');
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    logPerformance(`Upload file: ${fileName} (${(compressedBuffer.length / 1024 / 1024).toFixed(2)}MB)`, startTime);
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading file:', error);
    throw error;
  }
}

interface DriveError extends Error {
  code?: string;
}

async function uploadFileWithRetry(file: any, folderId: string, fileName: string, retryCount = 0): Promise<any> {
  try {
    updateProgress(fileName, 'uploading', 'uploading');
    
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    // const compressedBuffer = await compressFile(file);
    const buffer = Buffer.from(await file.arrayBuffer());

    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return response.data;
  } catch (error) {
    const driveError = error as DriveError;
    if (retryCount < MAX_RETRIES && driveError.code === 'ETIMEDOUT') {
      console.log(`Retrying upload for ${fileName} (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return uploadFileWithRetry(file, folderId, fileName, retryCount + 1);
    }
    throw error;
  }
}

interface FileMetadata {
  name: string;
  webViewLink: string;
}

interface FileMetadataRecord {
  [key: string]: FileMetadata[];
}

// Add progress endpoint
export async function GET() {
  return NextResponse.json(uploadProgress);
}

export async function POST(request: Request) {
  const totalStartTime = performance.now();
  try {
    if (!DRIVE_FOLDER_ID) {
      throw new Error('DRIVE_FOLDER_ID is not configured');
    }

    const formData = await request.formData();
    logPerformance('Parse form data', totalStartTime);
    
    // Extract form data
    const applicantName = formData.get('name') as string;
    const applicantEmail = formData.get('email') as string;
    const applicantPhone = formData.get('phone') as string;
    const applicantLocation = formData.get('location') as string;
    const loanAmount = formData.get('loanAmount') as string;
    const loanType = formData.get('loanType') as string;
    const coApplicantName = formData.get('coName') as string;
    const coApplicantEmail = formData.get('coEmail') as string;
    const coApplicantPhone = formData.get('coPhone') as string;
    const coApplicantLocation = formData.get('coLocation') as string;
    const coApplicantIncome = formData.get('coIncome') as string;

    // Parse file metadata
    const applicantFileMetadata = JSON.parse(formData.get('applicantFileMetadata') as string) as FileMetadataRecord;
    const coApplicantFileMetadata = JSON.parse(formData.get('coApplicantFileMetadata') as string) as FileMetadataRecord;

    // Generate application number
    const applicationNumber = `MSP-${Date.now().toString().slice(-8)}`;

    // Start async Google Drive upload process
    processGoogleDriveUpload({
      applicationNumber,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantLocation,
      loanAmount,
      loanType,
      coApplicantName,
      coApplicantEmail,
      coApplicantPhone,
      coApplicantLocation,
      coApplicantIncome,
      applicantFileMetadata,
      coApplicantFileMetadata
    }).catch(error => {
      console.error('Error in async Google Drive upload:', error);
      // Log the error but don't throw since this is async
    });

    // Return success immediately
    return NextResponse.json({ 
      success: true, 
      message: 'Loan application submitted successfully',
      applicationNumber
    });

  } catch (error) {
    console.error('Error processing loan application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process loan application' },
      { status: 500 }
    );
  }
}

// Async function to handle Google Drive upload
async function processGoogleDriveUpload(data: {
  applicationNumber: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantLocation: string;
  loanAmount: string;
  loanType: string;
  coApplicantName?: string;
  coApplicantEmail?: string;
  coApplicantPhone?: string;
  coApplicantLocation?: string;
  coApplicantIncome?: string;
  applicantFileMetadata: FileMetadataRecord;
  coApplicantFileMetadata: FileMetadataRecord;
}) {
  try {
    // Create applicant folder with application number
    const folderName = `${data.applicantName} - ${data.applicationNumber}`;
    const mainFolderId = await createFolder(folderName);
    if (!mainFolderId) {
      throw new Error('Failed to create main folder');
    }

    // Create Applicant Details and Co-Applicant Details folders
    const applicantFolderId = await createFolder('Applicant Details', mainFolderId);
    if (!applicantFolderId) {
      throw new Error('Failed to create applicant folder');
    }

    let coApplicantFolderId: string | undefined = undefined;
    if (data.coApplicantName) {
      const coFolderId = await createFolder('Co-Applicant Details', mainFolderId);
      if (!coFolderId) {
        throw new Error('Failed to create co-applicant folder');
      }
      coApplicantFolderId = coFolderId;
    }

    // Process applicant documents
    for (const [docId, files] of Object.entries(data.applicantFileMetadata)) {
      const doc = applicantDocuments.find(d => d.key === docId);
      if (!doc) continue;

      if (files.length > 1 || doc.key === 'property_photos_and_videos') {
        const subfolderId = await createFolder(doc.name, applicantFolderId);
        
        for (const file of files) {
          await moveFileToFolder(file.webViewLink, file.name, subfolderId!);
        }
      } else {
        const file = files[0];
        await moveFileToFolder(file.webViewLink, file.name, applicantFolderId);
      }
    }

    // Process co-applicant documents
    if (coApplicantFolderId) {
      for (const [docId, files] of Object.entries(data.coApplicantFileMetadata)) {
        const doc = coApplicantDocuments.find(d => d.key === docId);
        if (!doc) continue;

        if (files.length > 1) {
          const subfolderId = await createFolder(doc.name, coApplicantFolderId);
          
          for (const file of files) {
            await moveFileToFolder(file.webViewLink, file.name, subfolderId!);
          }
        } else {
          const file = files[0];
          await moveFileToFolder(file.webViewLink, file.name, coApplicantFolderId);
        }
      }
    }

    // Get the main folder link
    const folderData = await drive.files.get({
      fileId: mainFolderId,
      fields: 'webViewLink',
    });

    if (!folderData.data?.webViewLink) {
      throw new Error('Failed to get folder link');
    }

    // Prepare data for Google Sheets
    const sheetData = [
      new Date().toISOString(),
      data.applicantName,
      data.applicantEmail,
      data.applicantPhone,
      data.applicantLocation,
      data.loanAmount,
      data.loanType,
      folderData.data.webViewLink,
      data.coApplicantName,
      data.coApplicantEmail,
      data.coApplicantPhone,
      data.coApplicantLocation,
      data.coApplicantIncome,
      folderData.data.webViewLink
    ];

    // Append to Google Sheets
    await appendToSheet(sheetData);

  } catch (error) {
    console.error('Error in async Google Drive upload process:', error);
    // Log the error but don't throw since this is async
  }
}

// Helper function to move a file to a new folder
async function moveFileToFolder(blobUrl: string, fileName: string, folderId: string): Promise<void> {
  const startTime = performance.now();
  try {
    // Extract the blob ID from the URL
    const blobId = blobUrl.split('/').pop();
    if (!blobId) {
      throw new Error('Invalid blob URL');
    }

    // Download the file from Vercel Blob
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file from Blob: ${response.statusText}`);
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Upload to Google Drive
    const fileMetadata = {
      name: `${fileName}`,
      parents: [folderId],
    };

    const media = {
      mimeType: blob.type || 'application/octet-stream',
      body: Readable.from(buffer),
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });

    if (!file.data.id) {
      throw new Error('Failed to upload file to Google Drive');
    }

    logPerformance('File upload to Google Drive', startTime);
  } catch (error) {
    logPerformance('File upload to Google Drive (failed)', startTime);
    throw error;
  }
}