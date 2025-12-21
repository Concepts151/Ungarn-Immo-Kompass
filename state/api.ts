// state/api.ts
// RTK Query API - Updated with Matrix Endpoints

import { GetSellerPropertiesResponse } from "@/app/(dashboard)/my-property/types";
import { cleanParams, createNewUserInDatabase, withToast } from "@/lib/utils";
import { FiltersState, GetVillagesResponse, Property } from "@/types/api";
import { createClient } from "@/utils/supabase/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabase = createClient();

// ============================================
// TYPES
// ============================================

interface MatrixRoom {
  id: string;
  matrixRoomId: string;
  exposeId: string | null;
  roomName: string | null;
  roomType: "PROPERTY_INQUIRY" | "DIRECT_MESSAGE" | "SUPPORT";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  expose?: {
    id: string;
    basic?: {
      title: string;
      address: string;
      price: number;
    };
    media?: { url: string }[];
  };
  participants: {
    id: string;
    userId: string;
    matrixUserId: string;
    role: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  }[];
}

interface MatrixRegistrationStats {
  registration: {
    usersCreated: number;
    tokenLimit: number;
    remaining: number;
    tokenExpiry: string;
    isExpired: boolean;
  };
  rooms: {
    total: number;
    active: number;
  };
}

// ============================================
// API DEFINITION
// ============================================

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005",
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
  tagTypes: ["Properties", "Favorites", "MatrixRooms"],
  endpoints: (build) => ({
    // ==================== AUTH ENDPOINTS ====================
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

          // Get avatar URL from Supabase auth user metadata
          const supabaseAvatarUrl = supabaseUserData?.avatarUrl || null;

          console.log("supabaseAvatarUrl:", supabaseAvatarUrl);
          

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

          // Sync avatar URL if it changed
          const userData = userDetailsResponse.data as {
            id?: string;
            avatarUrl?: string | null;
            matrixUserId?: string;
            matrixPassword?: string;
          };

          if (supabaseAvatarUrl && userData?.avatarUrl !== supabaseAvatarUrl) {
            console.log("🔄 Syncing avatar URL from Supabase to database...");
            console.log("Current DB avatar:", userData?.avatarUrl);
            console.log("Supabase avatar:", supabaseAvatarUrl);

            try {
              const updateEndpoint =
                userRole === "BUYER"
                  ? `/buyer/${user?.id}`
                  : userRole === "SELLER"
                  ? `/seller/${user?.id}`
                  : "";

              if (updateEndpoint) {
                const updateResponse = await fetchWithBQ({
                  url: updateEndpoint,
                  method: "PUT",
                  body: { avatarUrl: supabaseAvatarUrl },
                });

                if (updateResponse.data) {
                  console.log("✅ Avatar URL synced successfully");
                  // Update the local data with the new avatar
                  (userDetailsResponse.data as any).avatarUrl =
                    supabaseAvatarUrl;
                }
              }
            } catch (avatarError) {
              console.error("Failed to sync avatar URL:", avatarError);
            }
          }

          // Get Matrix credentials if user has a matrixUserId
          let matrixCredentials = null;

          if (userData?.matrixUserId && userData?.matrixPassword) {
            try {
              const matrixResponse = await fetchWithBQ({
                url: "matrix/token", // Updated endpoint path
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
            }
          }

          return {
            data: {
              user: userDetailsResponse.data,
              userRole: userRole,
              matrix: matrixCredentials,
            },
          };
        } catch (error: any) {
          return { error: error.message || "Error fetching auth user" };
        }
      },
    }),

    // ==================== PROPERTY ENDPOINTS ====================
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
    getVillages: build.query<GetVillagesResponse, { county?: string; search?: string; limit?: number }>({
      query: (params) => {
        const queryParams = cleanParams(params);
        return { url: "villages", params: queryParams };
      },
      providesTags: (result) => [{ type: "Properties", id: "VILLAGES" }],
    }),

    // ==================== FAVORITES ENDPOINTS ====================
    getFavorites: build.query<Property[], string>({
      query: (userId) => `buyer/${userId}/favorites`,
      providesTags: (result, error, userId) => [
        { type: "Favorites", id: userId },
        { type: "Favorites", id: "LIST" },
      ],
    }),

    getFavoriteIds: build.query<{ favoriteIds: string[] }, string>({
      query: (userId) => `buyer/${userId}/favorites/ids`,
      providesTags: (result, error, userId) => [
        { type: "Favorites", id: `${userId}-IDS` },
      ],
    }),

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

    // ==================== MATRIX ENDPOINTS ====================

    // Register Matrix account for current user
    registerMatrixAccount: build.mutation<
      { success: boolean; matrixUserId: string; accessToken: string },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: "matrix/register",
        method: "POST",
        body: { userId },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Matrix account created!",
          error: "Failed to create Matrix account.",
        });
      },
    }),

    // Get user's Matrix chat rooms
    getMatrixRooms: build.query<{ rooms: MatrixRoom[] }, void>({
      query: () => "matrix/rooms",
      providesTags: [{ type: "MatrixRooms", id: "LIST" }],
    }),

    // Get room by property ID
    getMatrixRoomByProperty: build.query<{ room: MatrixRoom | null }, string>({
      query: (exposeId) => `matrix/rooms/by-property/${exposeId}`,
      providesTags: (result, error, exposeId) => [
        { type: "MatrixRooms", id: exposeId },
      ],
    }),

    // Create property inquiry room
    createPropertyInquiryRoom: build.mutation<
      {
        success: boolean;
        roomId: string;
        matrixRoomId: string;
        roomName: string;
      },
      { exposeId: string; buyerId: string }
    >({
      query: ({ exposeId, buyerId }) => ({
        url: "matrix/rooms/property-inquiry",
        method: "POST",
        body: { exposeId, buyerId },
      }),
      invalidatesTags: [{ type: "MatrixRooms", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Chat room created!",
          error: "Failed to create chat room.",
        });
      },
    }),

    // Create direct message room
    createDirectMessageRoom: build.mutation<
      {
        success: boolean;
        roomId: string;
        matrixRoomId: string;
        roomName: string;
      },
      { user1Id: string; user2Id: string }
    >({
      query: ({ user1Id, user2Id }) => ({
        url: "matrix/rooms/direct",
        method: "POST",
        body: { user1Id, user2Id },
      }),
      invalidatesTags: [{ type: "MatrixRooms", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Chat started!",
          error: "Failed to start chat.",
        });
      },
    }),

    // Get Matrix registration stats (admin only)
    getMatrixStats: build.query<MatrixRegistrationStats, void>({
      query: () => "matrix/admin/stats",
    }),

    // Look up users by their Matrix IDs (for displaying names/avatars in chat)
    lookupMatrixUsers: build.mutation<
      {
        users: Record<
          string,
          {
            id: string;
            firstName: string;
            lastName: string;
            fullName: string;
            avatarUrl: string | null;
            role: string;
          }
        >;
      },
      { matrixUserIds: string[] }
    >({
      query: ({ matrixUserIds }) => ({
        url: "matrix/users/lookup",
        method: "POST",
        body: { matrixUserIds },
      }),
    }),
  }),
});

// ============================================
// EXPORTS
// ============================================

export const {
  // Auth
  useGetAuthUserQuery,

  // Properties
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useGetPropertyQuery,
  useGetSellerPropertiesQuery,
  useGetPropertyTypesQuery,
  useUpdatePropertyMutation,
  useGetVillagesQuery,

  // Favorites
  useGetFavoritesQuery,
  useGetFavoriteIdsQuery,
  useCheckFavoriteQuery,
  useToggleFavoriteMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,

  // Matrix
  useRegisterMatrixAccountMutation,
  useGetMatrixRoomsQuery,
  useGetMatrixRoomByPropertyQuery,
  useCreatePropertyInquiryRoomMutation,
  useCreateDirectMessageRoomMutation,
  useGetMatrixStatsQuery,
  useLookupMatrixUsersMutation,
} = api;