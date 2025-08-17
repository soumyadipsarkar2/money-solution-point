import { NextResponse } from 'next/server';
import { getProgress } from '@/lib/upload-progress';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    console.log('Progress API: Requested progress for sessionId:', sessionId);
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const progress = getProgress(sessionId);
    console.log('Progress API: Retrieved progress:', progress);
    
    if (!progress) {
      return NextResponse.json(
        { error: 'No progress found for this session' },
        { status: 404 }
      );
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error getting progress:', error);
    return NextResponse.json(
      { error: 'Failed to get progress' },
      { status: 500 }
    );
  }
} 