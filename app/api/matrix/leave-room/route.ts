// app/api/matrix/leave-room/route.ts
// Backend API endpoint to leave Matrix rooms

import { NextRequest, NextResponse } from 'next/server';

const MATRIX_HOMESERVER_URL = process.env.NEXT_PUBLIC_MATRIX_HOMESERVER || 'https://matrix.org';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002';

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Request timeout') as any;
      timeoutError.isTimeout = true;
      throw timeoutError;
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Leave Room API Called ===');
    
    const body = await request.json();
    const { accessToken, roomId } = body;

    // Validation
    if (!accessToken) {
      console.error('❌ No access token provided');
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    if (!roomId) {
      console.error('❌ No room ID provided');
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      );
    }

    console.log('Leaving room:', roomId);

    // Make request to Matrix server
    const response = await fetchWithTimeout(
      `${MATRIX_HOMESERVER_URL}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/leave`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
      REQUEST_TIMEOUT
    );

    console.log('Matrix server response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Matrix server error:', response.status, errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }

      let errorMessage = 'Failed to leave room';
      let suggestion = '';
      
      if (response.status === 404) {
        errorMessage = 'Room not found or you are not a member of this room.';
      } else if (response.status === 403) {
        errorMessage = 'You do not have permission to leave this room.';
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          errcode: errorData.errcode || `HTTP_${response.status}`,
          details: errorText,
          suggestion
        },
        { status: response.status }
      );
    }

    console.log('✅ Left room successfully from Matrix');

    // Now check if we should clean up the room from database
    // Call the server API to handle database cleanup
    try {
      console.log('📞 Notifying server about room leave for cleanup...');
      const cleanupResponse = await fetch(`${SERVER_API_URL}/api/matrix/rooms/${encodeURIComponent(roomId)}/leave-cleanup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ roomId }),
      });

      if (cleanupResponse.ok) {
        const cleanupData = await cleanupResponse.json();
        console.log('✅ Server cleanup result:', cleanupData);
      } else {
        console.warn('⚠️ Server cleanup failed (non-critical):', await cleanupResponse.text());
      }
    } catch (cleanupError: any) {
      // Non-critical error - we already left the room in Matrix
      console.warn('⚠️ Server cleanup request failed (non-critical):', cleanupError.message);
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('❌ Server error leaving room:', error);
    console.error('Error stack:', error.stack);
    
    if (error.isTimeout) {
      return NextResponse.json(
        { 
          error: 'The Matrix server is taking too long to respond.',
          errcode: 'REQUEST_TIMEOUT',
          suggestion: 'Please try again in a few moments.'
        },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error while leaving room',
        details: error.message,
        type: error.name
      },
      { status: 500 }
    );
  }
}