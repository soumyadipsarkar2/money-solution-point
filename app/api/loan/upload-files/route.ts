export const runtime = 'nodejs'

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';
import sharp from 'sharp';
import { updateProgress, completeProgress } from '@/lib/upload-progress';

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

// Performance logging helper
const logPerformance = (operation: string, startTime: number) => {
  const endTime = performance.now();
  console.log(`⏱️ ${operation} took ${(endTime - startTime).toFixed(2)}ms`);
  return endTime;
};

// File size limit in bytes (4MB)
const FILE_SIZE_LIMIT = 4 * 1024 * 1024;

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

async function uploadToGoogleDrive(file: File, folderId: string, fileName: string) {
  const startTime = performance.now();
  try {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const compressedBuffer = await compressFile(file);
    
    const media = {
      mimeType: file.type,
      body: Readable.from(compressedBuffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    logPerformance(`Upload to Google Drive: ${fileName} (${(compressedBuffer.length / 1024 / 1024).toFixed(2)}MB)`, startTime);
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading to Google Drive:', error);
    throw error;
  }
}

async function moveBlobToGoogleDrive(blobUrl: string, fileName: string, folderId: string, mimeType: string): Promise<any> {
  const startTime = performance.now();
  try {
    // Download the file from Vercel Blob
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file from Blob: ${response.statusText}`);
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Upload to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType: mimeType || 'application/octet-stream',
      body: Readable.from(buffer),
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });

    logPerformance(`Move blob to Google Drive: ${fileName}`, startTime);
    return file.data;
  } catch (error) {
    console.error('❌ Error moving blob to Google Drive:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  const totalStartTime = performance.now();
  try {
    const formData = await request.formData();
    logPerformance('Parse form data', totalStartTime);
    
    const fileName = formData.get('fileName') as string;
    const folderId = formData.get('folderId') as string;
    const docType = formData.get('docType') as string;
    const isCoApplicant = formData.get('isCoApplicant') === 'true';
    const sessionId = formData.get('sessionId') as string;
    const uploadType = formData.get('uploadType') as string; // 'direct' or 'blob'
    
    // Update progress
    if (sessionId) {
      console.log('Upload Files API: Updating progress for sessionId:', sessionId, 'fileName:', fileName);
      updateProgress(sessionId, fileName, 'uploading');
    }

    let uploadResult;

    if (uploadType === 'direct') {
      // Direct upload to Google Drive (file ≤4MB)
      const file = formData.get('file') as File;
      if (!file) {
        throw new Error('File is required for direct upload');
      }
      
      console.log(`📁 Uploading ${fileName} (${(file.size / 1024 / 1024).toFixed(2)}MB) directly to Google Drive`);
      uploadResult = await uploadToGoogleDrive(file, folderId, fileName);
    } else if (uploadType === 'blob') {
      // Upload from Vercel Blob URL (file >4MB)
      const blobUrl = formData.get('blobUrl') as string;
      const mimeType = formData.get('mimeType') as string;
      
      if (!blobUrl) {
        throw new Error('Blob URL is required for blob upload');
      }
      
      console.log(`📁 Moving ${fileName} from Vercel Blob to Google Drive`);
      uploadResult = await moveBlobToGoogleDrive(blobUrl, fileName, folderId, mimeType);
    } else {
      throw new Error('Invalid upload type');
    }

    logPerformance('Total file upload', totalStartTime);

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      fileId: uploadResult.id,
      webViewLink: uploadResult.webViewLink,
      fileName: uploadResult.name
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 