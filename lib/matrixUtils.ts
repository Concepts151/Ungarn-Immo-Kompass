"use client";

import { useMatrixStore } from "@/app/store/matrixStore";

// Dynamic import of Matrix SDK to avoid server-side issues
let sdk: any = null;
if (typeof window !== 'undefined') {
  import("matrix-js-sdk").then((module) => {
    sdk = module;
  });
}

export function initializeMatrixClient(
  matrixUserId: string,
  matrixAccessToken: string,
  matrixHomeserver: string
) {
  // Only run on client side
  if (typeof window === 'undefined' || !sdk) {
    console.warn("Matrix SDK not available yet or running on server");
    return null;
  }

  try {
    // Create Matrix client
    const client = sdk.createClient({
      baseUrl: matrixHomeserver,
      accessToken: matrixAccessToken,
      userId: matrixUserId,
    });

    // Start the client
    client.startClient({ initialSyncLimit: 10 });

    // Store in Zustand
    useMatrixStore.getState().setMatrixClient(client);

    // Set up event listeners
    client.once("sync", (state: string, prevState: any, data: any) => {
      if (state === "PREPARED") {
        console.log("Matrix client synchronized and ready!");
      }
    });

    client.on("Room.timeline", (event: any, room: any, toStartOfTimeline: boolean) => {
      // Handle incoming messages
      if (event.getType() === "m.room.message") {
        console.log(
          `New message in ${room.name}: ${event.getContent().body}`
        );
      }
    });

    return client;
  } catch (error) {
    console.error("Failed to initialize Matrix client:", error);
    throw error;
  }
}

export function disconnectMatrixClient() {
  const client = useMatrixStore.getState().matrixClient;
  if (client) {
    client.stopClient();
    useMatrixStore.getState().clearMatrix();
  }
}

// Helper function to send a message
export async function sendMatrixMessage(roomId: string, message: string) {
  const client = useMatrixStore.getState().matrixClient;
  if (!client) {
    throw new Error("Matrix client not initialized");
  }

  await client.sendTextMessage(roomId, message);
}

// Helper function to create a direct message room
export async function createDirectMessageRoom(targetUserId: string) {
  const client = useMatrixStore.getState().matrixClient;
  if (!client) {
    throw new Error("Matrix client not initialized");
  }

  const { room_id } = await client.createRoom({
    preset: "trusted_private_chat",
    is_direct: true,
    invite: [targetUserId],
  });

  return room_id;
}