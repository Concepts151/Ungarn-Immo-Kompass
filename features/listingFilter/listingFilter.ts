import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { createClient } from "@/utils/supabase/client";

// Types
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

export interface FilterOptions {
  // Basic filters
  sellerId?: string;
  status?: string;
  completed?: boolean;

  // Property filters
  property_type?: string;
  city?: string;
  country?: string;
  postal_code?: string;

  // Price range
  minPrice?: number;
  maxPrice?: number;

  // Size filters
  minLivingArea?: number;
  maxLivingArea?: number;
  minLotSize?: number;
  maxLotSize?: number;

  // Room filters
  minRooms?: number;
  maxRooms?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;

  // Build year range
  minBuildYear?: number;
  maxBuildYear?: number;

  // Sorting
  sortBy?: "price" | "created_at" | "living_area" | "build_year";
  sortOrder?: "asc" | "desc";

  // Pagination
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
    const supabase = createClient();

    try {
      // Check if we need to sort by fields from expose_basic table
      const needsJoinForSorting = filters.sortBy && 
        ["price", "living_area", "build_year"].includes(filters.sortBy);

      let enrichedListings: Listing[];

      if (needsJoinForSorting) {
        // Alternative approach: Query expose_basic first, then join with expose
        let basicQuery = supabase
          .from("expose_basic")
          .select("*");

        // Apply property filters to expose_basic
        if (filters.property_type) {
          basicQuery = basicQuery.eq("property_type", filters.property_type);
        }
        if (filters.city) {
          basicQuery = basicQuery.ilike("city", `%${filters.city}%`);
        }
        if (filters.country) {
          basicQuery = basicQuery.eq("country", filters.country);
        }
        if (filters.postal_code) {
          basicQuery = basicQuery.eq("postal_code", filters.postal_code);
        }

        // Apply price filters
        if (filters.minPrice !== undefined) {
          basicQuery = basicQuery.gte("price", filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
          basicQuery = basicQuery.lte("price", filters.maxPrice);
        }

        // Apply size filters
        if (filters.minLivingArea !== undefined) {
          basicQuery = basicQuery.gte("living_area", filters.minLivingArea);
        }
        if (filters.maxLivingArea !== undefined) {
          basicQuery = basicQuery.lte("living_area", filters.maxLivingArea);
        }
        if (filters.minLotSize !== undefined) {
          basicQuery = basicQuery.gte("lot_size", filters.minLotSize);
        }
        if (filters.maxLotSize !== undefined) {
          basicQuery = basicQuery.lte("lot_size", filters.maxLotSize);
        }

        // Apply room filters
        if (filters.minRooms !== undefined) {
          basicQuery = basicQuery.gte("rooms", filters.minRooms);
        }
        if (filters.maxRooms !== undefined) {
          basicQuery = basicQuery.lte("rooms", filters.maxRooms);
        }
        if (filters.minBedrooms !== undefined) {
          basicQuery = basicQuery.gte("bedroom", filters.minBedrooms);
        }
        if (filters.maxBedrooms !== undefined) {
          basicQuery = basicQuery.lte("bedroom", filters.maxBedrooms);
        }
        if (filters.minBathrooms !== undefined) {
          basicQuery = basicQuery.gte("bathroom", filters.minBathrooms);
        }
        if (filters.maxBathrooms !== undefined) {
          basicQuery = basicQuery.lte("bathroom", filters.maxBathrooms);
        }

        // Apply build year filters
        if (filters.minBuildYear !== undefined) {
          basicQuery = basicQuery.gte("build_year", filters.minBuildYear);
        }
        if (filters.maxBuildYear !== undefined) {
          basicQuery = basicQuery.lte("build_year", filters.maxBuildYear);
        }

        // Apply sorting to expose_basic
        if (filters.sortBy && filters.sortBy !== "created_at") {
          basicQuery = basicQuery.order(filters.sortBy, {
            ascending: filters.sortOrder === "asc",
          });
        } else {
          // Default sort by id for consistency
          basicQuery = basicQuery.order("id", { ascending: false });
        }

        // Apply pagination to expose_basic
        if (filters.limit) {
          basicQuery = basicQuery.limit(filters.limit);
        }
        if (filters.offset) {
          basicQuery = basicQuery.range(
            filters.offset,
            filters.offset + (filters.limit || 10) - 1
          );
        }

        const { data: basicDetailsData, error: basicDetailsError } = await basicQuery;

        if (basicDetailsError) {
          console.error("Error fetching basic details:", basicDetailsError);
          throw new Error(basicDetailsError.message);
        }

        if (!basicDetailsData || basicDetailsData.length === 0) {
          return { listings: [], totalCount: 0 };
        }

        // Get the expose IDs from the basic details
        const exposeIds = basicDetailsData.map(basic => basic.exposeid);

        // Fetch corresponding expose records
        let exposeQuery = supabase
          .from("expose")
          .select("*")
          .in("id", exposeIds);

        // Apply basic filters to expose
        if (filters.sellerId) {
          exposeQuery = exposeQuery.eq("sellerId", filters.sellerId);
        }
        if (filters.status) {
          exposeQuery = exposeQuery.eq("status", filters.status);
        }
        if (filters.completed !== undefined) {
          exposeQuery = exposeQuery.eq("completed", filters.completed);
        }

        const { data: exposeData, error: exposeError } = await exposeQuery;

        if (exposeError) {
          console.error("Error fetching expose data:", exposeError);
          throw new Error(exposeError.message);
        }

        // Create a map for quick lookup
        const exposeMap = new Map(exposeData?.map(expose => [expose.id, expose]) || []);
        const basicDetailsMap = new Map(basicDetailsData.map(basic => [basic.exposeid, basic]));

        // Combine the data and maintain the sort order from basic details
        const combinedData = basicDetailsData
          .map(basic => {
            const expose = exposeMap.get(basic.exposeid);
            return expose ? { ...expose, basicDetails: basic } : null;
          })
          .filter(item => item !== null);

        // Fetch images for each listing
        enrichedListings = await Promise.all(
          combinedData.map(async (listing: any) => {
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
            }

            return {
              ...listing,
              images: imagesData?.map((img) => img.url) || [],
            };
          })
        );

        // Get total count for pagination
        const { count: totalCount } = await supabase
          .from("expose_basic")
          .select("*", { count: "exact", head: true });

      } else {
        // Use regular query for sorting by expose table fields or no sorting
        let query = supabase.from("expose").select("*", { count: "exact" });

        // Apply basic filters
        if (filters.sellerId) {
          query = query.eq("sellerId", filters.sellerId);
        }
        if (filters.status) {
          query = query.eq("status", filters.status);
        }
        if (filters.completed !== undefined) {
          query = query.eq("completed", filters.completed);
        }

        // Apply sorting for expose table fields
        if (filters.sortBy === "created_at") {
          query = query.order("created_at", {
            ascending: filters.sortOrder === "asc",
          });
        } else {
          // Default sorting by created_at desc
          query = query.order("created_at", { ascending: false });
        }

        // Apply pagination
        if (filters.limit) {
          query = query.limit(filters.limit);
        }
        if (filters.offset) {
          query = query.range(
            filters.offset,
            filters.offset + (filters.limit || 10) - 1
          );
        }

        const { data: listingsData, error: listingsError, count } = await query;

        if (listingsError) {
          console.error("Error fetching listings:", listingsError);
          throw new Error(listingsError.message);
        }

        if (!listingsData) {
          return { listings: [], totalCount: 0 };
        }

        // Fetch enriched data with filters applied to basic details
        enrichedListings = await Promise.all(
          listingsData.map(async (listing) => {
            // Fetch images
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
            }

            // Fetch basic details with filters
            let basicDetailsQuery = supabase
              .from("expose_basic")
              .select("*")
              .eq("exposeid", listing.id);

            // Apply property filters
            if (filters.property_type) {
              basicDetailsQuery = basicDetailsQuery.eq(
                "property_type",
                filters.property_type
              );
            }
            if (filters.city) {
              basicDetailsQuery = basicDetailsQuery.ilike(
                "city",
                `%${filters.city}%`
              );
            }
            if (filters.country) {
              basicDetailsQuery = basicDetailsQuery.eq(
                "country",
                filters.country
              );
            }
            if (filters.postal_code) {
              basicDetailsQuery = basicDetailsQuery.eq(
                "postal_code",
                filters.postal_code
              );
            }

            // Apply price filters
            if (filters.minPrice !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "price",
                filters.minPrice
              );
            }
            if (filters.maxPrice !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "price",
                filters.maxPrice
              );
            }

            // Apply size filters
            if (filters.minLivingArea !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "living_area",
                filters.minLivingArea
              );
            }
            if (filters.maxLivingArea !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "living_area",
                filters.maxLivingArea
              );
            }
            if (filters.minLotSize !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "lot_size",
                filters.minLotSize
              );
            }
            if (filters.maxLotSize !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "lot_size",
                filters.maxLotSize
              );
            }

            // Apply room filters
            if (filters.minRooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "rooms",
                filters.minRooms
              );
            }
            if (filters.maxRooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "rooms",
                filters.maxRooms
              );
            }
            if (filters.minBedrooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "bedroom",
                filters.minBedrooms
              );
            }
            if (filters.maxBedrooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "bedroom",
                filters.maxBedrooms
              );
            }
            if (filters.minBathrooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "bathroom",
                filters.minBathrooms
              );
            }
            if (filters.maxBathrooms !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "bathroom",
                filters.maxBathrooms
              );
            }

            // Apply build year filters
            if (filters.minBuildYear !== undefined) {
              basicDetailsQuery = basicDetailsQuery.gte(
                "build_year",
                filters.minBuildYear
              );
            }
            if (filters.maxBuildYear !== undefined) {
              basicDetailsQuery = basicDetailsQuery.lte(
                "build_year",
                filters.maxBuildYear
              );
            }

            const { data: basicDetails, error: basicDetailsError } =
              await basicDetailsQuery;

            if (basicDetailsError) {
              console.error(
                `Error fetching basic details for listing ${listing.id}:`,
                basicDetailsError
              );
              return {
                ...listing,
                images: imagesData?.map((img) => img.url) || [],
                basicDetails: null,
              };
            }

            return {
              ...listing,
              images: imagesData?.map((img) => img.url) || [],
              basicDetails: basicDetails?.[0] || null,
            };
          })
        );

        // Filter out listings where basicDetails is null if property filters were applied
        const hasPropertyFilters =
          filters.property_type ||
          filters.city ||
          filters.country ||
          filters.postal_code ||
          filters.minPrice !== undefined ||
          filters.maxPrice !== undefined ||
          filters.minLivingArea !== undefined ||
          filters.maxLivingArea !== undefined ||
          filters.minLotSize !== undefined ||
          filters.maxLotSize !== undefined ||
          filters.minRooms !== undefined ||
          filters.maxRooms !== undefined ||
          filters.minBedrooms !== undefined ||
          filters.maxBedrooms !== undefined ||
          filters.minBathrooms !== undefined ||
          filters.maxBuildYear !== undefined;

        enrichedListings = enrichedListings.filter((listing) => {
          return !hasPropertyFilters || listing.basicDetails !== null;
        });
      }

      console.log("Filtered Listings with Basic Details:", enrichedListings);

      return {
        listings: enrichedListings as Listing[],
        totalCount: enrichedListings.length,
      };
    } catch (err) {
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