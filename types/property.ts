export interface PropertyDetail {
    id: number;
    keyword: string; // This will be used as title
    images: {
        [key: string]: string;
    };
    address: string;
    city: string;
    state: string;
    status: string;
    label: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    agent: {
        name: string;
        image: string;
    };
    amenities: string[];
}

export interface PropertyResponse {
    success: boolean;
    data: PropertyDetail;
}

export interface PropertyListItem {
    id: number;
    keyword: string;
    images?: {
        [key: string]: string;
    };
    address: string;
    city: string;
    state: string;
    status: string;
    label: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    amenities: string[];
    agent?: {
        name: string;
        image: string;
    };
} 