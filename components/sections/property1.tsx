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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("HomePage");
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState<FiltersState>(initialState);

  // Use local filters for landing page to show properties based on selected tab
  const { data, isLoading } = useGetPropertiesQuery({
    propertyType: filters.propertyType || "HOUSE",
    limit: 6
  });

  // Extract properties array from paginated response
  const Properties = data?.data || [];

  console.log("Landing page properties:", Properties);

  return (
    <>
      <div className="space30"></div>

      <div className="property1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9 m-auto">
              <div className="heading1 text-center">
                <h5>{t('Properties_subtitle')}</h5>
                <div className="space16" />
                <h2 className="text-anime-style-2">
                  {t('Properties_title')}
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
                    {Properties.length === 0 ? (
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center py-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              style={{ margin: '0 auto', color: '#ccc' }}
                            >
                              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <h4 style={{ marginTop: '20px', color: '#666' }}>No Properties Found</h4>
                            <p style={{ color: '#999', fontSize: '14px' }}>
                              Try adjusting your filters to see more results
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        {Properties.map((property) => (
                          <LandingPropertyCard
                            key={property.id}
                            basic={property.basic}
                            media={property.media}
                            seller = {property.seller}
                          />
                        ))}
                      </div>
                    )}
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
