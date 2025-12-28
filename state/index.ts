import { MatrixClientType } from "@/types/index.t";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

export interface FiltersState {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number] | [null, null];
  village?: string; 
}

interface initialStateTypes {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: string;
  matrix: MatrixState;
}

interface MatrixState {
  client: MatrixClientType | null;
  isInitialized: boolean;
  isClientRunning: boolean;
  userId: string | null;
}

export const initialState: initialStateTypes = {
  filters: {
    location: "Budapest",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [null, null],
    village: undefined, 
    
  },
  isFiltersFullOpen: false,
  viewMode: "grid",
  matrix: {
    client: null,
    isInitialized: false,
    isClientRunning: false,
    userId: null,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    // Matrix Client management
    setMatrixClient: (
      state,
      action: PayloadAction<MatrixClientType | null>
    ) => {
      state.matrix.client = action.payload;
      state.matrix.userId = action.payload?.getUserId() || null;
    },

    setMatrixInitialized: (state, action: PayloadAction<boolean>) => {
      state.matrix.isInitialized = action.payload;
    },

    setMatrixClientRunning: (state, action: PayloadAction<boolean>) => {
      state.matrix.isClientRunning = action.payload;
    },

    // Matrix Reset
    resetMatrix: (state) => {
      state.matrix = initialState.matrix;
    },
  },
});

export const {
  setFilters,
  toggleFiltersFullOpen,
  setViewMode,
  setMatrixClient,
  setMatrixInitialized,
  setMatrixClientRunning,
  resetMatrix,
} = globalSlice.actions;

export default globalSlice.reducer;
