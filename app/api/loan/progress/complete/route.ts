import { NextResponse } from 'next/server';
import { completeProgress } from '@/lib/upload-progress';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId } = body;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    completeProgress(sessionId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Progress marked as completed' 
    });
  } catch (error) {
    console.error('Error completing progress:', error);
    return NextResponse.json(
      { error: 'Failed to complete progress' },
      { status: 500 }
    );
  }
} 