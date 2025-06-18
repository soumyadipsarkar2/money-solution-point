export const runtime = 'nodejs'

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

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

// Initialize Google Drive API
const drive = google.drive({ version: 'v3', auth });

const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Performance logging helper
const logPerformance = (operation: string, startTime: number) => {
  const endTime = performance.now();
  console.log(`⏱️ ${operation} took ${(endTime - startTime).toFixed(2)}ms`);
  return endTime;
};

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

interface FolderStructure {
  mainFolderId: string;
  applicantFolderId: string;
  coApplicantFolderId?: string;
  applicantSubfolders: Record<string, string>;
  coApplicantSubfolders: Record<string, string>;
  mainFolderLink: string;
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

    // Parse file metadata to determine which folders need to be created
    const applicantFileMetadata = JSON.parse(formData.get('applicantFileMetadata') as string);
    const coApplicantFileMetadata = JSON.parse(formData.get('coApplicantFileMetadata') as string);

    // Generate application number
    const applicationNumber = `MSP-${Date.now().toString().slice(-8)}`;

    // Create folder structure
    const folderStructure = await createFolderStructure(
      applicantName,
      applicationNumber,
      applicantFileMetadata,
      coApplicantFileMetadata,
      coApplicantName
    );

    logPerformance('Total folder creation', totalStartTime);

    return NextResponse.json({ 
      success: true, 
      message: 'Folders created successfully',
      applicationNumber,
      folderStructure
    });

  } catch (error) {
    console.error('Error creating folders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create folders' },
      { status: 500 }
    );
  }
}

async function createFolderStructure(
  applicantName: string,
  applicationNumber: string,
  applicantFileMetadata: Record<string, any[]>,
  coApplicantFileMetadata: Record<string, any[]>,
  coApplicantName?: string
): Promise<FolderStructure> {
  try {
    // Create main folder with application number
    const folderName = `${applicantName} - ${applicationNumber}`;
    const mainFolderId = await createFolder(folderName);
    if (!mainFolderId) {
      throw new Error('Failed to create main folder');
    }

    // Get the main folder link immediately after creation
    const folderData = await drive.files.get({
      fileId: mainFolderId,
      fields: 'webViewLink',
    });

    if (!folderData.data?.webViewLink) {
      throw new Error('Failed to get folder link');
    }

    // Create Applicant Details folder
    const applicantFolderId = await createFolder('Applicant Details', mainFolderId);
    if (!applicantFolderId) {
      throw new Error('Failed to create applicant folder');
    }

    // Create subfolders for applicant documents that have multiple files
    const applicantSubfolders: Record<string, string> = {};
    for (const [docId, files] of Object.entries(applicantFileMetadata)) {
      const doc = applicantDocuments.find(d => d.key === docId);
      if (!doc) continue;

      if (files.length > 1 || doc.key === 'property_photos_and_videos') {
        const subfolderId = await createFolder(doc.name, applicantFolderId);
        if (subfolderId) {
          applicantSubfolders[docId] = subfolderId;
        }
      }
    }

    // Create Co-Applicant Details folder if co-applicant exists
    let coApplicantFolderId: string | undefined = undefined;
    const coApplicantSubfolders: Record<string, string> = {};
    
    if (coApplicantName) {
      const coFolderId = await createFolder('Co-Applicant Details', mainFolderId);
      if (!coFolderId) {
        throw new Error('Failed to create co-applicant folder');
      }
      coApplicantFolderId = coFolderId;

      // Create subfolders for co-applicant documents that have multiple files
      for (const [docId, files] of Object.entries(coApplicantFileMetadata)) {
        const doc = coApplicantDocuments.find(d => d.key === docId);
        if (!doc) continue;

        if (files.length > 1) {
          const subfolderId = await createFolder(doc.name, coApplicantFolderId);
          if (subfolderId) {
            coApplicantSubfolders[docId] = subfolderId;
          }
        }
      }
    }

    return {
      mainFolderId,
      applicantFolderId,
      coApplicantFolderId,
      applicantSubfolders,
      coApplicantSubfolders,
      mainFolderLink: folderData.data.webViewLink
    };

  } catch (error) {
    console.error('❌ Error creating folder structure:', error);
    throw error;
  }
} 