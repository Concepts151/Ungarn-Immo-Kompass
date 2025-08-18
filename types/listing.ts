// Base database table interfaces
export interface Expose {
    id: string; // uuid
    created_at: string; // timestamp with time zone
    sellerId: string; // uuid
    status: string;
    reasonRejection?: string;
    update_at: string; // timestamp without time zone
  }
  
  export interface ExposeDetails {
    id: string;
    created_at: string;
    exposeId: string;
    material?: string;
    roofType?: string;
    roofCondition?: string;
    insulation?: string;
    windows?: string;
    windowsAge?: string;
    hasRollerShutter?: boolean;
    heatingType?: string;
    heatingCondition?: string;
    electricConditions?: string;
    waterCondition?: string; // Fixed typo from waterCodition
    energyCertificate?: boolean;
    energyConsumption?: number;
    energyClass?: string;
    internetType?: string;
    internetSpeed?: string;
    monthyCost?: Record<string, any>; // JSON field
    gardenDesc?: string;
  }
  
  export interface ExposeLocation {
    id: string;
    created_at: string;
    ExposeId: string;
    latitude: number;
    longitude: number;
  }
  
  export interface ExposeBasic {
    id: string;
    created_at: string;
    exposeId: string;
    propertyType: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    price: number;
    currency: string;
    lotSize?: number;
    livingArea: number;
    rooms: number;
    bedroom: number;
    bathroom: number;
    buildYear?: number;
    lastRenovation?: string;
  }
  
  export interface ExposeMedia {
    id: number;
    created_at: string;
    exposeId: string;
    mediaType: string;
    url: string;
    thumbnailUrl?: string;
  }
  
  export interface ExposeCondition {
    id: string;
    created_at: string;
    exposeId: string;
    structureRating?: number;
    electricRating?: number;
    heatingRating?: number;
    damageDescription?: string;
    renovationNeeded?: string;
    additionalNotes?: string;
  }
  
  // Enums for better type safety
  export enum PropertyType {
    HOUSE = 'house',
    APARTMENT = 'apartment',
    CONDO = 'condo',
    VILLA = 'villa',
    TOWNHOUSE = 'townhouse',
    LAND = 'land'
  }
  
  export enum ListingStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    PENDING = 'pending',
    SOLD = 'sold',
    REJECTED = 'rejected',
    EXPIRED = 'expired'
  }
  
  export enum EnergyClass {
    A_PLUS_PLUS = 'A++',
    A_PLUS = 'A+',
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G'
  }
  
  export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP'
  }
  
  // Create interfaces (omitting auto-generated fields)
  export interface CreateExposeBasic {
    propertyType: PropertyType;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    price: number;
    currency: Currency;
    livingArea: number;
    rooms: number;
    bedroom: number;
    bathroom: number;
    lotSize?: number;
    buildYear?: number;
    lastRenovation?: string;
  }
  
  export interface CreateExposeDetails {
    material?: string;
    roofType?: string;
    roofCondition?: string;
    insulation?: string;
    windows?: string;
    windowsAge?: string;
    hasRollerShutter?: boolean;
    heatingType?: string;
    heatingCondition?: string;
    electricConditions?: string;
    waterCondition?: string;
    energyCertificate?: boolean;
    energyConsumption?: number;
    energyClass?: EnergyClass;
    internetType?: string;
    internetSpeed?: string;
    monthyCost?: {
      utilities?: number;
      maintenance?: number;
      insurance?: number;
      taxes?: number;
      other?: Record<string, number>;
    };
    gardenDesc?: string;
  }
  
  export interface CreateExposeLocation {
    latitude: number;
    longitude: number;
  }
  
  export interface CreateExposeCondition {
    structureRating?: number; // 1-10 scale
    electricRating?: number; // 1-10 scale  
    heatingRating?: number; // 1-10 scale
    damageDescription?: string;
    renovationNeeded?: string;
    additionalNotes?: string;
  }
  
  export interface CreateExposeMedia {
    mediaType: 'image' | 'video' | 'document';
    url: string;
    thumbnailUrl?: string;
  }
  
  // Main interface for creating a complete listing
  export interface CreateExpose {
    // Basic required info
    basic: CreateExposeBasic;
    location: CreateExposeLocation;
    
    // Optional detailed information
    details?: CreateExposeDetails;
    condition?: CreateExposeCondition;
    media?: CreateExposeMedia[];
    
    // Status (defaults to 'draft' if not provided)
    status?: ListingStatus;
  }
  
  // Response interface after creation
  export interface CreateExposeResponse {
    expose: Expose;
    basic: ExposeBasic;
    location: ExposeLocation;
    details?: ExposeDetails;
    condition?: ExposeCondition;
    media?: ExposeMedia[];
  }
  
  // Complete listing interface for display/editing
  export interface CompleteExpose {
    expose: Expose;
    basic: ExposeBasic;
    location: ExposeLocation;
    details?: ExposeDetails;
    condition?: ExposeCondition;
    media?: ExposeMedia[];
  }
  
  // Search/Filter interfaces
  export interface ExposeFilters {
    propertyType?: PropertyType[];
    city?: string[];
    minPrice?: number;
    maxPrice?: number;
    minLivingArea?: number;
    maxLivingArea?: number;
    minRooms?: number;
    maxRooms?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    energyClass?: EnergyClass[];
    status?: ListingStatus[];
  }
  
  export interface ExposeSearchParams extends ExposeFilters {
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'created_at' | 'livingArea' | 'rooms';
    sortOrder?: 'asc' | 'desc';
  }