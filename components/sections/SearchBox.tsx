"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/state/redux";
import { setFilters, FiltersState } from "@/state";
import { debounce } from "lodash";
import { cleanParams } from "@/lib/utils";

export default function SearchBox() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);

  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isHomepage = pathname === "/";

  // Property types from schema
  const propertyTypes = [
    { value: "any", label: "All Types" },
    { value: "HOUSE", label: "House" },
    { value: "APARTMENT", label: "Apartment" },
    { value: "FARMHOUSE", label: "Farmhouse" },
    { value: "LAND", label: "Land" },
    { value: "COMMERCIAL", label: "Commercial" },
  ];

  // Bed and bath options
  const bedOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ];

  const bathOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  // Update URL with debounce
  const updateURL = debounce((newFilters: FiltersState) => {
    const params = cleanParams({
      location:
        newFilters.location !== "Budapest" ? newFilters.location : undefined,
      beds: newFilters.beds !== "any" ? newFilters.beds : undefined,
      baths: newFilters.baths !== "any" ? newFilters.baths : undefined,
      propertyType:
        newFilters.propertyType !== "any" ? newFilters.propertyType : undefined,
      priceMin: newFilters.priceRange[0],
      priceMax: newFilters.priceRange[1],
      areaMin: newFilters.squareFeet[0],
      areaMax: newFilters.squareFeet[1],
    });

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);

    if (isHomepage) {
      alert("Search functionality is not implemented yet.");
      router.push("/search" + (queryString ? `?${queryString}` : ""));
    }
  }, 500);

  const handleInputChange = (field: keyof FiltersState, value: any) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters(localFilters));
    updateURL(localFilters);
  };

  const handleReset = () => {
    const resetFilters: FiltersState = {
      location: "Budapest",
      beds: "any",
      baths: "any",
      propertyType: "any",
      amenities: [],
      availableFrom: "any",
      priceRange: [null, null],
      squareFeet: [null, null],
      coordinates: [null, null],
    };
    setLocalFilters(resetFilters);
    dispatch(setFilters(resetFilters));
    router.push(pathname);
  };

  // Sync with Redux state changes
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Format price display
  const formatPrice = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <style jsx>{`
        .filter-group select,
        .filter-group input[type="text"],
        .filter-group input[type="number"] {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          background-color: #fff;
          font-size: 14px;
          color: #1b1b1b;
        }

        .filter-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231B1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }

        .filter-group input:hover,
        .filter-group select:hover {
          border-color: #d1d1d1;
        }

        .filter-group input:focus,
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

        .keyword-input {
          border-radius: 80px !important;
          padding: 0 20px !important;
          height: 52px !important;
        }

        .advance-button {
          background: #d9d9d9;
          border: 0;
          color: #1b1b1b;
          padding: 10px 28px;
          border-radius: 80px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 56px;
        }

        .advance-button:hover {
          background: var(--ztc-bg-bg-3) !important;
          color: white;
        }

        .advance-button.active {
          background: var(--ztc-bg-bg-3);
          color: white;
        }

        .advanced-filters {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-out;
          margin-top: 20px;
        }

        .advanced-filters.show {
          max-height: 800px;
          transition: max-height 0.5s ease-in;
        }

        .range-inputs {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 10px;
        }

        .range-separator {
          color: #888;
          font-size: 14px;
        }

        .reset-button {
          background: transparent;
          border: 1px solid #d9d9d9;
          color: #666;
          padding: 10px 20px;
          border-radius: 80px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-button:hover {
          background: #f5f5f5;
          border-color: #999;
        }

        .filter-section {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .filter-section h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }
      `}</style>

      <div className="others-section-area container-home1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-tab-section b-bg1">
                <form onSubmit={handleSubmit}>
                  <div className="tab-content1">
                    <div className="filters mb-2">
                      <h2 className="fw-bold">Find your dream property</h2>
                    </div>

                    {/* Basic Filters */}
                    <div className="filters z-1 position-relative">
                      <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
                        <div className="filter-group flex-grow-1">
                          <input
                            type="text"
                            className="keyword-input"
                            placeholder="Enter location (city, county, or address)..."
                            value={localFilters.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                          />
                        </div>

                        <div
                          className="filter-group"
                          style={{ minWidth: "150px" }}
                        >
                          <select
                            value={localFilters.propertyType}
                            onChange={(e) =>
                              handleInputChange("propertyType", e.target.value)
                            }
                          >
                            {propertyTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className="filter-group"
                          style={{ minWidth: "100px" }}
                        >
                          <select
                            value={localFilters.beds}
                            onChange={(e) =>
                              handleInputChange("beds", e.target.value)
                            }
                          >
                            {bedOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label} Beds
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className="filter-group"
                          style={{ minWidth: "100px" }}
                        >
                          <select
                            value={localFilters.baths}
                            onChange={(e) =>
                              handleInputChange("baths", e.target.value)
                            }
                          >
                            {bathOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label} Baths
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Filters */}
                    <div
                      className={`advanced-filters ${
                        showAdvanced ? "show" : ""
                      }`}
                    >
                      {/* Price Range */}
                      <div className="filter-section">
                        <h4>Price Range (HUF)</h4>
                        <div className="range-inputs">
                          <input
                            type="number"
                            placeholder="Min price"
                            value={localFilters.priceRange[0] || ""}
                            onChange={(e) => {
                              const value = e.target.value
                                ? parseInt(e.target.value)
                                : null;
                              handleInputChange("priceRange", [
                                value,
                                localFilters.priceRange[1],
                              ]);
                            }}
                          />
                          <span className="range-separator">—</span>
                          <input
                            type="number"
                            placeholder="Max price"
                            value={localFilters.priceRange[1] || ""}
                            onChange={(e) => {
                              const value = e.target.value
                                ? parseInt(e.target.value)
                                : null;
                              handleInputChange("priceRange", [
                                localFilters.priceRange[0],
                                value,
                              ]);
                            }}
                          />
                        </div>
                      </div>

                      {/* Living Area */}
                      <div className="filter-section">
                        <h4>Living Area (m²)</h4>
                        <div className="range-inputs">
                          <input
                            type="number"
                            placeholder="Min m²"
                            value={localFilters.squareFeet[0] || ""}
                            onChange={(e) => {
                              const value = e.target.value
                                ? parseInt(e.target.value)
                                : null;
                              handleInputChange("squareFeet", [
                                value,
                                localFilters.squareFeet[1],
                              ]);
                            }}
                          />
                          <span className="range-separator">—</span>
                          <input
                            type="number"
                            placeholder="Max m²"
                            value={localFilters.squareFeet[1] || ""}
                            onChange={(e) => {
                              const value = e.target.value
                                ? parseInt(e.target.value)
                                : null;
                              handleInputChange("squareFeet", [
                                localFilters.squareFeet[0],
                                value,
                              ]);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="filters pt-2">
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <div className="search-button d-flex align-items-center">
                            <button type="submit">
                              Search Property
                              <span className="arrow1 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                              <span className="arrow2 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </button>
                          </div>

                          <span
                            className={`d-flex align-items-center gap-2 advance-button ${
                              showAdvanced ? "active" : ""
                            }`}
                            onClick={() => setShowAdvanced(!showAdvanced)}
                          >
                            {showAdvanced ? "Hide Filters" : "More Filters"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width="20"
                              height="20"
                            >
                              <path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071Z" />
                            </svg>
                          </span>

                          {(localFilters.location !== "Budapest" ||
                            localFilters.propertyType !== "any" ||
                            localFilters.beds !== "any" ||
                            localFilters.baths !== "any" ||
                            localFilters.priceRange[0] !== null ||
                            localFilters.priceRange[1] !== null) && (
                            <button
                              type="button"
                              className="reset-button"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                          )}

                          <Link
                            href="/search"
                            className="text-decoration-none text-primary ms-2"
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space30"></div>
    </>
  );
}

// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import propertyData from "@/data/property.json";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "@/state/redux";
// import { initialState, setFilters } from "@/state";
// import { debounce } from "lodash";
// import { cleanParams } from "@/lib/utils";

// interface Property {
//   id: number;
//   keyword: string;
//   status: string;
//   type: string;
//   city: string;
//   state: string;
//   amenities: string[];
//   // ... other properties
// }

// type PropertyType = 'HOUSE' | 'FARMHOUSE' | 'HOLIDAY_HOME' | 'APARTMENT' | 'LAND';

// export default function SearchBox() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const pathname = usePathname();
//   const filters = useAppSelector((state) => state.global.filters);
//   const [localFilters, setLocalFilters] = useState(initialState.filters);

//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//   const [showAdvanced, setShowAdvanced] = useState(false);

//     const propertyTypes = [
//     { value: 'HOUSE', label: 'House' },
//     { value: 'APARTMENT', label: 'Apartment' },
//     { value: 'FARMHOUSE', label: 'Farmhouse' },
//     { value: 'HOLIDAY_HOME', label: 'Holiday Home' },
//     { value: 'LAND', label: 'Land' }
//   ];

//   // new
//   const updateURL = debounce((newFilters: any) => {
//     const cleanFilters = cleanParams(newFilters);
//     const updatedSearchParams = new URLSearchParams();

//     Object.entries(cleanFilters).forEach(([key, value]) => {
//       updatedSearchParams.set(
//         key,
//         Array.isArray(value) ? value.join(",") : value.toString()
//       );
//     });

//     router.push(`${pathname}?${updatedSearchParams.toString()}`);
//   });

//   const handleSubmit = () => {
//     dispatch(setFilters(localFilters));
//     updateURL(localFilters);
//   };

//   const handleReset = () => {
//     setLocalFilters(initialState.filters);
//     dispatch(setFilters(initialState.filters));
//     updateURL(initialState.filters);
//   };

//    const handleInputChange = (field: string, value: any) => {
//     const newFilters = { ...localFilters, [field]: value };
//     setLocalFilters(newFilters);
//     setFilters(newFilters);
//   };

//   useEffect(() => {
//     console.log(localFilters);
//   }, [localFilters]);

//   // Handle form submission
//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // alert("Search functionality is not implemented yet.");
//     // const newFilters = { ...localFilters, propertyType: "HOUSE" };

//     dispatch(setFilters(localFilters));
//     updateURL(localFilters);
//     // const form = e.currentTarget;
//     // const formData = new FormData(form);

//     // // Get search criteria
//     // const searchCriteria = {
//     //   keyword: formData.get("keyword") as string,
//     //   status: formData.get("status") as string,
//     //   propertyType: formData.get("propertyType") as string,
//     //   city: formData.get("city") as string,
//     //   state: formData.get("state") as string,
//     //   amenities: selectedAmenities,
//     // };

//     // // Build query string
//     // const params = new URLSearchParams();

//     // // Add non-empty parameters to URL
//     // Object.entries(searchCriteria).forEach(([key, value]) => {
//     //   if (Array.isArray(value)) {
//     //     // Handle array values (amenities)
//     //     value.forEach((item) => {
//     //       if (item) params.append(key, item);
//     //     });
//     //   } else {
//     //     // Handle single values
//     //     if (value) params.append(key, value);
//     //   }
//     // });

//     // Navigate to search results page with query parameters
//     // router.push(`/search-results?${params.toString()}`);
//   };

//   return (
//     <>
//       <style jsx>{`
//         .filter-group select {
//           width: 100%;
//           height: 48px;
//           padding: 0 16px;
//           border: 1px solid #e7e7e7;
//           border-radius: 8px;
//           background-color: #fff;
//           font-size: 14px;
//           color: #1b1b1b;
//           cursor: pointer;
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231B1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 16px center;
//         }

//         .filter-group select:hover {
//           border-color: #d1d1d1;
//         }

//         .filter-group select:focus {
//           outline: none;
//           border-color: #1b1b1b;
//         }

//         .filter-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #1b1b1b;
//         }

//         .filter-group {
//           margin-bottom: 16px;
//         }

//         .filter-group select option {
//           padding: 8px 16px;
//           font-size: 14px;
//         }

//         .filter-group select option:checked {
//           background-color: #f5f5f5;
//         }

//         .filter-group input {
//           width: 100%;
//           min-width: 248px;
//         }

//         .amenities-container {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//           max-height: 200px;
//           overflow-y: auto;
//           padding: 10px;
//           border: 1px solid #e7e7e7;
//           border-radius: 8px;
//           background-color: #fff;
//         }

//         .amenity-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//         }

//         .amenity-item:hover {
//           background-color: #f5f5f5;
//           border-radius: 4px;
//         }

//         .amenity-item input[type="checkbox"] {
//           width: 16px;
//           height: 16px;
//           cursor: pointer;
//           appearance: none;
//           -webkit-appearance: none;
//           border: 2px solid #aaa;
//           border-radius: 4px;
//           position: relative;
//           outline: none;
//           transition: all 0.2s ease;
//         }

//         .amenity-item input[type="checkbox"]:checked {
//           background-color: var(--ztc-bg-bg-3);
//           border-color: var(--ztc-bg-bg-3);
//         }

//         .amenity-item input[type="checkbox"]:checked::after {
//           content: "";
//           position: absolute;
//           left: 4px;
//           top: 1px;
//           width: 5px;
//           height: 9px;
//           border: solid white;
//           border-width: 0 2px 2px 0;
//           transform: rotate(45deg);
//         }

//         .amenity-item input[type="checkbox"]:hover {
//           border-color: var(--ztc-bg-bg-3);
//         }

//         .amenity-item label {
//           margin: 0;
//           cursor: pointer;
//           font-weight: normal;
//           font-size: 14px;
//         }

//         .filter-group input[type="text"] {
//           width: 100%;
//           height: 52px;
//           padding: 0 16px;
//           border-radius: 80px;
//           background-color: #fff;
//           font-size: 14px;
//           color: #1b1b1b;
//           transition: all 0.3s ease;
//         }

//         .filter-group input[type="text"]::placeholder {
//           color: #888;
//           font-size: 14px;
//         }

//         .filter-group input[type="text"]:hover {
//           border-color: #d1d1d1;
//         }

//         .filter-group input[type="text"]:focus {
//           outline: none;
//           border-color: var(--ztc-bg-bg-3);
//           box-shadow: 0 0 0 1px var(--ztc-bg-bg-3);
//         }

//         .advance-button {
//           background: #d9d9d9;
//           border: 0;
//           color: #1b1b1b;
//           padding: 10px 28px;
//           border-radius: 80px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           height: 56px;
//           font-size: var(--ztc-font-size-font-s14);
//           font-style: normal;
//           font-weight: var(--ztc-weight-bold);
//         }

//         .advance-button:hover {
//           background: var(--ztc-bg-bg-3) !important;
//           color: white;
//         }

//         .advance-button.active {
//           background: var(--ztc-bg-bg-3);
//           color: white;
//         }

//         .amenities-section {
//           max-height: 0;
//           overflow: hidden;
//           transition: max-height 0.3s ease-out;
//         }

//         .amenities-section.show {
//           max-height: 500px;
//           transition: max-height 0.5s ease-in;
//         }
//       `}</style>
//       <div className="others-section-area container-home1">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="property-tab-section b-bg1">
//                 <form onSubmit={handleSearch}>
//                   <div className="tab-content1">
//                     <div className="filters mb-2">
//                       <h2 className="fw-bold">Find your dream property</h2>
//                     </div>
//                     <div className="filters z-1 position-relative">
//                       <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
//                         <div className="filter-group">
//                           {/* <label>Keyword</label> */}
//                           <input
//                             type="text"
//                             name="keyword"
//                             placeholder="Keyword"
//                           />
//                         </div>

//                        <div className="filter-group" style={{ minWidth: '180px' }}>
//                           <select
//                             value={localFilters.propertyType || ''}
//                             onChange={(e) => handleInputChange('propertyType', e.target.value || undefined)}
//                           >
//                             <option value="">All Property Types</option>
//                             {propertyTypes.map(type => (
//                               <option key={type.value} value={type.value}>
//                                 {type.label}
//                               </option>
//                             ))}
//                           </select>
//                         </div>

//                         <div className="filter-group">
//                           {/* <label>Status</label> */}
//                           <select name="status" defaultValue="">
//                             <option value="">All Status</option>
//                             <option value="sale">For Sale</option>
//                             <option value="rent">For Rent</option>
//                           </select>
//                         </div>

//                         {/* <div className="filter-group">
//                           <label>Types</label>
//                           <select name="propertyType">
//                             <option value="">All Types</option>
//                             {propertyTypes.map((type, index) => (
//                               <option key={index} value={type}>
//                                 {type}
//                               </option>
//                             ))}
//                           </select>
//                         </div> */}

//                         {/* <div className="filter-group">
//                           <label>City</label>
//                           <select name="city">
//                             <option value="">All Cities</option>
//                             {cities.map((city, index) => (
//                               <option key={index} value={city}>
//                                 {city}
//                               </option>
//                             ))}
//                           </select>
//                         </div> */}

//                         {/* <div className="filter-group">
//                           <label>State</label>
//                           <select name="state">
//                             <option value="">All States</option>
//                             {states.map((state, index) => (
//                               <option key={index} value={state}>
//                                 {state}
//                               </option>
//                             ))}
//                           </select>
//                         </div> */}
//                       </div>
//                     </div>

//                     {/* <div className={`amenities-section ${showAdvanced ? 'show' : ''}`}>
//                                             <div className="filters mb-4">
//                                                 <label>Amenities</label>
//                                                 <div className="d-flex flex-wrap gap-2">
//                                                     {amenities.map((amenity, index) => (
//                                                         <div key={index} className="amenity-item">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 id={`amenity-${index}`}
//                                                                 checked={selectedAmenities.includes(amenity)}
//                                                                 onChange={() => handleAmenityChange(amenity)}
//                                                             />
//                                                             <label htmlFor={`amenity-${index}`}>
//                                                                 {amenity}
//                                                             </label>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div> */}

//                     <div className="filters pt-2">
//                       <div className="d-flex justify-content-between w-100">
//                         <div className="d-flex flex-wrap gap-2 align-items-center">
//                           <div className="search-button d-flex align-items-center">
//                             <button type="submit">
//                               Search Property
//                               <span className="arrow1 ms-2">
//                                 <i className="fa-solid fa-arrow-right" />
//                               </span>
//                               <span className="arrow2 ms-2">
//                                 <i className="fa-solid fa-arrow-right" />
//                               </span>
//                             </button>
//                           </div>
//                           {/* <span
//                                                         className={`d-flex align-items-center gap-2 advance-button ${showAdvanced ? 'active' : ''}`}
//                                                         onClick={() => setShowAdvanced(!showAdvanced)}
//                                                     >
//                                                         {showAdvanced ? 'Hide Advance' : 'Show Advance'}
//                                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
//                                                             <path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071Z" />
//                                                         </svg>
//                                                     </span> */}
//                           <Link
//                             href="/sidebar-grid"
//                             className="text-decoration-none text-primary ms-2"
//                           >
//                             Show all properties
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="space30"></div>
//     </>
//   );
// }
