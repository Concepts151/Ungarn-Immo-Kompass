import listingSlice from "./listings/listingSlice";
import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./filter/filterSlice";
import propertySlice from "./property/propertySlice";
import listingFilterSlice from "./listingFilter/listingFilter";

export const store = configureStore({
  reducer: {
    property: propertySlice,
    filter: filterSlice,
    listings: listingSlice,
    listingFilter: listingFilterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
