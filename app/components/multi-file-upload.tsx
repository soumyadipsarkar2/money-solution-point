import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface MultiFileUploadProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  value?: File[];
  onChange?: (id: string, files: File[], isCoApplicant?: boolean) => void;
  error?: string;
  isCoApplicant?: boolean;
}

export default function MultiFileUpload({
  id,
  label,
  description,
  required,
  accept,
  maxFiles,
  maxSize,
  value,
  onChange,
  error,
  isCoApplicant = false,
}: MultiFileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (onChange) {
        onChange(id, acceptedFiles, isCoApplicant);
      }
    },
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles,
    maxSize,
  });

  const fileCount = value?.length || 0;
  const fileText = fileCount === 1 ? 'file' : 'files';

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
          ${error ? 'border-red-500' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag & drop files here, or click to select files
                {maxFiles && <span> (max {maxFiles} files)</span>}
              </p>
            )}
          </div>
          {fileCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {fileCount} {fileText} selected
            </p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 