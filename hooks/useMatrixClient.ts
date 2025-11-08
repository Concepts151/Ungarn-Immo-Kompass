"use client";

import { useEffect, useState } from 'react';
import { useMatrixStore } from '@/app/store/matrixStore';

export function useMatrixClient() {
  const [isMatrixReady, setIsMatrixReady] = useState(false);
  const matrixClient = useMatrixStore((state) => state.matrixClient);
  const setMatrixClient = useMatrixStore((state) => state.setMatrixClient);

  useEffect(() => {
    // Dynamically import Matrix SDK only on client side
    if (typeof window !== 'undefined' && !isMatrixReady) {
      import('matrix-js-sdk').then(() => {
        setIsMatrixReady(true);
      }).catch((err) => {
        console.error('Failed to load Matrix SDK:', err);
      });
    }
  }, [isMatrixReady]);

  const initializeClient = async (
    matrixUserId: string,
    matrixAccessToken: string,
    matrixHomeserver: string
  ) => {
    if (!isMatrixReady) {
      console.warn('Matrix SDK not ready yet');
      return null;
    }

    try {
      const sdk = await import('matrix-js-sdk');
      
      const client = sdk.createClient({
        baseUrl: matrixHomeserver,
        accessToken: matrixAccessToken,
        userId: matrixUserId,
      });

      client.startClient({ initialSyncLimit: 10 });
      setMatrixClient(client);

      client.once('sync', (state: string) => {
        if (state === 'PREPARED') {
          console.log('Matrix client synchronized and ready!');
        }
      });

      client.on('Room.timeline', (event: any, room: any) => {
        if (event.getType() === 'm.room.message') {
          console.log(`New message in ${room.name}: ${event.getContent().body}`);
        }
      });

      return client;
    } catch (error) {
      console.error('Failed to initialize Matrix client:', error);
      return null;
    }
  };

  const disconnect = () => {
    if (matrixClient) {
      matrixClient.stopClient();
      useMatrixStore.getState().clearMatrix();
    }
  };

  return {
    isMatrixReady,
    matrixClient,
    initializeClient,
    disconnect,
  };
}