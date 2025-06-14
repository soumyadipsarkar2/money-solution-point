'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';

interface UploadProgress {
  totalFiles: number;
  uploadedFiles: number;
  currentFile: string;
  currentStep: string;
  status: 'preparing' | 'uploading' | 'processing' | 'completed' | 'error';
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

export default function UploadProgress() {
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pollProgress = async () => {
      try {
        const response = await fetch('/api/loan/submit');
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();
        setProgress(data);
        
        // Continue polling if not completed
        if (data.status !== 'completed') {
          setTimeout(pollProgress, 1000);
        }
      } catch (err) {
        setError('Failed to fetch upload progress');
        console.error('Error fetching progress:', err);
      }
    };

    pollProgress();
  }, []);

  if (!progress) return null;

  const getStepIcon = (status: 'pending' | 'in-progress' | 'completed' | 'error') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md w-full z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Document Processing Status</h3>
        <span className={`text-sm ${
          progress.status === 'completed' ? 'text-green-600' :
          progress.status === 'error' ? 'text-red-500' :
          'text-blue-500'
        }`}>
          {progress.status === 'completed' ? 'Completed' :
           progress.status === 'error' ? 'Error' :
           'Processing...'}
        </span>
      </div>

      <div className="space-y-4">
        {progress.steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              {getStepIcon(step.status)}
              <span className={`text-sm font-medium ${
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'in-progress' ? 'text-blue-600' :
                step.status === 'error' ? 'text-red-500' :
                'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            
            {step.status === 'in-progress' && step.files.length > 0 && (
              <div className="ml-6 space-y-1">
                {step.files.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center gap-2">
                    {file.isProcessing && (
                      <Loader2 className="h-3 w-3 text-blue-500 animate-spin" />
                    )}
                    <p 
                      className={`text-xs text-gray-500 truncate transition-all duration-300 ${
                        file.isProcessing ? 'text-blue-500' : ''
                      }`}
                    >
                      {file.folder ? (
                        <span>
                          <span className={`${file.isProcessing ? 'text-blue-500' : 'text-gray-400'}`}>
                            {file.folder}
                          </span>
                          <span className="mx-1">/</span>
                          <span>{file.name}</span>
                        </span>
                      ) : (
                        file.name
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {step.status === 'error' && step.error && (
              <div className="ml-6">
                <p className="text-xs text-red-500">
                  {step.error}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
} 