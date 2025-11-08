// app/api/matrix/users/route.ts
// Backend API endpoint to list all users on the Matrix server

import { NextRequest, NextResponse } from 'next/server';

const MATRIX_HOMESERVER_URL = process.env.MATRIX_HOMESERVER_URL || 'https://matrix.org';
const MATRIX_ADMIN_TOKEN = process.env.MATRIX_ADMIN_TOKEN || '';

export async function GET(request: NextRequest) {
  try {
    // Check if admin token is configured
    if (!MATRIX_ADMIN_TOKEN) {
      return NextResponse.json(
        { 
          error: 'Admin token not configured. Set MATRIX_ADMIN_TOKEN in .env.local',
          users: [] 
        },
        { status: 200 }
      );
    }

    console.log('Fetching users from Matrix server...');

    // Synapse Admin API endpoint to list users
    const response = await fetch(
      `${MATRIX_HOMESERVER_URL}/_synapse/admin/v2/users?limit=100`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MATRIX_ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch users:', response.status, errorText);
      
      return NextResponse.json(
        { 
          error: `Failed to fetch users: ${response.status}`,
          users: [] 
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    console.log('Fetched users:', data.users?.length || 0);

    // Format the users list
    const users = (data.users || []).map((user: any) => ({
      name: user.name,
      displayname: user.displayname || null,
      avatar_url: user.avatar_url || null,
      admin: user.admin || false,
      deactivated: user.deactivated || false,
      creation_ts: user.creation_ts,
    }));

    // Filter out deactivated users
    const activeUsers = users.filter((user: any) => !user.deactivated);

    return NextResponse.json({
      success: true,
      users: activeUsers,
      total: activeUsers.length,
    });

  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        users: [] 
      },
      { status: 200 }
    );
  }
}