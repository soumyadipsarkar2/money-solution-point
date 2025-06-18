// Simple in-memory progress tracking
// In production, you might want to use Redis or a database

interface UploadProgress {
  totalFiles: number;
  uploadedFiles: number;
  currentFile: string;
  status: 'preparing' | 'uploading' | 'processing' | 'completed';
  percentage: number;
}

const progressStore = new Map<string, UploadProgress>();

export function initializeProgress(sessionId: string, totalFiles: number): void {
  progressStore.set(sessionId, {
    totalFiles,
    uploadedFiles: 0,
    currentFile: '',
    status: 'preparing',
    percentage: 0
  });
}

export function updateProgress(
  sessionId: string, 
  currentFile: string, 
  status: UploadProgress['status'] = 'uploading'
): void {
  const progress = progressStore.get(sessionId);
  if (progress) {
    progress.currentFile = currentFile;
    progress.status = status;
    if (status === 'uploading') {
      progress.uploadedFiles += 1;
    }
    progress.percentage = Math.round((progress.uploadedFiles / progress.totalFiles) * 100);
    progressStore.set(sessionId, progress);
  }
}

export function getProgress(sessionId: string): UploadProgress | null {
  return progressStore.get(sessionId) || null;
}

export function completeProgress(sessionId: string): void {
  const progress = progressStore.get(sessionId);
  if (progress) {
    progress.status = 'completed';
    progress.percentage = 100;
    progressStore.set(sessionId, progress);
  }
}

export function clearProgress(sessionId: string): void {
  progressStore.delete(sessionId);
} 