'use client'
import InnerHeader from '@/components/layout/InnerHeader'
import Layout from '@/components/layout/Layout'
import PropertiesDetails from '@/components/sections/PropertiesDetails'
import React from 'react'
import { useParams } from "next/navigation";
import { useGetPropertyQuery } from '@/state/api'
import PropertyInner from '@/components/sections/PropertyInner'

export interface Expose {
  id: string;
  sellerId: string;
  status: "IN_REVIEW" | "APPROVED" | "REJECTED" | string;
  reasonRejection: string | null;
  createdAt: string;
  updatedAt: string;

  seller: {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string;
    matrixUserId: string;
    role: "BUYER" | "SELLER" | string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isSellerVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };

  basic: {
    exposeId: string;
    propertyType: "HOUSE" | "APARTMENT" | "LAND" | string;
    address: string;
    postalCode: string;
    city: string;
    county: string;
    price: number;
    currency: string;
    lotSize: number;
    livingArea: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    buildYear: number;
    lastRenovation: string | number;
  };

  details: {
    exposeId: string;
    material: string;
    roofType: string;
    roofCondition: string;
    insulation: string;
    windows: string;
    windowsAge: number;
    hasRollerShutters: boolean;
    heatingType: string;
    heatingCondition: string;
    electricCondition: string;
    waterCondition: string;
    energyCertificate: boolean;
    energyConsumption: number;
    energyClass: string;
    internetType: string;
    internetSpeed: number;
    monthlyCosts: {
      gas: number;
      tax: number;
      trash: number;
      water: number;
      electricity: number;
    };
    gardenDesc: string;
  };

  condition: {
    exposeId: string;
    structureRating: number;
    electricRating: number;
    heatingRating: number;
    damageDescription: string;
    renovationNeeded: string;
    additionalNotes: string;
  };

  location: {
    exposeId: string;
    latitude: number;
    longitude: number;
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };

  media: {
    id: string;
    exposeId: string;
    mediaType: "PHOTO" | "VIDEO" | string;
    url: string;
    thumbnailUrl: string;
    uploadedAt: string;
  }[];

  floorplans: {
    id: string;
    exposeId: string;
    url: string;
    uploadedAt: string;
  }[];
}


const page = () => {
    const { id } = useParams();
    // Ensure id is a string
    const propertyId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
    const { data: property, error, isLoading } = useGetPropertyQuery(propertyId);
    console.log("property details:", property);

    if  (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading property details.</div>;
    }   

    if (!property) {
        return <div>No property data available.</div>;
    }
  return (
    <>
      <Layout headerStyle={5}>
        <InnerHeader title="property details" currentpage="Property details" />
        <PropertiesDetails property={property}/>
        <PropertyInner block_extend="d-block" property={property}/>
        {/* <pre>{JSON.stringify(property, null,2)}</pre> */}
      </Layout>
    </>
  )
}

export default page
