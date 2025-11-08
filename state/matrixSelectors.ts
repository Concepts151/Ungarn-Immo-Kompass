// state/matrixSelectors.ts
import type { RootState } from "@/state/store";

export const selectMatrixClient = (state: RootState) => 
  state.global.matrix.client;

export const selectIsMatrixInitialized = (state: RootState) => 
  state.global.matrix.isInitialized;

export const selectIsClientRunning = (state: RootState) => 
  state.global.matrix.isClientRunning;

export const selectMatrixUserId = (state: RootState) => 
  state.global.matrix.userId;