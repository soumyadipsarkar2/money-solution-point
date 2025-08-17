'use client';

import { Check, Loader2, FolderOpen, FileText } from 'lucide-react';

interface FileProgress {
  fileName: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface DocumentProgress {
  docId: string;
  docName: string;
  files: FileProgress[];
}

interface StepProgressProps {
  isVisible: boolean;
  currentStep: 'folders' | 'applicant' | 'co-applicant' | 'completed';
  folderStatus: 'pending' | 'creating' | 'completed' | 'error';
  applicantDocs: DocumentProgress[];
  coApplicantDocs: DocumentProgress[];
  currentUploadingFile?: string;
}

export default function StepProgress({
  isVisible,
  currentStep,
  folderStatus,
  applicantDocs,
  coApplicantDocs,
  currentUploadingFile
}: StepProgressProps) {
  if (!isVisible) return null;

  const getStepIcon = (step: string, status: string) => {
    if (status === 'completed') {
      return <Check className="h-5 w-5 text-green-600" />;
    }
    if (status === 'creating' || status === 'uploading') {
      return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    }
    if (step === 'folders') {
      return <FolderOpen className="h-5 w-5 text-gray-400" />;
    }
    return <FileText className="h-5 w-5 text-gray-400" />;
  };

  const getStepStatus = (step: string, status: string) => {
    if (status === 'completed') return 'text-green-600';
    if (status === 'creating' || status === 'uploading') return 'text-blue-600';
    return 'text-gray-400';
  };

  const getFileIcon = (status: string) => {
    if (status === 'completed') {
      return <Check className="h-4 w-4 text-green-600" />;
    }
    if (status === 'uploading') {
      return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
    }
    return <FileText className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">Processing Your Application</h2>
          
          {/* Step 1: Folder Creation */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              {getStepIcon('folders', folderStatus)}
              <span className={`font-medium ${getStepStatus('folders', folderStatus)}`}>
                Creating Application Folders
              </span>
            </div>
            {folderStatus === 'creating' && (
              <p className="text-sm text-gray-600 ml-8">Setting up your application structure...</p>
            )}
            {folderStatus === 'completed' && (
              <p className="text-sm text-green-600 ml-8">✓ Folders created successfully</p>
            )}
          </div>

          {/* Step 2: Applicant Documents */}
          {currentStep === 'applicant' || currentStep === 'co-applicant' || currentStep === 'completed' ? (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                {getStepIcon('applicant', currentStep === 'applicant' ? 'uploading' : 'completed')}
                <span className={`font-medium ${getStepStatus('applicant', currentStep === 'applicant' ? 'uploading' : 'completed')}`}>
                  Processing Applicant Documents
                </span>
              </div>
              
              <div className="ml-8 space-y-2">
                {applicantDocs.map((doc) => (
                  <div key={doc.docId} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">{doc.docName}</span>
                    </div>
                    <div className="space-y-1">
                      {doc.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {getFileIcon(file.status)}
                          <span className={file.status === 'completed' ? 'text-green-600' : file.status === 'uploading' ? 'text-blue-600' : 'text-gray-500'}>
                            {file.fileName}
                          </span>
                          {file.fileName === currentUploadingFile && file.status === 'uploading' && (
                            <span className="text-xs text-blue-600">(Uploading...)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Step 3: Co-Applicant Documents */}
          {coApplicantDocs.length > 0 && (currentStep === 'co-applicant' || currentStep === 'completed') ? (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                {getStepIcon('co-applicant', currentStep === 'co-applicant' ? 'uploading' : 'completed')}
                <span className={`font-medium ${getStepStatus('co-applicant', currentStep === 'co-applicant' ? 'uploading' : 'completed')}`}>
                  Processing Co-Applicant Documents
                </span>
              </div>
              
              <div className="ml-8 space-y-2">
                {coApplicantDocs.map((doc) => (
                  <div key={doc.docId} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">{doc.docName}</span>
                    </div>
                    <div className="space-y-1">
                      {doc.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {getFileIcon(file.status)}
                          <span className={file.status === 'completed' ? 'text-green-600' : file.status === 'uploading' ? 'text-blue-600' : 'text-gray-500'}>
                            {file.fileName}
                          </span>
                          {file.fileName === currentUploadingFile && file.status === 'uploading' && (
                            <span className="text-xs text-blue-600">(Uploading...)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Completion Message */}
          {currentStep === 'completed' && (
            <div className="text-center pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="font-medium">Redirecting to application submission page...</span>
              </div>
              <p className="text-sm text-gray-600">Please wait while we process your application.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 