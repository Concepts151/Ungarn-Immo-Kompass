import { GetSellerPropertiesResponse } from "@/app/(dashboard)/my-property/types";
import { updateProperty } from "@/features/property/propertySlice";
import { cleanParams, createNewUserInDatabase, withToast } from "@/lib/utils";
import { FiltersState, Property } from "@/types/api";
import { createClient } from "@/utils/supabase/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabase = createClient();

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005",
    // baseUrl: "http://localhost:3005",
    prepareHeaders: async (headers) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const idToken = session?.access_token;

      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Properties", "Favorites"],
  endpoints: (build) => ({
    getAuthUser: build.query<any, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          const { data: supabaseUserData } = await supabase
            .from("user")
            .select("*")
            .eq("id", session?.user.id)
            .single();
          console.log("supabaseUserData:", supabaseUserData);

          const idToken = session?.access_token;
          const user = session?.user;
          const userRole = user?.user_metadata.role;
          console.log("session:", session);

          const endpoint =
            userRole === "BUYER"
              ? `/buyer/${user?.id}`
              : userRole === "SELLER"
              ? `/seller/${user?.id}`
              : "";
          console.log("endpoint:", endpoint);

          const userNewData = { ...user, ...supabaseUserData };
          console.log("userNewData:", userNewData);

          let userDetailsResponse = await fetchWithBQ(endpoint);
          console.log("user:", user);
          console.log("userDetailsResponse:", userDetailsResponse);

          if (!userDetailsResponse.data) {
            userDetailsResponse = await createNewUserInDatabase(
              userNewData,
              idToken,
              userRole,
              fetchWithBQ
            );
          }

          // Get Matrix credentials if user has a matrixUserId
          let matrixCredentials = null;
          const userData = userDetailsResponse.data as {
            matrixUserId?: string;
            matrixPassword?: string;
          };
          if (userData?.matrixUserId && userData?.matrixPassword) {
            try {
              const matrixResponse = await fetchWithBQ({
                url: "auth/matrix-token", // Remove leading slash
                method: "POST",
                body: {
                  matrixUserId: userData.matrixUserId,
                  matrixPassword: userData.matrixPassword,
                },
              });

              if (matrixResponse.data) {
                matrixCredentials = matrixResponse.data;
              }
            } catch (matrixError) {
              console.error("Failed to get Matrix credentials:", matrixError);
              // Continue without Matrix credentials
            }
          }

          return {
            data: {
              user: userDetailsResponse.data,
              userRole: userRole,
              matrix: matrixCredentials, // Include Matrix credentials in response
            },
          };
        } catch (error: any) {
          return { error: error.message || "Error fetching auth user" };
        }
      },
    }),
    // property related endpoints
    // Create property endpoint
    createProperty: build.mutation<any, any>({
      query: (propertyData) => ({
        url: "properties",
        method: "POST",
        body: propertyData,
      }),
      invalidatesTags: [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Property created successfully!",
          error: "Failed to create property.",
        });
      },
    }),
    updateProperty: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `properties/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Properties", id },
        { type: "Properties", id: "LIST" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Property updated successfully!",
          error: "Failed to update property.",
        });
      },
    }),
    getProperties: build.query<
      Property[],
      Partial<FiltersState & { favoriteIds?: number[] }>
    >({
      query: (filters) => {
        const params = cleanParams({
          Location: filters.location,
          priceMin: filters.priceRange?.[0],
          priceMax: filters.priceRange?.[1],
          bedrooms: filters.beds,
          bathrooms: filters.baths,
          propertyType: filters.propertyType,
          livingAreaMin: filters.squareFeet?.[0],
          livingAreaMax: filters.squareFeet?.[1],
          latitude: filters.coordinates?.[1],
          longitude: filters.coordinates?.[0],
        });

        console.log(params);

        return { url: "properties", params };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Properties" as const, id }))]
          : [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch properties.",
        });
      },
    }),
    getProperty: build.query<Property, string>({
      query: (id) => `properties/${id}`,
      providesTags: (result, error, id) => [
        { type: "Properties", id: result?.id },
      ],
    }),
    getSellerProperties: build.query<GetSellerPropertiesResponse, string>({
      query: (sellerId) => `seller/${sellerId}/properties`,
      providesTags: (result, error, sellerId) => [
        { type: "Properties", id: sellerId },
      ],
    }),
    getPropertyTypes: build.query<any, void>({
      query: () => `property-type/stats`,
      providesTags: (result) => [{ type: "Properties", id: "PROPERTY_TYPES" }],
    }),

    // ==================== FAVORITES ENDPOINTS ====================

    // Get all favorite properties for a user (full property data)
    getFavorites: build.query<Property[], string>({
      query: (userId) => `buyer/${userId}/favorites`,
      providesTags: (result, error, userId) => [
        { type: "Favorites", id: userId },
        { type: "Favorites", id: "LIST" },
      ],
    }),
    // Get only favorite property IDs (lightweight)
    getFavoriteIds: build.query<{ favoriteIds: string[] }, string>({
      query: (userId) => `buyer/${userId}/favorites/ids`,
      providesTags: (result, error, userId) => [
        { type: "Favorites", id: `${userId}-IDS` },
      ],
    }),

    // Check if a specific property is favorited
    checkFavorite: build.query<
      { isLiked: boolean; propertyId: string },
      { userId: string; propertyId: string }
    >({
      query: ({ userId, propertyId }) =>
        `buyer/${userId}/favorites/${propertyId}/check`,
      providesTags: (result, error, { userId, propertyId }) => [
        { type: "Favorites", id: `${userId}-${propertyId}` },
      ],
    }),
    // Toggle favorite (like/unlike)
    toggleFavorite: build.mutation<
      { message: string; liked: boolean; propertyId: string },
      { userId: string; propertyId: string }
    >({
      query: ({ userId, propertyId }) => ({
        url: `buyer/${userId}/favorites/${propertyId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { userId, propertyId }) => [
        { type: "Favorites", id: userId },
        { type: "Favorites", id: `${userId}-IDS` },
        { type: "Favorites", id: `${userId}-${propertyId}` },
        { type: "Favorites", id: "LIST" },
      ],
      async onQueryStarted(
        { userId, propertyId },
        { dispatch, queryFulfilled }
      ) {
        // Optimistic update for getFavoriteIds
        const patchResult = dispatch(
          api.util.updateQueryData("getFavoriteIds", userId, (draft) => {
            const index = draft.favoriteIds.indexOf(propertyId);
            if (index > -1) {
              draft.favoriteIds.splice(index, 1);
            } else {
              draft.favoriteIds.push(propertyId);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Add to favorites
    addFavorite: build.mutation<
      { message: string; liked: boolean; propertyId: string },
      { userId: string; propertyId: string }
    >({
      query: ({ userId, propertyId }) => ({
        url: `buyer/${userId}/favorites/${propertyId}/add`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { userId, propertyId }) => [
        { type: "Favorites", id: userId },
        { type: "Favorites", id: `${userId}-IDS` },
        { type: "Favorites", id: `${userId}-${propertyId}` },
        { type: "Favorites", id: "LIST" },
      ],
    }),
    // Remove from favorites
    removeFavorite: build.mutation<
      { message: string; liked: boolean; propertyId: string },
      { userId: string; propertyId: string }
    >({
      query: ({ userId, propertyId }) => ({
        url: `buyer/${userId}/favorites/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId, propertyId }) => [
        { type: "Favorites", id: userId },
        { type: "Favorites", id: `${userId}-IDS` },
        { type: "Favorites", id: `${userId}-${propertyId}` },
        { type: "Favorites", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetAuthUserQuery,
  useCreatePropertyMutation,
  useGetPropertyQuery,
  useGetSellerPropertiesQuery,
  useGetPropertyTypesQuery,
  useUpdatePropertyMutation,
  // Favorites hooks
  useGetFavoritesQuery,
  useGetFavoriteIdsQuery,
  useCheckFavoriteQuery,
  useToggleFavoriteMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = api;
