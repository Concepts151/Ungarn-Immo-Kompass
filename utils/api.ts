// components/utils/api.ts
// API helper functions for Matrix operations

export async function createRoomViaAPI(
  accessToken: string,
  roomName: string,
  topic: string,
  inviteUserId: string,
  isDirect: boolean = true,
  maxRetries: number = 3
): Promise<{ roomId: string }> {
  const timeout = 30000; // 30 seconds per attempt
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Room creation attempt ${attempt + 1}/${maxRetries}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      

      console.log("room name:", roomName);
      
      const response = await fetch("/api/matrix/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          roomName,
          topic,
          inviteUserId,
          isDirect,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const result = await response.json();
      
      if (!response.ok) {
        // If it's a server error (5xx) and not the last attempt, retry
        if (response.status >= 500 && attempt < maxRetries - 1) {
          const waitTime = 1000 * (attempt + 1);
          console.log(`Server error ${response.status}, retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        
        throw new Error(result.error || "Failed to create room");
      }
      
      console.log('✅ Room created successfully:', result.roomId);
      return { roomId: result.roomId };
      
    } catch (error: any) {
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries - 1) {
        // Provide better error messages
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. The Matrix server is taking too long to respond. Please try again.');
        }
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = 1000 * (attempt + 1);
      console.log(`Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw new Error('Failed to create room after all retries');
}

export async function leaveRoomViaAPI(
  accessToken: string,
  roomId: string
): Promise<void> {
  const timeout = 30000; // 30 seconds
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch("/api/matrix/leave-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        roomId,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || "Failed to leave room");
    }
    
    console.log('✅ Left room successfully');
    
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. The Matrix server is taking too long to respond.');
    }
    throw error;
  }
}

export async function loadServerUsers(
  accessToken: string,
  homeserver: string
): Promise<any[]> {
  try {
    const response = await fetch(
      `${homeserver}/_matrix/client/v3/publicRooms`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      // This endpoint doesn't actually return users, just public rooms
      // You might need a different approach for user discovery
      return [];
    }
    return [];
  } catch (err) {
    console.error("Failed to load users:", err);
    return [];
  }
}