import { cleanParams, createNewUserInDatabase, withToast } from "@/lib/utils";
import { FiltersState, Property } from "@/types/api";
import { createClient } from "@/utils/supabase/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supabase = createClient();

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "3002",
    baseUrl: "http://localhost:3005",
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
  tagTypes: ["Properties"],
  endpoints: (build) => ({
    getAuthUser: build.query<any, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

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
          
          let userDetailsResponse = await fetchWithBQ(endpoint);
          console.log("user:", user);
          console.log("userDetailsResponse:", userDetailsResponse);

          if (!userDetailsResponse.data) {
            userDetailsResponse = await createNewUserInDatabase(
              user, 
              idToken,
              userRole,
              fetchWithBQ
            );
          }

          // Get Matrix credentials if user has a matrixUserId
          let matrixCredentials = null;
          const userData = userDetailsResponse.data as { matrixUserId?: string; matrixPassword?: string };
          if (userData?.matrixUserId && userData?.matrixPassword) {
            try {
              const matrixResponse = await fetchWithBQ({
                url: 'auth/matrix-token',  // Remove leading slash
                method: 'POST',
                body: {
                  matrixUserId: userData.matrixUserId,
                  matrixPassword: userData.matrixPassword
                }
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
  }),
});

export const {
  useGetPropertiesQuery,
  useGetAuthUserQuery,
  useCreatePropertyMutation,
  useGetPropertyQuery,
} = api;