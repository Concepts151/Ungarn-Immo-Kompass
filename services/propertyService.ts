import { PropertyResponse } from '@/types/property';

export const getPropertyById = async (id: string): Promise<PropertyResponse> => {
    try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch property data');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
    }
} 