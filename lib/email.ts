import { Resend } from 'resend';
import { EmailTemplate } from './email-template';
import { ReactElement } from 'react';

// Initialize Resend with environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLoanApplicationEmail({
  name,
  email,
  phone,
  location,
  loanAmount,
  loanType,
  message,
  googleDriveLink,
  applicationId,
  googleSheetLink,
}: {
  name: string;
  email: string;
  phone: string;
  location: string;
  loanAmount: string;
  loanType: string;
  message?: string;
  googleDriveLink: string;
  applicationId: string;
  googleSheetLink: string;
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    console.log('Sending email to:', email);
    console.log('Application ID:', applicationId);

    // Send to applicant (using verified email for testing)
    const result = await resend.emails.send({
      from: 'Money Solution Point <onboarding@resend.dev>',
      to: 'srishtiagarwal411@gmail.com', // Using verified email for testing
      subject: `Loan Application Submitted - ${applicationId}`,
      react: EmailTemplate({
        name,
        email,
        phone,
        location,
        loanAmount,
        loanType,
        message,
        googleDriveLink,
        applicationId,
        googleSheetLink,
      }) as ReactElement,
    });

    console.log('Email sent successfully:', result);

    // Send to company (using verified email for testing)
    // await resend.emails.send({
    //   from: 'Money Solution Point <onboarding@resend.dev>',
    //   to: 'somshich@gmail.com', // Using verified email for testing
    //   subject: `New Loan Application - ${applicationId}`,
    //   react: EmailTemplate({
    //     name,
    //     email,
    //     phone,
    //     location,
    //     loanAmount,
    //     loanType,
    //     message,
    //     googleDriveLink,
    //     applicationId,
    //     googleSheetLink,
    //   }) as ReactElement,
    // });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
} 