// app/api/auth/matrix-login/route.ts
// Backend API endpoint for Matrix authentication using shared secret

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Configuration - Store these in environment variables
const MATRIX_HOMESERVER_URL = process.env.MATRIX_HOMESERVER_URL || 'https://matrix.org';
const MATRIX_SHARED_SECRET = process.env.MATRIX_SHARED_SECRET || '';
const MATRIX_SERVER_NAME = process.env.MATRIX_SERVER_NAME || 'matrix.org';

// Generate HMAC for shared secret registration
function generateRegistrationMac(
  nonce: string,
  username: string,
  password: string,
  admin: boolean = false
): string {
  const adminString = admin ? 'admin' : 'notadmin';
  const message = `${nonce}\0${username}\0${password}\0${adminString}`;
  
  return crypto
    .createHmac('sha1', MATRIX_SHARED_SECRET)
    .update(message)
    .digest('hex');
}

// Generate a secure password for the user
function generateSecurePassword(internalUserId: string): string {
  return crypto
    .createHash('sha256')
    .update(`${MATRIX_SHARED_SECRET}:${internalUserId}:${Date.now()}`)
    .digest('hex')
    .substring(0, 32);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { internalUserId, displayName } = body;

    if (!internalUserId) {
      return NextResponse.json(
        { error: 'Internal user ID is required' },
        { status: 400 }
      );
    }

    if (!MATRIX_SHARED_SECRET) {
      return NextResponse.json(
        { error: 'Matrix shared secret not configured on server' },
        { status: 500 }
      );
    }

    // Create Matrix username from internal user ID
    const username = `user_${internalUserId}`.toLowerCase().replace(/[^a-z0-9._=-]/g, '');
    const password = generateSecurePassword(internalUserId);

    try {
      // Step 1: Get registration nonce
      const nonceResponse = await fetch(
        `${MATRIX_HOMESERVER_URL}/_synapse/admin/v1/register`,
        { method: 'GET' }
      );

      if (!nonceResponse.ok) {
        throw new Error('Failed to get registration nonce from Matrix server');
      }

      const nonceData = await nonceResponse.json();
      const nonce = nonceData.nonce;

      // Step 2: Generate HMAC
      const mac = generateRegistrationMac(nonce, username, password, false);

      // Step 3: Register user
      const registerResponse = await fetch(
        `${MATRIX_HOMESERVER_URL}/_synapse/admin/v1/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nonce,
            username,
            displayname: displayName || `User ${internalUserId}`,
            password,
            admin: false,
            mac,
          }),
        }
      );

      let accessToken: string;
      let userId: string;

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        
        // If user already exists, try to login
        if (errorData.errcode === 'M_USER_IN_USE') {
          const loginResponse = await fetch(
            `${MATRIX_HOMESERVER_URL}/_matrix/client/v3/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'm.login.password',
                identifier: {
                  type: 'm.id.user',
                  user: username,
                },
                password: password,
              }),
            }
          );

          if (!loginResponse.ok) {
            const loginError = await loginResponse.json();
            return NextResponse.json(
              { error: loginError.error || 'Login failed' },
              { status: 401 }
            );
          }

          const loginData = await loginResponse.json();
          accessToken = loginData.access_token;
          userId = loginData.user_id;
        } else {
          return NextResponse.json(
            { error: errorData.error || 'Registration failed' },
            { status: 400 }
          );
        }
      } else {
        const registerData = await registerResponse.json();
        accessToken = registerData.access_token;
        userId = registerData.user_id;
      }

      // Return the credentials to the client
      return NextResponse.json({
        success: true,
        accessToken,
        userId,
        homeserver: MATRIX_HOMESERVER_URL,
      });

    } catch (error: any) {
      console.error('Matrix registration/login error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to authenticate with Matrix server' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if Matrix is configured
export async function GET() {
  return NextResponse.json({
    configured: !!MATRIX_SHARED_SECRET,
    homeserver: MATRIX_HOMESERVER_URL,
    serverName: MATRIX_SERVER_NAME,
  });
}