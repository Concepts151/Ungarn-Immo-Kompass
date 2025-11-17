// Enums matching Prisma schema
export enum UserRole {
  BUYER = "BUYER",
  SELLER = "SELLER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum PropertyType {
  HOUSE = "HOUSE",
  FARMHOUSE = "FARMHOUSE",
  HOLIDAY_HOME = "HOLIDAY_HOME",
  APARTMENT = "APARTMENT",
  LAND = "LAND",
}

export enum Currency {
  HUF = "HUF",
  EUR = "EUR",
}

export enum MediaType {
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}

export enum ExposeStatus {
  IN_REVIEW = "IN_REVIEW",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

// Village type
export interface Village {
  id: string;
  name: string;
  county: string;
  population: number;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

// Basic property information
export interface ExposeBasic {
  exposeId: string;
  title: string | null;
  propertyType: PropertyType;
  address: string;
  postalCode: string;
  city: string;
  county: string;
  villageId: string | null;
  price: number;
  currency: Currency;
  lotSize: number;
  livingArea: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  buildYear: number;
  lastRenovation: string | null;
  village?: Village | null;
}

// Monthly costs structure
export interface MonthlyCosts {
  electricity: number;
  water: number;
  gas: number;
  trash: number;
  tax: number;
}

// Detailed property information
export interface ExposeDetails {
  exposeId: string;
  material: string | null;
  roofType: string | null;
  roofCondition: string | null;
  insulation: string | null;
  windows: string | null;
  windowsAge: number | null;
  hasRollerShutters: boolean;
  heatingType: string;
  heatingCondition: string;
  electricCondition: string;
  waterCondition: string;
  energyCertificate: boolean;
  energyConsumption: number | null;
  energyClass: string | null;
  internetType: string;
  internetSpeed: number;
  monthlyCosts: MonthlyCosts;
  gardenDesc: string | null;
}

// Property condition
export interface ExposeCondition {
  exposeId: string;
  structureRating: number; // 1-5
  electricRating: number; // 1-5
  heatingRating: number; // 1-5
  damageDescription: string;
  renovationNeeded: string;
  additionalNotes: string | null;
}

// Property location
export interface ExposeLocation {
  exposeId: string;
  latitude: number;
  longitude: number;
}

// Media (photos/videos)
export interface ExposeMedia {
  id: string;
  exposeId: string;
  mediaType: MediaType;
  url: string;
  thumbnailUrl: string | null;
  uploadedAt: string;
}

// Floorplans
export interface ExposeFloorplan {
  id: string;
  exposeId: string;
  url: string;
  uploadedAt: string;
}

// Main property (Expose) type
export interface SellerProperty {
  id: string;
  sellerId: string;
  status: ExposeStatus;
  reasonRejection: string | null;
  createdAt: string;
  updatedAt: string;
  basic: ExposeBasic | null;
  details: ExposeDetails | null;
  condition: ExposeCondition | null;
  location: ExposeLocation | null;
  media: ExposeMedia[];
  floorplans: ExposeFloorplan[];
}

// Pagination metadata
export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// API Response for getting seller properties
export interface GetSellerPropertiesResponse {
  success: boolean;
  data: SellerProperty[];
  pagination: PaginationMetadata;
}

// API Response for getting a single seller property
export interface GetSellerPropertyResponse {
  success: boolean;
  data: SellerProperty;
}

// API Error Response
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Query parameters for fetching seller properties
export interface GetSellerPropertiesParams {
  page?: number;
  limit?: number;
  status?: ExposeStatus;
}