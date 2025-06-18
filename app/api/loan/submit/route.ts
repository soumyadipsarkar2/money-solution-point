export const runtime = 'nodejs'

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendLoanApplicationEmail } from '@/lib/email';
import { Resend } from 'resend';
import { EmailTemplate } from '@/lib/email-template';
import { ReactElement } from 'react';

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
const resend = new Resend(process.env.RESEND_API_KEY);

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Performance logging helper
const logPerformance = (operation: string, startTime: number) => {
  const endTime = performance.now();
  console.log(`⏱️ ${operation} took ${(endTime - startTime).toFixed(2)}ms`);
  return endTime;
};

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

interface FileMetadata {
  name: string;
  webViewLink: string;
}

interface FileMetadataRecord {
  [key: string]: FileMetadata[];
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
    const applicationNumber = formData.get('applicationNumber') as string;

    // Parse file metadata and folder structure
    const applicantFileMetadata = JSON.parse(formData.get('applicantFileMetadata') as string) as FileMetadataRecord;
    const coApplicantFileMetadata = JSON.parse(formData.get('coApplicantFileMetadata') as string) as FileMetadataRecord;
    const folderStructure = JSON.parse(formData.get('folderStructure') as string) as FolderStructure;

    // Process the final submission (Google Sheets and Email)
    await processFinalSubmission({
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
      coApplicantFileMetadata,
      folderStructure
    });

    logPerformance('Total submission processing', totalStartTime);

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

// Async function to handle final submission (Google Sheets and Email)
async function processFinalSubmission(data: {
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
  folderStructure: FolderStructure;
}) {
  try {
    // Prepare data for Google Sheets
    const sheetData = [
      new Date().toISOString(),
      data.applicationNumber,
      data.applicantName,
      data.applicantEmail,
      data.applicantPhone,
      data.applicantLocation,
      data.loanAmount,
      data.loanType,
      data.folderStructure.mainFolderLink,
      data.coApplicantName,
      data.coApplicantEmail,
      data.coApplicantPhone,
      data.coApplicantLocation,
      data.coApplicantIncome,
      data.folderStructure.mainFolderLink
    ];

    // Append to Google Sheets
    await appendToSheet(sheetData);

    // Send email notification
    await sendLoanApplicationEmail({
      name: data.applicantName,
      email: data.applicantEmail,
      phone: data.applicantPhone,
      location: data.applicantLocation,
      loanAmount: data.loanAmount,
      loanType: data.loanType,
      googleDriveLink: data.folderStructure.mainFolderLink,
      applicationId: data.applicationNumber,
      googleSheetLink: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=0`
    });

  } catch (error) {
    console.error('❌ Error processing final submission:', error);
    throw error;
  }
}