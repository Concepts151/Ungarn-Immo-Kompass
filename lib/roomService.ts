"use client";

import { MatrixClient, Preset } from 'matrix-js-sdk';

export class MatrixRoomService {
  constructor(private matrixClient: MatrixClient) {}

  /**
   * Find existing direct message room with a user
   */
  async findDirectRoom(userId: string): Promise<string | null> {
    try {
      const rooms = this.matrixClient.getRooms();
      
      // Look for existing DM room with this user
      for (const room of rooms) {
        const members = room.getJoinedMembers();
        
        // Check if it's a DM (only 2 members: us and them)
        if (members.length === 2) {
          const otherMember = members.find(
            m => m.userId !== this.matrixClient.getUserId()
          );
          
          if (otherMember?.userId === userId) {
            console.log(`Found existing room with ${userId}: ${room.roomId}`);
            return room.roomId;
          }
        }
      }
      
      console.log(`No existing room found with ${userId}`);
      return null;
    } catch (error) {
      console.error('Error finding direct room:', error);
      return null;
    }
  }

  /**
   * Create a new direct message room with a user
   */
  async createDirectRoom(
    userId: string, 
    roomName: string,
    topic?: string
  ): Promise<string> {
    try {
      console.log(`Creating new room with ${userId}...`);
      
      const response = await this.matrixClient.createRoom({
        preset: Preset.TrustedPrivateChat,
        invite: [userId],
        is_direct: true,
        name: roomName,
        topic: topic,
        initial_state: [
          {
            type: 'm.room.guest_access',
            content: { guest_access: 'can_join' }
          }
        ]
      });

      console.log(`Room created successfully: ${response.room_id}`);

      // Mark as direct message
      try {
        await this.matrixClient.setRoomTag(
          response.room_id, 
          'm.direct', 
          { order: 0.5 }
        );
      } catch (tagError) {
        console.warn('Failed to set room tag (non-critical):', tagError);
      }

      return response.room_id;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw new Error('Failed to create chat room. Please try again.');
    }
  }

  /**
   * Get or create a direct message room with a user
   */
  async getOrCreateDirectRoom(
    userId: string,
    roomName: string,
    topic?: string
  ): Promise<string> {
    // Try to find existing room first
    const existingRoomId = await this.findDirectRoom(userId);
    
    if (existingRoomId) {
      return existingRoomId;
    }

    // Create new room if none exists
    return await this.createDirectRoom(userId, roomName, topic);
  }

  /**
   * Send a text message to a room
   */
  async sendMessage(roomId: string, message: string): Promise<void> {
    try {
      await this.matrixClient.sendTextMessage(roomId, message);
      console.log(`Message sent to room ${roomId}`);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  /**
   * Send a formatted message (with buyer info)
   */
  async sendInitialInquiry(
    roomId: string,
    propertyTitle: string,
    message: string,
    buyerInfo: {
      name: string;
      email: string;
      phone: string;
    }
  ): Promise<void> {
    const formattedMessage = `
🏠 Property Inquiry: ${propertyTitle}

Message:
${message}

Contact Information:
📧 Email: ${buyerInfo.email}
📱 Phone: ${buyerInfo.phone}
👤 Name: ${buyerInfo.name}
`.trim();

    await this.sendMessage(roomId, formattedMessage);
  }

  /**
   * Get room name for display
   */
  getRoomName(roomId: string): string {
    try {
      const room = this.matrixClient.getRoom(roomId);
      return room?.name || 'Direct Message';
    } catch (error) {
      console.error('Error getting room name:', error);
      return 'Direct Message';
    }
  }

  /**
   * Get room members
   */
  getRoomMembers(roomId: string): any[] {
    try {
      const room = this.matrixClient.getRoom(roomId);
      return room?.getJoinedMembers() || [];
    } catch (error) {
      console.error('Error getting room members:', error);
      return [];
    }
  }
}

// Export helper function that uses your existing matrixUtils pattern
export function createRoomService(matrixClient: MatrixClient | null): MatrixRoomService | null {
  if (!matrixClient) {
    console.warn('Matrix client not available');
    return null;
  }
  return new MatrixRoomService(matrixClient);
}