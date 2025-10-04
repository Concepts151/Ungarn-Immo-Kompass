export type PropertyStatus = "IN_REVIEW" | "APPROVED" | "REJECTED"; // extend as needed
export type MediaType = "PHOTO" | "VIDEO" | "FLOORPLAN"; // extend as needed
export type PropertyType =
  | "HOUSE"
  | "APARTMENT"
  | "FARMHOUSE"
  | "LAND"
  | "COMMERCIAL"; // extend as needed
export type Currency = "HUF" | "EUR" | "USD"; // extend as needed

export interface Property {
  id: string;
  sellerId: string;
  status: PropertyStatus;
  reasonRejection: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  basic: PropertyBasic;
  location: PropertyLocation;
  media: PropertyMedia[];
}

export interface PropertyBasic {
  exposeId: string;
  propertyType: PropertyType;
  address: string;
  postalCode: string;
  city: string;
  county: string;
  price: number;
  currency: Currency;
  lotSize: number;
  livingArea: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  buildYear: number;
  lastRenovation: string | null; // year or ISO string
}

export interface PropertyLocation {
  exposeId: string;
  latitude: number;
  longitude: number;
}

export interface PropertyMedia {
  id: string;
  exposeId: string;
  mediaType: MediaType;
  url: string;
  thumbnailUrl: string;
  uploadedAt: string; // ISO date string
}

// For your array:
export type PropertyList = Property[];

// filter state
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
  }