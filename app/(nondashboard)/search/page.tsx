"use client"
import PropertyFilter from '@/components/elements/property-filter'
import PropertyList3 from '@/components/elements/property-list3'
import InnerHeader from '@/components/layout/InnerHeader'
import Layout from '@/components/layout/Layout'
import React, { useEffect } from 'react'
import ListingList from './components/ListingList'
import SearchBox from '@/components/sections/SearchBox'
import Map from './components/Map'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/state/redux'
import { cleanParams } from '@/lib/utils'
import { setFilters } from '@/state'

const page = () => {
    const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

    useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === "priceRange" || key === "squareFeet") {
          acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
        } else if (key === "coordinates") {
          acc[key] = value.split(",").map(Number);
        } else {
          acc[key] = value === "any" ? null : value;
        }

        return acc;
      },
      {}
    );

    const cleanFilters = cleanParams(initialFilters);
    dispatch(setFilters(cleanFilters));
  }, []);
  return (
    <>
      <Layout headerStyle={5}>
        <div className="space70"></div>
        <div className="space70"></div>
        {/* <InnerHeader title="Property Half Map List" currentpage="Property Half Map List" /> */}
        <SearchBox />
         <>
                    {/*===== PROPERTY AREA STARTS =======*/}
                    <div className="property-half-grid-area sp1">
                        <div className="container-fluid">
                            <div className="row">
                                {/* <div className="col-lg-3">
                                    <PropertyFilter />
                                </div> */}
                                <div className="col-lg-4">
                                    {/* <PropertyList3 /> */}
                                    <ListingList />
                                </div>
                                <div className="col-lg-8">
                                    <Map /> 
                                    {/* <div className="grid-maps-area">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={250} style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===== PROPERTY AREA ENDS =======*/}
                </>
      </Layout>
    </>
  )
}

export default page
