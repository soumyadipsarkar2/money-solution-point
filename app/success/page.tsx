'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const applicationNumber = searchParams.get('applicationNumber');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Application Submitted Successfully
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your loan application has been submitted successfully. We will process your application and get back to you soon.
          </p>
          {applicationNumber && (
            <p className="mt-4 text-sm font-medium text-gray-900">
              Application Number: {applicationNumber}
            </p>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 