import { NextResponse } from 'next/server';
import propertyData from '@/data/property.json';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request: Request, context: Props) {
    try {
        // Await the entire params object first
        const params = await context.params;
        const property = propertyData.find(p => p.id === parseInt(params.id));

        if (!property) {
            return NextResponse.json(
                { success: false, message: 'Property not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: property });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
} 