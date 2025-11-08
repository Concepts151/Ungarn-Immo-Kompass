// app/api/matrix/create-room/route.ts
// Backend API endpoint to create Matrix rooms with improved error handling

import { NextRequest, NextResponse } from 'next/server';

const MATRIX_HOMESERVER_URL = process.env.NEXT_PUBLIC_MATRIX_HOMESERVER || 'https://matrix.org';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;

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

async function createRoomWithRetry(
  accessToken: string,
  requestBody: any,
  maxRetries: number = MAX_RETRIES
): Promise<Response> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1}/${maxRetries + 1} to create room...`);
      
      const response = await fetchWithTimeout(
        `${MATRIX_HOMESERVER_URL}/_matrix/client/v3/createRoom`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
        REQUEST_TIMEOUT
      );

      // If successful or client error (4xx), return immediately
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      // For 5xx errors, retry
      if (response.status >= 500 && attempt < maxRetries) {
        console.log(`Server error ${response.status}, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
        continue;
      }

      return response;
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on timeout if it's the last attempt
      if (error.isTimeout && attempt < maxRetries) {
        console.log(`Request timeout, retrying (attempt ${attempt + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      
      // If it's not a timeout or last attempt, throw
      if (!error.isTimeout || attempt === maxRetries) {
        throw error;
      }
    }
  }
  
  throw lastError;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Room Creation API Called ===');
    console.log('Homeserver URL:', MATRIX_HOMESERVER_URL);
    
    const body = await request.json();
    console.log('Request body:', { 
      roomName: body.roomName, 
      inviteUserId: body.inviteUserId,
      hasAccessToken: !!body.accessToken 
    });
    
    const { accessToken, roomName, topic, inviteUserId, isDirect } = body;

    if (!accessToken) {
      console.error('❌ No access token provided');
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    if (!inviteUserId) {
      console.error('❌ No invite user ID provided');
      return NextResponse.json(
        { error: 'Invite user ID is required' },
        { status: 400 }
      );
    }

    console.log('Creating room...');
    console.log('  Name:', roomName);
    console.log('  Inviting:', inviteUserId);
    console.log('  Is Direct:', isDirect);

    const requestBody = {
      name: roomName,
      topic: topic || undefined,
      invite: [inviteUserId],
      is_direct: isDirect !== false,
      preset: 'trusted_private_chat',
      visibility: 'private',
      initial_state: [
        {
          type: 'm.room.history_visibility',
          content: {
            history_visibility: 'invited'
          }
        }
      ]
    };

    console.log('Sending request to Matrix server:', `${MATRIX_HOMESERVER_URL}/_matrix/client/v3/createRoom`);

    let response: Response;
    
    try {
      response = await createRoomWithRetry(accessToken, requestBody);
    } catch (error: any) {
      console.error('❌ All retry attempts failed:', error.message);
      
      if (error.isTimeout) {
        return NextResponse.json(
          { 
            error: 'The Matrix server is taking too long to respond. This could be due to server load or network issues.',
            errcode: 'REQUEST_TIMEOUT',
            suggestion: 'Please try again in a few moments. If the problem persists, contact your administrator.'
          },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Network error while connecting to Matrix server',
          details: error.message
        },
        { status: 503 }
      );
    }

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

      let errorMessage = 'Failed to create room';
      let suggestion = '';
      
      if (response.status === 504 || response.status === 502) {
        errorMessage = 'The Matrix server is currently unavailable or overloaded.';
        suggestion = 'Please try again in a few moments. If the problem persists, contact your administrator.';
      } else if (errorData.errcode === 'M_FORBIDDEN') {
        errorMessage = 'You do not have permission to create rooms or invite this user.';
        suggestion = 'Check that you have the correct permissions and the user exists.';
      } else if (errorData.errcode === 'M_UNKNOWN' || errorData.errcode === 'M_NOT_FOUND') {
        errorMessage = 'User not found. Please check the username.';
        suggestion = 'Make sure the username is correct and includes the homeserver (e.g., @user:matrix.151.hu)';
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

    const data = await response.json();
    console.log('✅ Room created successfully:', data.room_id);

    return NextResponse.json({
      success: true,
      roomId: data.room_id,
    });

  } catch (error: any) {
    console.error('❌ Server error creating room:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Internal server error while creating room',
        details: error.message,
        type: error.name
      },
      { status: 500 }
    );
  }
}