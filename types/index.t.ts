export interface MatrixClientType {
  startClient: () => Promise<void>;
  stopClient: () => void;
  getRooms: () => any[];
  sendTextMessage: (roomId: string, text: string) => Promise<any>;
  createRoom: (options: any) => Promise<{ room_id: string }>;
  scrollback: (room: any, limit: number) => Promise<any>;
  logout: () => Promise<void>;
  on: (event: string, callback: Function) => void;
  removeAllListeners: (event?: string) => void;
  getUserId: () => string;
  leave: (roomId: string) => Promise<void>;
}