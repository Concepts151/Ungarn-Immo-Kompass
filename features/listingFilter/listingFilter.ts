import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { cleanParams } from "@/lib/utils"; // Assume this exists from api.ts use

// Types (retaining the shape expected by components)
interface Listing {
  id: string;
  created_at: string;
  sellerId: string;
  status: string | null;
  reasonRejection: string | null;
  update_at: string | null;
  completed: boolean;
  title: string;
  description: string;
  images: string[];
  basicDetails: {
    id: string;
    created_at: string;
    exposeid: string;
    property_type: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    price: number;
    currency: string;
    lot_size: number;
    living_area: number;
    rooms: number;
    bedroom: number;
    bathroom: number;
    build_year: number;
    last_renovation: string;
    title: string;
  };
}

export interface FilterOptions {
  sellerId?: string;
  status?: string;
  completed?: boolean;
  property_type?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  minPrice?: number;
  maxPrice?: number;
  minLivingArea?: number;
  maxLivingArea?: number;
  minLotSize?: number;
  maxLotSize?: number;
  minRooms?: number;
  maxRooms?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minBuildYear?: number;
  maxBuildYear?: number;
  sortBy?: "price" | "created_at" | "living_area" | "build_year";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

interface ListingState {
  data: Listing[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  totalCount: number;
}

const initialState: ListingState = {
  data: [],
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
};

export const fetchListings = createAsyncThunk(
  "listings/fetch",
  async (filters: FilterOptions = {}) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
      const params = new URLSearchParams();

      // Convert all filters directly into query parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`${backendUrl}/properties?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch listings from backend");
      }
      const data = await response.json();
      
      return {
        listings: (data.data || data) as Listing[],
        totalCount: data.pagination?.totalItems || data.length || 0,
      };
    } catch (err: any) {
      console.error("Unexpected error fetching listings:", err);
      throw err;
    }
  }
);

export const listingFilterSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    updateFilter: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload.listings;
          state.totalCount = action.payload.totalCount;
        } else {
          state.data = [];
          state.totalCount = 0;
        }
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch listings";
      });
  },
});

export const { setFilters, clearFilters, updateFilter } = listingFilterSlice.actions;
export default listingFilterSlice.reducer;