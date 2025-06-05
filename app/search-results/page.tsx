"use client";
import InnerHeader from "@/components/layout/InnerHeader";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { addPerPage, addSort } from "@/features/filter/filterSlice";
import { toggleFavoriteProperty } from "@/features/property/propertySlice";
import type { RootState } from "@/features/store";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from 'next/navigation';
import propertyData from "@/data/property.json";
import { usePropertyList } from "@/components/hooks/usePropertyList";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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

export default function SearchResults() {
    const dispatch = useDispatch();
    const { properties, favoriteProperties } = useSelector((state: RootState) => state.property);
    const { propertyFilter } = useSelector((state: RootState) => state.filter);
    const searchParams = useSearchParams();
    const filterObject = {
        propertyType: searchParams.get('propertyType') || '',
        city: searchParams.get('city') || '',
        state: searchParams.get('state') || '',
        status: searchParams.get('status') || '',
        keyword: searchParams.get('keyword') || '',
        amenities: searchParams.getAll('amenities') || [],
    };

    const {
        state: {
            filteredProperties,
            currentPage,
            itemsPerPage,
            sortOrder,
            viewMode
        },
        actions: {
            setCurrentPage,
            setItemsPerPage,
            setSortOrder,
            setViewMode
        },
        paginatedProperties,
        totalPages
    } = usePropertyList(propertyData, filterObject, "grid", 12);

    // Replace DOM manipulation with React refs
    const gridTabRef = useRef<HTMLButtonElement>(null);
    const listTabRef = useRef<HTMLButtonElement>(null);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(pageNumber * itemsPerPage, filteredProperties.length);
        dispatch(addPerPage({ start: startIndex, end: endIndex }));
    };

    const handleFavoriteToggle = (e: React.MouseEvent, propertyId: number) => {
        e.preventDefault();
        dispatch(toggleFavoriteProperty(propertyId));
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number.parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
        setCurrentPage(1);
        dispatch(addSort(e.target.value));
    };

    const handleViewModeChange = useCallback((mode: string) => {
        setViewMode(mode);
    }, []);

    useEffect(() => {
        const handleGridClick = () => handleViewModeChange("grid");
        const handleListClick = () => handleViewModeChange("list");

        const gridTab = gridTabRef.current;
        const listTab = listTabRef.current;

        if (gridTab && listTab) {
            gridTab.addEventListener("click", handleGridClick);
            listTab.addEventListener("click", handleListClick);

            return () => {
                gridTab.removeEventListener("click", handleGridClick);
                listTab.removeEventListener("click", handleListClick);
            };
        }
    }, [handleViewModeChange]);

    const swiperOptions = {
        modules: [Autoplay, Pagination],
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    };

    // Function to render property images
    const renderPropertyImages = (property: PropertyListItem) => {
        if (typeof window === 'undefined') return null;

        return (
            <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                <SwiperSlide>
                    <Link href={`/property-details/${property.id}`}>
                        <div className="img1 image-anime">
                            <img src={property.images?.img1 || "/assets/img/all-images/properties/property-img1.png"} alt={property.keyword} />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`/property-details/${property.id}`}>
                        <div className="img1 image-anime">
                            <img src={property.images?.img2 || "/assets/img/all-images/properties/property-img2.png"} alt={property.keyword} />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`/property-details/${property.id}`}>
                        <div className="img1 image-anime">
                            <img src={property.images?.img3 || "/assets/img/all-images/properties/property-img3.png"} alt={property.keyword} />
                        </div>
                    </Link>
                </SwiperSlide>
                <div className="swiper-pagination" />
            </Swiper>
        );
    };

    // Function to render pagination
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="pagination-area">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
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
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                                pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                                pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNumber = totalPages - 4 + i;
                            } else {
                                pageNumber = currentPage - 2 + i;
                            }
                            return (
                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                                    <Link
                                        className="page-link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(pageNumber);
                                        }}
                                    >
                                        {pageNumber}
                                    </Link>
                                </li>
                            );
                        })}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <li className="page-item">
                                <Link className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                                    ....
                                </Link>
                            </li>
                        )}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <li className="page-item">
                                <Link
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(totalPages);
                                    }}
                                >
                                    {totalPages}
                                </Link>
                            </li>
                        )}
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

    // Function to render a grid item
    const renderGridItem = (property: PropertyListItem) => (
        <div className="property-single-boxarea">
            <div className="property-list-img-area">
                {renderPropertyImages(property)}
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
                            {property.bathrooms}Beds
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
                            {property.bedrooms} Baths
                        </div>
                    </li>
                </ul>
                <div className="space24" />
                <div className="btn-area">
                    <div className="name-area">
                        <div className="img">
                            <img src={property.agent?.image || "/assets/img/all-images/agents/agent-1.png"} alt={property.agent?.name || "Agent"} />
                        </div>
                        <div className="text">
                            <Link href="#">{property.agent?.name || "Unknown Agent"}</Link>
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
    );

    return (
        <Layout>
            <InnerHeader title="Search Results" currentpage="Search Results" />
            <div className="property-inner-section-find">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="property-mapgrid-area">
                                <div className="heading1 mb-3">
                                    <h3>Properties ({filteredProperties.length})</h3>
                                    <div className="tabs-btn">
                                        <div className="d-flex">
                                            <div className="filter-group me-3">
                                                <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                                                    <option value="6">Show:(6)</option>
                                                    <option value="12">Show:(12)</option>
                                                    <option value="24">Show:(24)</option>
                                                </select>
                                            </div>
                                            <div className="filter-group">
                                                <select onChange={handleSortOrderChange} value={sortOrder}>
                                                    <option value="default">Sort by (Default)</option>
                                                    <option value="oldest">Oldest</option>
                                                    <option value="newest">Newest</option>
                                                    <option value="price-low">Price (Low to High)</option>
                                                    <option value="price-high">Price (High to Low)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space32" />
                                <div className="row">
                                    {paginatedProperties.length > 0 ? (
                                        paginatedProperties.map((property) => (
                                            <div key={property.id} className="col-lg-4 col-md-6 mb-4">
                                                {renderGridItem(property)}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-5">
                                            <h4>No properties found matching your criteria</h4>
                                            <p>Try adjusting your filters to see more results</p>
                                        </div>
                                    )}
                                </div>
                                {totalPages > 1 && (
                                    <div className="pagination-area mt-4 mb-4">
                                        <nav className="Page navigation example">
                                            <ul className="pagination justify-content-center">
                                                {Array.from({ length: totalPages }, (_, i) => (
                                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                        <a className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                            {i + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
