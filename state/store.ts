// state/store.ts
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index";
// Import your other reducers here if you have them
// For example, if you have an API slice:
// import { api } from "./api";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    // Add other reducers here
    // [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Matrix client in serialization checks
        // The Matrix client contains methods and event emitters that can't be serialized
        ignoredActions: [
          'global/setMatrixClient',
          'global/resetMatrix',
        ],
        ignoredPaths: [
          'global.matrix.client',
        ],
      },
    })
    // If you have API middleware, add it here:
    // .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;