import initialProperties from "@/data/property.json"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Define types for our state
interface Property {
  id: number
  keyword: string
  address: string
  city: string
  state: string
  status: string
  type: string
  bedrooms: number
  bathrooms: number
  garages: number
  rooms: number
  minPrice: number
  maxPrice: number
  minSize: number
  maxSize: number
  amenities: string[]
}

interface PropertyType {
  id: number
  name: string
  value: string
}

interface Amenity {
  id: number
  name: string
  value: string
  isChecked: boolean
}

interface City {
  id: number
  name: string
  value: string
}

interface State {
  id: number
  name: string
  value: string
}

interface Status {
  id: number
  name: string
  value: string
}

interface SortOption {
  id: number
  name: string
  value: string
}

interface PropertyState {
  properties: Property[]
  favoriteProperties: number[]
  propertyTypes: PropertyType[]
  amenitiesList: Amenity[]
  cities: City[]
  states: State[]
  statuses: Status[]
  sortOptions: SortOption[]
}

// Type for property update payload
interface UpdatePropertyPayload {
  id: number
  [key: string]: any // Allow any property to be updated
}

const initialState: PropertyState = {
  properties: initialProperties as Property[],
  favoriteProperties: [],
  propertyTypes: [
    { id: 1, name: "House", value: "house" },
    { id: 2, name: "Apartment", value: "apartment" },
    { id: 3, name: "Condo", value: "condo" },
    { id: 4, name: "Villa", value: "villa" },
    { id: 5, name: "Cottage", value: "cottage" },
    { id: 6, name: "Penthouse", value: "penthouse" },
    { id: 7, name: "Loft", value: "loft" },
    { id: 8, name: "Farmhouse", value: "farmhouse" },
    { id: 9, name: "Luxury Homes", value: "luxury-homes" },
    { id: 10, name: "Single Family", value: "single-family" },
    { id: 11, name: "Farm", value: "farm" },
  ],
  amenitiesList: [
    { id: 1, name: "Air Conditioning", value: "air-conditioning", isChecked: false },
    { id: 2, name: "Parking", value: "parking", isChecked: false },
    { id: 3, name: "Swimming Pool", value: "swimming-pool", isChecked: false },
    { id: 4, name: "Garden", value: "garden", isChecked: false },
    { id: 5, name: "Wifi", value: "wifi", isChecked: false },
    { id: 6, name: "Elevator", value: "elevator", isChecked: false },
    { id: 7, name: "Intercom", value: "intercom", isChecked: false },
    { id: 8, name: "Furnishing", value: "furnishing", isChecked: false },
    { id: 9, name: "Cable TV", value: "cable-tv", isChecked: false },
    { id: 10, name: "Balcony", value: "balcony", isChecked: false },
    { id: 11, name: "Pet Friendly", value: "pet-friendly", isChecked: false },
    { id: 12, name: "Fireplace", value: "fireplace", isChecked: false },
    { id: 13, name: "Heating", value: "heating", isChecked: false },
    { id: 14, name: "Garage", value: "garage", isChecked: false },
    { id: 15, name: "Disabled Access", value: "disabled-access", isChecked: false },
    { id: 16, name: "Gym", value: "gym", isChecked: false },
    { id: 17, name: "Sauna", value: "sauna", isChecked: false },
    { id: 18, name: "Outdoor Shower", value: "outdoor-shower", isChecked: false },
    { id: 19, name: "Barbeque", value: "barbeque", isChecked: false },
    { id: 20, name: "Lawn", value: "lawn", isChecked: false },
  ],
  cities: [
    { id: 1, name: "Los Angeles", value: "los-angeles" },
    { id: 2, name: "New York", value: "new-york" },
    { id: 3, name: "Miami", value: "miami" },
    { id: 4, name: "Austin", value: "austin" },
    { id: 5, name: "Chicago", value: "chicago" },
    { id: 6, name: "Atlanta", value: "atlanta" },
    { id: 7, name: "Denver", value: "denver" },
    { id: 8, name: "Seattle", value: "seattle" },
    { id: 9, name: "Nashville", value: "nashville" },
    { id: 10, name: "Newark", value: "newark" },
    { id: 11, name: "Dallas", value: "dallas" },
    { id: 12, name: "Bridgaport", value: "bridgaport" },
    { id: 13, name: "Aspen", value: "aspen" },
    { id: 14, name: "Boston", value: "boston" },
    { id: 15, name: "Phoenix", value: "phoenix" },
    { id: 16, name: "Portland", value: "portland" },
    { id: 17, name: "San Diego", value: "san-diego" },
    { id: 18, name: "Bozeman", value: "bozeman" },
  ],
  // Added states array based on the JSON data
  states: [
    { id: 1, name: "California", value: "california" },
    { id: 2, name: "New York", value: "new-york" },
    { id: 3, name: "Florida", value: "florida" },
    { id: 4, name: "Texas", value: "texas" },
    { id: 5, name: "Illinois", value: "illinois" },
    { id: 6, name: "Georgia", value: "georgia" },
    { id: 7, name: "Colorado", value: "colorado" },
    { id: 8, name: "Washington", value: "washington" },
    { id: 9, name: "Tennessee", value: "tennessee" },
    { id: 10, name: "New Jersey", value: "new-jersey" },
    { id: 11, name: "Arizona", value: "arizona" },
    { id: 12, name: "Massachusetts", value: "massachusetts" },
    { id: 13, name: "Oregon", value: "oregon" },
    { id: 14, name: "Montana", value: "montana" },
  ],
  // Added statuses array based on the JSON data
  statuses: [
    { id: 1, name: "For Sale", value: "for-sale" },
    { id: 2, name: "For Rent", value: "for-rent" },
  ],
  sortOptions: [
    { id: 1, name: "Price: Low to High", value: "price-asc" },
    { id: 2, name: "Price: High to Low", value: "price-desc" },
    { id: 3, name: "Size: Small to Large", value: "size-asc" },
    { id: 4, name: "Size: Large to Small", value: "size-desc" },
    { id: 5, name: "Bedrooms: Low to High", value: "bedrooms-asc" },
    { id: 6, name: "Bedrooms: High to Low", value: "bedrooms-desc" },
    { id: 7, name: "Newest", value: "newest" },
    { id: 8, name: "Oldest", value: "oldest" },
  ],
}

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    toggleFavoriteProperty: (state, { payload }: PayloadAction<number>) => {
      const propertyId = payload
      const isExist = state.favoriteProperties.includes(propertyId)

      if (isExist) {
        state.favoriteProperties = state.favoriteProperties.filter((id) => id !== propertyId)
      } else {
        state.favoriteProperties.push(propertyId)
      }
    },
    toggleAmenityCheck: (state, { payload }: PayloadAction<number>) => {
      state.amenitiesList = state.amenitiesList.map((item) => {
        if (item.id === payload) {
          return { ...item, isChecked: !item.isChecked }
        }
        return item
      })
    },
    clearAmenityFilters: (state) => {
      state.amenitiesList = state.amenitiesList.map((item) => ({
        ...item,
        isChecked: false,
      }))
    },
    addProperty: (state, { payload }: PayloadAction<Omit<Property, "id">>) => {
      // Generate a new ID based on the highest existing ID
      const newId = Math.max(...state.properties.map((p) => p.id)) + 1
      state.properties.push({ ...payload, id: newId })
    },
    updateProperty: (state, { payload }: PayloadAction<UpdatePropertyPayload>) => {
      const { id, ...updatedData } = payload
      const index = state.properties.findIndex((property) => property.id === id)
      if (index !== -1) {
        state.properties[index] = { ...state.properties[index], ...updatedData }
      }
    },
    deleteProperty: (state, { payload }: PayloadAction<number>) => {
      state.properties = state.properties.filter((property) => property.id !== payload)
    },
  },
})

export const {
  toggleFavoriteProperty,
  toggleAmenityCheck,
  clearAmenityFilters,
  addProperty,
  updateProperty,
  deleteProperty,
} = propertySlice.actions

export default propertySlice.reducer

