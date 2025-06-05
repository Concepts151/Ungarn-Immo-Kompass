import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface RangeFilter {
  min: number
  max: number
}

interface PropertyFilter {
  keyword: string
  city: string
  state: string // Added state field
  status: string // Added status field
  propertyType: string
  bedrooms: RangeFilter
  bathrooms: RangeFilter
  garages: RangeFilter // Added garages field
  rooms: RangeFilter // Added rooms field
  price: RangeFilter
  size: RangeFilter
  amenities: string[]
}

interface PropertySort {
  sort: string
  perPage: {
    start: number
    end: number
  }
}

interface FilterState {
  propertyFilter: PropertyFilter
  propertySort: PropertySort
}

const initialState: FilterState = {
  propertyFilter: {
    keyword: "",
    city: "",
    state: "", // Added state with empty default
    status: "", // Added status with empty default
    propertyType: "",
    bedrooms: {
      min: 0,
      max: 10,
    },
    bathrooms: {
      min: 0,
      max: 10,
    },
    garages: {
      // Added garages range
      min: 0,
      max: 5,
    },
    rooms: {
      // Added rooms range
      min: 0,
      max: 20,
    },
    price: {
      min: 0,
      max: 5000000, // Increased max price to accommodate luxury properties
    },
    size: {
      min: 0,
      max: 10000,
    },
    amenities: [],
  },
  propertySort: {
    sort: "",
    perPage: {
      start: 0,
      end: 12, // Default to 12 items per page
    },
  },
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addKeyword: (state, action: PayloadAction<string>) => {
      state.propertyFilter.keyword = action.payload
    },
    addCity: (state, action: PayloadAction<string>) => {
      state.propertyFilter.city = action.payload
    },
    addState: (state, action: PayloadAction<string>) => {
      // Added state reducer
      state.propertyFilter.state = action.payload
    },
    addStatus: (state, action: PayloadAction<string>) => {
      // Added status reducer
      state.propertyFilter.status = action.payload
    },
    addPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyFilter.propertyType = action.payload
    },
    addBedrooms: (state, action: PayloadAction<RangeFilter>) => {
      state.propertyFilter.bedrooms = action.payload
    },
    addBathrooms: (state, action: PayloadAction<RangeFilter>) => {
      state.propertyFilter.bathrooms = action.payload
    },
    addGarages: (state, action: PayloadAction<RangeFilter>) => {
      // Added garages reducer
      state.propertyFilter.garages = action.payload
    },
    addRooms: (state, action: PayloadAction<RangeFilter>) => {
      // Added rooms reducer
      state.propertyFilter.rooms = action.payload
    },
    addPrice: (state, action: PayloadAction<RangeFilter>) => {
      state.propertyFilter.price = action.payload
    },
    addSize: (state, action: PayloadAction<RangeFilter>) => {
      state.propertyFilter.size = action.payload
    },
    addAmenity: (state, action: PayloadAction<string>) => {
      const amenity = action.payload
      const amenities = state.propertyFilter.amenities
      const index = amenities.indexOf(amenity)
      if (index === -1) {
        amenities.push(amenity)
      } else {
        amenities.splice(index, 1)
      }
    },
    clearAmenities: (state) => {
      state.propertyFilter.amenities = []
    },
    addSort: (state, action: PayloadAction<string>) => {
      state.propertySort.sort = action.payload
    },
    addPerPage: (state, action: PayloadAction<{ start: number; end: number }>) => {
      state.propertySort.perPage = action.payload
    },
    resetFilters: () => {
      return initialState
    },
  },
})

export const {
  addKeyword,
  addCity,
  addState, // Export new state action
  addStatus, // Export new status action
  addPropertyType,
  addBedrooms,
  addBathrooms,
  addGarages, // Export new garages action
  addRooms, // Export new rooms action
  addPrice,
  addSize,
  addAmenity,
  clearAmenities,
  addSort,
  addPerPage,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer

