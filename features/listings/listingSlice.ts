import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { createClient } from "@/utils/supabase/client";

// my types
interface Listing {
  id: string;
  created_at: string; // ISO date string
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
    created_at: string; // ISO date string
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

interface ListingState {
  data: Listing[];
  loading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchListings = createAsyncThunk("listings/fetch", async () => {
  const supabase = createClient();

  try {
    // fetch all expose
    const { data: listingsData, error: listingsError } = await supabase
      .from("expose")
      .select("*");

    // error handling
    if (listingsError) {
      console.error("Error fetching listings:", listingsError);
      return;
    }

    // fetch from other tables and merge
    const enrichedListings = await Promise.all(
      listingsData.map(async (listing) => {
        const { data: imagesData, error: imagesError } = await supabase
          .from("expose_media")
          .select("url")
          .eq("expose_id", listing.id)
          .eq("media_type", "image");

        if (imagesError) {
          console.error(
            `Error fetching images for listing ${listing.id}:`,
            imagesError
          );
          return { ...listing, images: [] };
        }

        const { data: basicDetails, error: basicDetailsError } = await supabase
          .from("expose_basic")
          .select("*")
          .eq("exposeid", listing.id);

        if (basicDetailsError) {
          console.error(
            `Error fetching basic details for listing ${listing.id}:`,
            basicDetailsError
          );
          return {
            ...listing,
            images: imagesData.map((img) => img.url),
            basicDetails: null,
          };
        }

        return {
          ...listing,
          images: imagesData.map((img) => img.url),
          basicDetails: basicDetails[0] || null,
        };
      })
    );

    console.log("Enriched Listings with Basic Details:", enrichedListings);
    // setExpose(enrichedListings);
    return enrichedListings as Listing[];
  } catch (err) {
    console.error("Unexpected error fetching listings or images:", err);
  }
});

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload ?? [];
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch listings";
      });
  },
});

export const {} = listingSlice.actions;
export default listingSlice.reducer;
