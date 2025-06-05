"use client";

import { addPerPage, addSort } from "@/features/filter/filterSlice";
import { toggleFavoriteProperty } from "@/features/property/propertySlice";
import type { RootState } from "@/features/store";
import Link from "next/link";
import type React from "react";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Updated interface to match the JSON structure
interface PropertyListItem {
    id: number;
    keyword: string;
    images?: {
        [key: string]: string;
    };
    address: string;
    city: string;
    state: string;
    status: string;
    label: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    amenities: string[];
    agent?: {
        name: string;
        image: string;
    };
}

// Define action types
type PropertyListAction =
    | { type: 'SET_FILTERED_PROPERTIES'; payload: PropertyListItem[] }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
    | { type: 'SET_SORT_ORDER'; payload: string }
    | { type: 'SET_VIEW_MODE'; payload: string }
    | { type: 'RESET_STATE' };

// Define state interface
interface PropertyListState {
    filteredProperties: PropertyListItem[];
    currentPage: number;
    itemsPerPage: number;
    sortOrder: string;
    viewMode: string;
}

// Initial state
const initialState: PropertyListState = {
    filteredProperties: [],
    currentPage: 1,
    itemsPerPage: 6,
    sortOrder: "default",
    viewMode: "grid"
};

// Reducer function
function propertyListReducer(state: PropertyListState, action: PropertyListAction): PropertyListState {
    switch (action.type) {
        case 'SET_FILTERED_PROPERTIES':
            return { ...state, filteredProperties: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_ITEMS_PER_PAGE':
            return { ...state, itemsPerPage: action.payload };
        case 'SET_SORT_ORDER':
            return { ...state, sortOrder: action.payload };
        case 'SET_VIEW_MODE':
            return { ...state, viewMode: action.payload };
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

export default function PropertyList3() {
    const dispatch = useDispatch();
    const { properties, favoriteProperties } = useSelector((state: RootState) => state.property);
    const { propertyFilter } = useSelector((state: RootState) => state.filter);

    const [state, dispatchState] = useReducer(propertyListReducer, initialState);
    const { filteredProperties, currentPage, itemsPerPage, sortOrder, viewMode } = state;

    useEffect(() => {
        let result = [...properties] as PropertyListItem[];

        // Keyword search
        if (propertyFilter.keyword) {
            const keyword = propertyFilter.keyword.toLowerCase();
            result = result.filter((property) =>
                property.keyword.toLowerCase().includes(keyword) ||
                property.address.toLowerCase().includes(keyword) ||
                property.city.toLowerCase().includes(keyword) ||
                property.state.toLowerCase().includes(keyword)
            );
        }

        // Status filter
        if (propertyFilter.status && propertyFilter.status !== "") {
            result = result.filter((property) => {
                const propertyStatus = property.status.toLowerCase().trim();
                const filterStatus = propertyFilter.status.toLowerCase().trim();
                const normalizedPropertyStatus = propertyStatus === "sale" ? "sale" :
                    propertyStatus === "rent" ? "rent" : propertyStatus;
                return normalizedPropertyStatus === filterStatus;
            });
        }

        // Property Type filter
        if (propertyFilter.propertyType && propertyFilter.propertyType !== "") {
            result = result.filter((property) => {
                const propertyType = property.type.toLowerCase().trim();
                const filterType = propertyFilter.propertyType.toLowerCase().trim();
                return propertyType === filterType;
            });
        }

        // State filter
        if (propertyFilter.state && propertyFilter.state !== "") {
            result = result.filter((property) => {
                const propertyState = property.state.toLowerCase().trim();
                const filterState = propertyFilter.state.toLowerCase().trim();
                return propertyState === filterState;
            });
        }

        // City filter
        if (propertyFilter.city && propertyFilter.city !== "") {
            result = result.filter((property) => {
                const propertyCity = property.city
                    .toLowerCase()
                    .replace(/-/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                const filterCity = propertyFilter.city
                    .toLowerCase()
                    .replace(/-/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                return propertyCity === filterCity;
            });
        }

        // Bedrooms filter
        if (propertyFilter.bedrooms && propertyFilter.bedrooms.min > 0) {
            result = result.filter((property) => property.bedrooms >= propertyFilter.bedrooms.min);
        }

        // Bathrooms filter
        if (propertyFilter.bathrooms && propertyFilter.bathrooms.min > 0) {
            result = result.filter((property) => property.bathrooms >= propertyFilter.bathrooms.min);
        }

        // Garages filter
        if (propertyFilter.garages && propertyFilter.garages.min > 0) {
            result = result.filter((property) => property.garages >= propertyFilter.garages.min);
        }

        // Rooms filter
        if (propertyFilter.rooms && propertyFilter.rooms.min > 0) {
            result = result.filter((property) => property.rooms >= propertyFilter.rooms.min);
        }

        // Price range filter
        if (propertyFilter.price) {
            result = result.filter((property) =>
                property.minPrice >= propertyFilter.price.min &&
                property.maxPrice <= propertyFilter.price.max
            );
        }

        // Size range filter
        if (propertyFilter.size) {
            result = result.filter((property) =>
                property.minSize >= propertyFilter.size.min &&
                property.maxSize <= propertyFilter.size.max
            );
        }

        // Amenities filter
        if (propertyFilter.amenities && propertyFilter.amenities.length > 0) {
            result = result.filter((property) => {
                if (!property.amenities || !Array.isArray(property.amenities)) {
                    return false;
                }

                const normalizedPropertyAmenities = property.amenities.map(amenity =>
                    amenity.toLowerCase().trim()
                );

                const normalizedFilterAmenities = propertyFilter.amenities.map(amenity =>
                    amenity.toLowerCase().trim()
                );

                return normalizedFilterAmenities.every(filterAmenity =>
                    normalizedPropertyAmenities.includes(filterAmenity)
                );
            });
        }

        // Sort order
        if (sortOrder === "oldest") {
            result.sort((a, b) => a.id - b.id);
        } else if (sortOrder === "newest") {
            result.sort((a, b) => b.id - a.id);
        } else if (sortOrder === "price-low") {
            result.sort((a, b) => a.minPrice - b.minPrice);
        } else if (sortOrder === "price-high") {
            result.sort((a, b) => b.minPrice - a.minPrice);
        }

        dispatchState({ type: 'SET_FILTERED_PROPERTIES', payload: result });
        dispatchState({ type: 'SET_CURRENT_PAGE', payload: 1 });

        const startIndex = 0;
        const endIndex = Math.min(itemsPerPage, result.length);
        dispatch(addPerPage({ start: startIndex, end: endIndex }));
    }, [properties, propertyFilter, sortOrder, itemsPerPage, dispatch]);

    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        dispatchState({ type: 'SET_CURRENT_PAGE', payload: pageNumber });
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(pageNumber * itemsPerPage, filteredProperties.length);
        dispatch(addPerPage({ start: startIndex, end: endIndex }));
    };

    const handleFavoriteToggle = (e: React.MouseEvent, propertyId: number) => {
        e.preventDefault();
        dispatch(toggleFavoriteProperty(propertyId));
    };

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatchState({ type: 'SET_SORT_ORDER', payload: e.target.value });
        dispatchState({ type: 'SET_CURRENT_PAGE', payload: 1 });
        dispatch(addSort(e.target.value));
    };

    const handleViewModeChange = (mode: string) => {
        dispatchState({ type: 'SET_VIEW_MODE', payload: mode });
    };

    // Initialize tab functionality
    useEffect(() => {
        // Set up tab functionality
        const gridTab = document.getElementById("pills-home-tab");
        const listTab = document.getElementById("pills-profile-tab");

        if (gridTab && listTab) {
            gridTab.addEventListener("click", () => handleViewModeChange("grid"));
            listTab.addEventListener("click", () => handleViewModeChange("list"));
        }

        return () => {
            if (gridTab && listTab) {
                gridTab.removeEventListener("click", () => handleViewModeChange("grid"));
                listTab.removeEventListener("click", () => handleViewModeChange("list"));
            }
        };
    }, []); // Removed handleViewModeChange from dependencies

    const swiperFade = {
        modules: [Autoplay, Pagination, Navigation],
        spaceBetween: 0,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 2500,
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

    // Function to render property images
    const renderPropertyImages = (property: PropertyListItem) => {
        if (property.images && Object.keys(property.images).length > 0) {
            return (
                <Swiper {...swiperFade} className="swiper swiper-fade">
                    <div className="swiper-wrapper">
                        {Object.values(property.images).map((image, index) => (
                            <SwiperSlide key={index}>
                                <Link href="/property-details-v1">
                                    <img src={image || "/assets/img/all-images/properties/property-img1.png"} alt={property.keyword} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </div>
                    <div className="swiper-pagination" />
                </Swiper>
            );
        } else {
            return <img src="/assets/img/all-images/properties/property-img1.png" alt={property.keyword} />;
        }
    };

    // Function to render pagination
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="pagination-area mt-4">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <Link
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(Math.max(1, currentPage - 1));
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                                </svg>
                            </Link>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                <Link
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(page);
                                    }}
                                >
                                    {page}
                                </Link>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <Link
                                className="page-link"
                                href="#"
                                aria-label="Next"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(Math.min(totalPages, currentPage + 1));
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

    return (
        <>
            <div className="property-mapgrid-area">
                <div className="heading1">
                    <h3>Properties ({filteredProperties.length})</h3>
                    <div className="tabs-btn">
                        <div className="filter-group">
                            <select value={sortOrder} onChange={handleSortOrderChange}>
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
                <div className="tab-content" id="pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    // tabIndex={0}
                    >
                        <div className="row">
                            <div className="col-lg-12">
                                {currentProperties.length > 0 ? (
                                    currentProperties.map((property) => (
                                        <div key={property.id} className="col-12">
                                            <div className="property-single-boxarea">
                                                <div className="property-list-img-area">
                                                    <div className="img1">{renderPropertyImages(property)}</div>
                                                </div>
                                                <div className="space20"></div>
                                                <div className="rent-sale-area">
                                                    <ul>
                                                        <li>
                                                            <Link href={`/property-details/${property.id}`}>{property.type}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/property-details/${property.id}`}>{property.status}</Link>
                                                        </li>
                                                    </ul>
                                                    <Link href="#" className="camera">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                            <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                        </svg>
                                                        3
                                                    </Link>
                                                </div>
                                                <div className="property-price">
                                                    <div className="text">
                                                        <Link href={`/property-details/${property.id}`}>{property.keyword}</Link>
                                                        <div className="space16" />
                                                        <p>
                                                            {property.address}, {property.city}, {property.state}
                                                        </p>
                                                    </div>
                                                    <Link href="#" className="price">
                                                        ${property.minPrice.toLocaleString()}
                                                        {property.status === "For Rent"}
                                                    </Link>
                                                </div>
                                                <div className="space20" />
                                                <div className="property-other-widget">
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                {property.minSize}-{property.maxSize}sqft
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                {property.bedrooms} Beds
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                {property.bathrooms} Baths
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="space24" />
                                                    <div className="btn-area">
                                                        <div className="name-area">
                                                            <div className="img">
                                                                <img src={property.agent?.image || "/assets/img/all-images/others/others-img1.png"} alt={property.agent?.name || "Agent"} />
                                                            </div>
                                                            <div className="text">
                                                                <Link href="#">{property.agent?.name || "Agent Name"}</Link>
                                                            </div>
                                                        </div>
                                                        <div className="love-share">
                                                            <Link href="#" className="heart" onClick={(e) => handleFavoriteToggle(e, property.id)}>
                                                                <img src={favoriteProperties.includes(property.id) ? "/assets/img/icons/heart2.svg" : "/assets/img/icons/heart1.svg"} alt="favorite" className={favoriteProperties.includes(property.id) ? "heart2" : "heart1"} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-properties">
                                        <h4>No properties found matching your criteria</h4>
                                        <p>Try adjusting your filters to see more results</p>
                                    </div>
                                )}
                                {renderPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
