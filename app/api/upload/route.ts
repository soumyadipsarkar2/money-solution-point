import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
  ],
});

// Initialize Google Drive API
const drive = google.drive({ version: 'v3', auth });

const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Progress tracking
let uploadProgress = {
  currentFile: '',
  status: 'uploading' as 'uploading' | 'completed' | 'error'
};

export async function GET() {
  return NextResponse.json(uploadProgress);
}

export async function POST(request: Request) {
  try {
    if (!DRIVE_FOLDER_ID) {
      throw new Error('DRIVE_FOLDER_ID is not configured');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const docType = formData.get('docType') as string;

    if (!file || !fileName || !docType) {
      throw new Error('Missing required fields');
    }

    // Update progress
    uploadProgress.currentFile = fileName;
    uploadProgress.status = 'uploading';

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    if (!response.data?.webViewLink) {
      throw new Error('Failed to get file link');
    }

    // Update progress
    uploadProgress.status = 'completed';

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    uploadProgress.status = 'error';
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 