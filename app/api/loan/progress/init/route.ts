import { NextResponse } from 'next/server';
import { initializeProgress } from '@/lib/upload-progress';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, totalFiles } = body;
    
    console.log('Progress Init API: Initializing progress for sessionId:', sessionId, 'totalFiles:', totalFiles);
    
    if (!sessionId || totalFiles === undefined) {
      return NextResponse.json(
        { error: 'Session ID and total files are required' },
        { status: 400 }
      );
    }

    initializeProgress(sessionId, totalFiles);
    console.log('Progress Init API: Progress initialized successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Progress tracking initialized' 
    });
  } catch (error) {
    console.error('Error initializing progress:', error);
    return NextResponse.json(
      { error: 'Failed to initialize progress' },
      { status: 500 }
    );
  }
} 