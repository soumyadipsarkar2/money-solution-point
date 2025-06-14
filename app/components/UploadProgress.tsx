'use client';

import { useEffect, useState } from 'react';

interface UploadProgress {
  totalFiles: number;
  uploadedFiles: number;
  currentFile: string;
  status: 'preparing' | 'uploading' | 'processing' | 'completed';
  percentage: number;
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

  const getStatusColor = (status: UploadProgress['status']) => {
    switch (status) {
      case 'preparing': return 'text-blue-500';
      case 'processing': return 'text-yellow-500';
      case 'uploading': return 'text-green-500';
      case 'completed': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: UploadProgress['status']) => {
    switch (status) {
      case 'preparing': return 'Preparing files...';
      case 'processing': return 'Processing files...';
      case 'uploading': return 'Uploading files...';
      case 'completed': return 'Upload completed!';
      default: return 'Processing...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Upload Progress</h3>
        <span className={`text-sm ${getStatusColor(progress.status)}`}>
          {getStatusText(progress.status)}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{progress.uploadedFiles} of {progress.totalFiles} files</span>
        <span>{progress.percentage}%</span>
      </div>
      
      {progress.currentFile && (
        <p className="text-sm text-gray-500 mt-2 truncate">
          Current file: {progress.currentFile}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}
    </div>
  );
} 