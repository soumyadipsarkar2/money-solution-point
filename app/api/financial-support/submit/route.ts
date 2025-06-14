import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CTAEmailTemplate } from '@/lib/cta-email-template';
import { CustomerEmailTemplate } from '@/lib/customer-email-template';
import { ReactElement } from 'react';
import { google } from 'googleapis';

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

// Initialize Google Sheets API
const sheets = google.sheets({ version: 'v4', auth });
const resend = new Resend(process.env.RESEND_API_KEY);

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Helper function to append data to sheet
async function appendToSheet(values: any[]) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet2!A:Z',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error appending to sheet:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const loanType = formData.get('loanType') as string;
    const loanAmount = formData.get('loanAmount') as string;
    const message = formData.get('message') as string;

    // Generate a unique submission ID
    const submissionId = `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare data for Google Sheets
    const sheetData = [
      new Date().toISOString(),
      submissionId,
      name,
      email,
      phone,
      loanType,
      loanAmount,
      message || ''
    ];

    // First append to Google Sheets
    await appendToSheet(sheetData);
    console.log('Appended to Google Sheets');
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    // Send email to company
    try {
      const result = await resend.emails.send({
        from: 'Money Solution Point <onboarding@resend.dev>',
        to: 'somshich@gmail.com',
        subject: `New Loan Inquiry from ${name}`,
        react: CTAEmailTemplate({
          name,
          email,
          phone,
          loanType,
          loanAmount,
          message,
          submissionId,
        }) as ReactElement,
      });
      console.log("✅ Email sent result:", result);
    } catch (err) {
      console.error("❌ Error sending email:", err);
    }    

    console.log('Email sent to company');

    // Send confirmation email to customer
    // await resend.emails.send({
    //   from: 'Money Solution Point <noreply@moneysolutionpoint.com>',
    //   to: email,
    //   subject: 'Thank You for Your Loan Inquiry - Money Solution Point',
    //   react: CustomerEmailTemplate({
    //     name,
    //     loanType,
    //     loanAmount,
    //     submissionId,
    //   }) as ReactElement,
    // });

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId,
      redirect: '/thank-you'
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit form. Please try again.' 
      },
      { status: 500 }
    );
  }
} 