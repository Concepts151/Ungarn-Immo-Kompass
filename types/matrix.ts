// types/matrix.ts
export interface MatrixClientType {
  startClient: () => Promise<void>;
  stopClient: () => void;
  getRooms: () => any[];
  getRoom: (roomId: string) => any | null;
  sendTextMessage: (roomId: string, text: string) => Promise<any>;
  sendEvent: (roomId: string, eventType: string, content: any) => Promise<any>;
  createRoom: (options: any) => Promise<{ room_id: string }>;
  joinRoom: (roomId: string) => Promise<any>;
  scrollback: (room: any, limit: number) => Promise<any>;
  logout: () => Promise<void>;
  leave: (roomId: string) => Promise<void>;
  on: (event: string, callback: Function) => void;
  removeAllListeners: (event?: string) => void;
  getUserId: () => string;
}