import { configureStore } from "@reduxjs/toolkit"

import filterSlice from "./filter/filterSlice"
import propertySlice from "./property/propertySlice"

export const store = configureStore({
  reducer: {
    property: propertySlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

