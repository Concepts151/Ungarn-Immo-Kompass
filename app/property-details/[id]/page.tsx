import { notFound } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties1Details from "@/components/sections/Properties1Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
import propertyData from '@/data/property.json';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

async function validateProperty(params: { id: string }) {
    const property = propertyData.find(p => p.id === parseInt(params.id));
    if (!property) {
        notFound();
    }
}

export default async function PropertyDetails({ params }: PageProps) {
    const resolvedParams = await params;
    await validateProperty(resolvedParams);

    return (
        <>
            <Layout>
                <InnerHeader title="Properties Details" currentpage="Properties Details" />
                <Properties1Details />
                <PropertyInner block_extend="d-none" />
                <div className="space30"></div>
                <PropertyBottom />
                <div className="space30"></div>
            </Layout>
        </>
    );
}