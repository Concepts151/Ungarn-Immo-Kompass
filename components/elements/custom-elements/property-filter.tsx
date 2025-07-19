import Link from "next/link";
import React, { useState } from "react";
import cities from "@/data/hu.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import {
  fetchListings,
  setFilters,
  clearFilters,
  updateFilter,
  FilterOptions,
} from "@/features/listingFilter/listingFilter";



const PropertyFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchFilters, setSearchFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    property_type: "",
    minBedrooms: "",
    maxBedrooms: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  const handleSearch = (filter: any) => {
    // e.preventDefault();

    // Convert string values to numbers where needed
    const filters: FilterOptions = {
      ...(filter.city && { city: filter.city }),
      ...(filter.minPrice && {
        minPrice: parseInt(filter.minPrice),
      }),
      ...(filter.maxPrice && {
        maxPrice: parseInt(filter.maxPrice),
      }),
      ...(filter.property_type && {
        property_type: filter.property_type,
      }),
      ...(filter.minBedrooms && {
        minBedrooms: parseInt(filter.minBedrooms),
      }),
      ...(filter.maxBedrooms && {
        maxBedrooms: parseInt(filter.maxBedrooms),
      }),
      sortBy: filter.sortBy as
        | "price"
        | "created_at"
        | "living_area"
        | "build_year",
      sortOrder: filter.sortOrder as "asc" | "desc",
    };

    dispatch(fetchListings(filters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchListings({}));
  };

  return (
    <>
      <style jsx>{`
        .filter-group select {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          background-color: #fff;
          font-size: 14px;
          color: #1b1b1b;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231B1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }

        .filter-group select:hover {
          border-color: #d1d1d1;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #1b1b1b;
        }

        .filter-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #1b1b1b;
        }

        .filter-group {
          margin-bottom: 16px;
        }

        .filter-group select option {
          padding: 8px 16px;
          font-size: 14px;
        }

        .filter-group select option:checked {
          background-color: #f5f5f5;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .amenity-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          border: 2px solid #aaa;
          border-radius: 4px;
          position: relative;
          outline: none;
          transition: all 0.2s ease;
        }

        .amenity-item input[type="checkbox"]:checked {
          background-color: var(--ztc-bg-bg-3);
          border-color: var(--ztc-bg-bg-3);
        }

        .amenity-item input[type="checkbox"]:checked::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 1px;
          width: 5px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .amenity-item input[type="checkbox"]:hover {
          border-color: var(--ztc-bg-bg-3);
        }

        .amenity-item label {
          margin: 0;
          cursor: pointer;
          font-weight: normal;
          font-size: 14px;
        }

        .advance-btn {
          background: #d9d9d9;
          border: 0;
          color: #1b1b1b;
          padding: 8px 20px;
          border-radius: 80px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .advance-btn:hover {
          background: var(--ztc-bg-bg-3);
          color: white;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .amenity-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .amenity-item label {
          margin: 0;
          cursor: pointer;
          font-size: 14px;
        }
      `}</style>
      <div className="sidebar1-area">
        <div className="tab-content" id="pills-tabContent">
          <form>
            <div className="row">
              <div className="col-lg-12">
                <div className="input-area filter-group mb-0">
                  <input
                    className="mb-0"
                    type="text"
                    placeholder="Types keyword"
                    value={""}
                    onChange={() => {}}
                  />
                </div>
                <div className="input-area filter-group">
                  <select
                    name="status"
                    className="nice-select"
                    style={{ background: "#fff" }}
                    onChange={(e) => {
                      const filter = {
                        ...searchFilters,
                        city: e.target.value,
                      };
                      setSearchFilters({
                        ...searchFilters,
                        city: e.target.value,
                      });
                      handleSearch(filter); // Automatically submit the form
                    }}
                    value={searchFilters.city}
                  >
                    <option value="">City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-area filter-group">
                  <select
                    name="status"
                    className="nice-select"
                    // onChange={handleStatusChange}
                    // value={propertyFilter.status}
                  >
                    <option value="">All Status</option>
                    {/* {statuses.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.name}
                      </option>
                    ))} */}
                  </select>
                </div>

                {/* <div className="input-area filter-group">
                  <select
                    name="propertyType"
                    className="nice-select"
                    onChange={handlePropertyTypeChange}
                    value={propertyFilter.propertyType}
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((type) => (
                      <option key={type.id} value={type.value || type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* <div className="input-area filter-group">
                  <select
                    name="state"
                    className="nice-select"
                    onChange={handleStateChange}
                    value={propertyFilter.state}
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.value || state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* 
                <div className="input-area filter-group m-0">
                  <select
                    className="country-area"
                    onChange={handleCityChange}
                    value={propertyFilter.city}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.value || city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>
            </div>

            {/* <div className="amenities-section mt-4">
              <h5>Amenities</h5>
              <div className="space12" />
              <div className="d-flex flex-wrap gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="amenity-item">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity.id}`}
                      checked={amenity.checked}
                      onChange={() =>
                        handleAmenityToggle(amenity.id, amenity.name)
                      }
                    />
                    <label htmlFor={`amenity-${amenity.id}`}>
                      {amenity.name}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="space32" />
            <button
              type="button"
              className="vl-btn1"
              style={{ width: "100%" }}
              onClick={handleClearFilters}
            >
              Reset Filter
              <span className="arrow1 ms-2">
                <i className="fa-solid fa-arrow-right" />
              </span>
              <span className="arrow2 ms-2">
                <i className="fa-solid fa-arrow-right" />
              </span>
            </button>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <Link
                href="/sidebar-grid"
                className="text-decoration-none text-primary"
              >
                Show all properties
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyFilter;
