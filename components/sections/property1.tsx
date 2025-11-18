"use client";
import { useGetPropertiesQuery } from "@/state/api";
import { useAppSelector } from "@/state/redux";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LandingPropertyCard from "../custom-comp/landing-property-card";
import { FiltersState } from "@/state";
import { useState } from "react";
import LandingTabsFilterPills from "@/app/components/LandingTabsFilter";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  spaceBetween: 30,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 3500,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const initialState: FiltersState = {
  location: "any",
  beds: "any",
  baths: "any",
  propertyType: "HOUSE",
  amenities: [],
  availableFrom: "any",
  priceRange: [null, null],
  squareFeet: [null, null],
  coordinates: [null, null],
};

export default function Property1() {
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState<FiltersState>(initialState);
  const { data: Properties } = useGetPropertiesQuery(filters);

  console.log(Properties);

  return (
    <>
      <div className="space30"></div>

      <div className="property1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9 m-auto">
              <div className="heading1 text-center">
                <h5>Our Properties</h5>
                <div className="space16" />
                <h2 className="text-anime-style-2">
                  Browse Our Exclusive Properties Listing
                </h2>
              </div>
              <div className="space40" />
            </div>
          </div>
          <div className="row">
            <LandingTabsFilterPills />
            <div className="space40" />
            <div className="col-lg-12">
              <div className="main-tabs-area">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabIndex={0}
                  >
                    <div className="row">
                      {Properties?.map((property) => (
                        <LandingPropertyCard
                          key={property.id}
                          basic={property.basic}
                          media={property.media}
                          seller = {property.seller}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
