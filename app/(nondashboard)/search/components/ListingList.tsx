"use client";
import LandingPropertyCard from '@/components/custom-comp/landing-property-card';

import { useGetPropertiesQuery } from '@/state/api';
import React, { useState } from 'react'
import ListingCard from './ListingCard';
import { useAppSelector } from '@/state/redux';
import { initialState } from '@/state';



const ListingList = () => {
    const filters = useAppSelector((state) => state.global.filters);
    const [localFilters, setLocalFilters] = useState(initialState.filters);
    const {data:Properties} = useGetPropertiesQuery(filters);
    
    console.log(Properties);
  return (
    <>
        <div className="property-mapgrid-area">
            <div className="heading1">
                <h3>

                Properties({Properties?.length})
                </h3>
                <div className="space32" />
                <div className="tabs-btn">
                    <div className="filter-group">
                        <select value={"default"} onChange={()=>console.log("sorting")}>
                            <option value="default">Sort by (Default)</option>
                            <option value="oldest">Oldest</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="space32" />
            <div className="row">
                 {Properties?.map((property)=>(
                    <ListingCard key={property.id} basic={property.basic} media={property.media}/>
                ))}
            </div>
        </div>
    </>
  )
}

export default ListingList
