 "use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MatrixState {
  matrixUserId: string | null;
  matrixAccessToken: string | null;
  matrixHomeserver: string | null;
  matrixClient: any | null; // Matrix SDK client instance
  
  setMatrixCredentials: (credentials: {
    matrixUserId: string;
    matrixAccessToken: string;
    matrixHomeserver: string;
  }) => void;
  
  setMatrixClient: (client: any) => void;
  
  clearMatrix: () => void;
}

export const useMatrixStore = create<MatrixState>()(
  persist(
    (set) => ({
      matrixUserId: null,
      matrixAccessToken: null,
      matrixHomeserver: null,
      matrixClient: null,
      
      setMatrixCredentials: (credentials) => set({
        matrixUserId: credentials.matrixUserId,
        matrixAccessToken: credentials.matrixAccessToken,
        matrixHomeserver: credentials.matrixHomeserver,
      }),
      
      setMatrixClient: (client) => set({ matrixClient: client }),
      
      clearMatrix: () => set({
        matrixUserId: null,
        matrixAccessToken: null,
        matrixHomeserver: null,
        matrixClient: null,
      }),
    }),
    {
      name: 'matrix-storage',
      // Don't persist the client instance, only credentials
      partialize: (state) => ({
        matrixUserId: state.matrixUserId,
        matrixAccessToken: state.matrixAccessToken,
        matrixHomeserver: state.matrixHomeserver,
      }),
    }
  )
);