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

export interface Village {
  id: string;
  name: string;
  county: string;
  population: number;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
  distance_km?: number;
}

export interface NearestVillageResponse {
  success: boolean;
  data: {
    villages: Village[];
    nearestMatch: Village | null;
    searchParams: {
      latitude: number;
      longitude: number;
      county: string | null;
      radiusKm: number;
    };
  };
}

export interface SearchVillagesResponse {
  success: boolean;
  data: Village[];
}

export interface VillagesByCountyResponse {
  success: boolean;
  data: Village[];
  count: number;
}

export interface CountiesResponse {
  success: boolean;
  data: Array<{
    name: string;
    villageCount: number;
  }>;
}

export interface FindNearestVillageParams {
  lat: number;
  lng: number;
  county?: string;
  radius?: number;
}

export interface SearchVillagesParams {
  search?: string;
  county?: string;
  limit?: number;
}

// Full village detail response
export interface VillageDetail {
  id: string;
  name: string;
  county: string;
  population: number;
  description: string;
  thumbnailUrl: string | null;
  latitude: number;
  longitude: number;
  status: "IN_REVIEW" | "PUBLISHED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  infrastructure?: {
    villageId: string;
    hasGroceryStore: boolean;
    hasSupermarket: boolean;
    supermarketName: string | null;
    storeDistanceKm: number | null;
    hasWeeklyMarket: boolean;
    hasBaker: boolean;
    hasButcher: boolean;
    hasHouseDoctor: boolean;
    doctorHours: string | null;
    doctorGerman: boolean;
    nextSpecialistKm: number | null;
    nextHospitalKm: number | null;
    hasPharmacy: boolean;
    pharmacyHours: string | null;
    hasDentist: boolean;
    dentistGerman: boolean;
    hasPost: boolean;
    hasAtm: boolean;
    hasBank: boolean;
    bankName: string | null;
    hasKindergarten: boolean;
    kindergartenInfo: string | null;
    hasPrimarySchool: boolean;
    primarySchoolInfo: string | null;
    hasSecondarySchool: boolean;
    secondarySchoolInfo: string | null;
    restaurantsCount: number;
    restaurantInfo: string | null;
  };
  internet?: {
    villageId: string;
    typicalSpeed: number;
    internetTypes: string[];
    mobileCoverage: string | null;
  };
  transport?: {
    villageId: string;
    busRoutes: string;
    busFrequency: string;
    trainStation: string | null;
    trainDistanceKm: number | null;
    motorwayDistanceKm: number | null;
  };
  community?: {
    villageId: string;
    germanCommunityCount: number;
    associations: string;
    festivals: string;
    atmosphere: string;
  };
  leisure?: {
    villageId: string;
    nearLakes: boolean;
    hikingTrails: boolean;
    bicyclePaths: boolean;
    spaDistanceKm: number | null;
    culturalSites: string;
    nearestTownDistanceKm: number | null;
  };
  links?: {
    id: string;
    villageId: string;
    linkType: "WEBSITE" | "WIKIPEDIA" | "YOUTUBE" | "OTHER";
    url: string;
  }[];
  _translation?: {
    language: string;
    applied: boolean;
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
              fetchWithBQ,
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

          if (userData?.matrixUserId) {
            try {
              console.log(
                "[getAuthUser] Fetching Matrix credentials for:",
                userData.matrixUserId,
              );
              const matrixResponse = await fetchWithBQ({
                url: "matrix/token",
                method: "POST",
                body: {
                  matrixUserId: userData.matrixUserId,
                },
              });

              if (matrixResponse.data) {
                console.log(
                  "[getAuthUser] Matrix credentials fetched successfully",
                );
                matrixCredentials = matrixResponse.data;
              } else {
                console.warn("[getAuthUser] No Matrix credentials returned");
              }
            } catch (matrixError) {
              console.error("Failed to get Matrix credentials:", matrixError);
            }
          } else {
            console.log("[getAuthUser] User has no Matrix account yet");
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
      {
        data: Property[];
        pagination: {
          currentPage: number;
          itemsPerPage: number;
          totalItems: number;
          totalPages: number;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      },
      Partial<
        FiltersState & { favoriteIds?: number[]; page?: number; limit?: number }
      >
    >({
      query: (filters) => {
        const params = cleanParams({
          location: filters.location,
          priceMin: filters.priceRange?.[0],
          priceMax: filters.priceRange?.[1],
          bedrooms: filters.beds,
          bathrooms: filters.baths,
          propertyType: filters.propertyType,
          livingAreaMin: filters.squareFeet?.[0],
          livingAreaMax: filters.squareFeet?.[1],
          latitude: filters.coordinates?.[1],
          longitude: filters.coordinates?.[0],
          village: (filters as any).village,
          page: filters.page || 1,
          limit: filters.limit || 12,
        });

        return { url: "properties", params };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Properties" as const,
                id,
              })),
            ]
          : [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch properties.",
        });
      },
    }),

    extractDocument: build.mutation<any, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("document", file);
        return {
          url: "properties/extract-document",
          method: "POST",
          body: formData,
        };
      },
    }),

    getProperty: build.query<Property, { id: string; lang?: string }>({
      query: ({ id, lang }) => ({
        url: `properties/${id}`,
        params: lang ? { lang } : undefined,
      }),
      providesTags: (result, error, { id, lang }) => [
        { type: "Properties", id: `${result?.id}_${lang || "default"}` },
      ],
      keepUnusedDataFor: 300, // Keep cached translations for 5 minutes
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
    getVillages: build.query<
      GetVillagesResponse,
      { county?: string; search?: string; limit?: number }
    >({
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
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getFavoriteIds", userId, (draft) => {
            const index = draft.favoriteIds.indexOf(propertyId);
            if (index > -1) {
              draft.favoriteIds.splice(index, 1);
            } else {
              draft.favoriteIds.push(propertyId);
            }
          }),
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

    // ==================== TRANSLATION ENDPOINTS ====================
    // Translate single message
    translateMessage: build.mutation<
      {
        success: boolean;
        data: {
          originalText: string;
          translatedText: string;
          detectedLanguage: string;
          targetLanguage: string;
        };
      },
      { text: string; targetLanguage: string; sourceLanguage?: string }
    >({
      query: ({ text, targetLanguage, sourceLanguage }) => ({
        url: "translation/translate",
        method: "POST",
        body: { text, targetLanguage, sourceLanguage },
      }),
    }),

    // Translate to multiple languages
    translateToMultiple: build.mutation<
      {
        success: boolean;
        data: {
          originalText: string;
          detectedLanguage: string;
          translations: Record<string, string>;
        };
      },
      { text: string; targetLanguages: string[]; sourceLanguage?: string }
    >({
      query: ({ text, targetLanguages, sourceLanguage }) => ({
        url: "translation/translate-multiple",
        method: "POST",
        body: { text, targetLanguages, sourceLanguage },
      }),
    }),

    // Detect language
    detectLanguage: build.mutation<
      {
        success: boolean;
        data: {
          text: string;
          detectedLanguage: string;
          supportedLanguages: string[];
        };
      },
      { text: string }
    >({
      query: ({ text }) => ({
        url: "translation/detect",
        method: "POST",
        body: { text },
      }),
    }),

    // Get supported languages
    getSupportedLanguages: build.query<
      {
        success: boolean;
        data: {
          languages: string[];
          languageNames: Record<string, string>;
        };
      },
      void
    >({
      query: () => "translation/languages",
    }),

    // ==================== VILLAGE ENDPOINTS ====================
    findNearestVillage: build.query<
      NearestVillageResponse,
      FindNearestVillageParams
    >({
      query: ({ lat, lng, county, radius = 5 }) => ({
        url: "village/nearest",
        params: { lat, lng, county, radius },
      }),
      providesTags: [{ type: "Properties", id: "NEAREST_VILLAGE" }],
    }),

    searchVillages: build.query<SearchVillagesResponse, SearchVillagesParams>({
      query: ({ search, county, limit = 20 }) => ({
        url: "village/search",
        params: { search, county, limit },
      }),
      providesTags: [{ type: "Properties", id: "SEARCH_VILLAGES" }],
    }),

    getVillagesByCounty: build.query<VillagesByCountyResponse, string>({
      query: (county) => `village/by-county/${encodeURIComponent(county)}`,
      providesTags: (result, error, county) => [
        { type: "Properties", id: `VILLAGES_${county}` },
      ],
    }),

    getVillage: build.query<
      { success: boolean; village: VillageDetail },
      { id: string; lang?: string }
    >({
      query: ({ id, lang }) => ({
        url: `villages/${id}`,
        params: lang ? { lang } : undefined,
      }),
      providesTags: (result, error, { id, lang }) => [
        { type: "Properties", id: `VILLAGE_${id}_${lang || "default"}` },
      ],
      keepUnusedDataFor: 300, // Keep cached translations for 5 minutes
    }),

    getCountiesWithVillages: build.query<CountiesResponse, void>({
      query: () => "village/counties",
      providesTags: [{ type: "Properties", id: "COUNTIES" }],
    }),

    // ==================== REGION DISCOVERY ENDPOINTS ====================
    lookupZip: build.query<
      {
        id: string;
        zip: string;
        city: string;
        regionId: number;
        region: any;
      }[],
      string
    >({
      query: (zip) => `regions/lookup/${zip}`,
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
  useExtractDocumentMutation,

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

  // Translation
  useTranslateMessageMutation,
  useTranslateToMultipleMutation,
  useDetectLanguageMutation,
  useGetSupportedLanguagesQuery,

  // Villages
  useFindNearestVillageQuery,
  useSearchVillagesQuery,
  useGetVillagesByCountyQuery,
  useGetVillageQuery,
  useGetCountiesWithVillagesQuery,

  // Regions
  useLookupZipQuery,
  useLazyLookupZipQuery,
} = api;
