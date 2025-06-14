import { Resend } from 'resend';
import { EmailTemplate } from './email-template';

const resend = new Resend('re_hnqhL722_53Dfar9si5vX3AvYvecZCcNa');

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
}) {
  try {
    // Send to applicant
    await resend.emails.send({
      from: 'Money Solution Point <noreply@moneysolutionpoint.com>',
      to: email,
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
      }),
    });

    // Send to company
    await resend.emails.send({
      from: 'Money Solution Point <noreply@moneysolutionpoint.com>',
      to: 'moneysolutionpoint2004@gmail.com',
      subject: `New Loan Application - ${applicationId}`,
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
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
} 