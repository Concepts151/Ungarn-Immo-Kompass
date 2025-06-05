"use client";
import InnerHeader from "@/components/layout/InnerHeader";
import PropertyFilter from "@/components/elements/property-filter";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { addSort } from "@/features/filter/filterSlice";
import { toggleFavoriteProperty } from "@/features/property/propertySlice";
import type { RootState } from "@/features/store";
import type React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import dynamic from 'next/dynamic';
import { usePropertyList } from "@/components/hooks/usePropertyList";

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

// Create dynamic import for Swiper component
const DynamicSwiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
    ssr: false
});
const DynamicSwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), {
    ssr: false
});

export default function SidebarGrid() {
    const dispatch = useDispatch();
    const { properties, favoriteProperties } = useSelector((state: RootState) => state.property);
    const { propertyFilter } = useSelector((state: RootState) => state.filter);

    // Map properties to PropertyListItem[]
    const propertyListItems = properties.map((p: any) => ({
        id: p.id,
        keyword: p.keyword,
        images: p.images,
        address: p.address,
        city: p.city,
        state: p.state,
        status: p.status,
        label: p.label,
        type: p.type,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        garages: p.garages,
        rooms: p.rooms,
        minPrice: p.minPrice,
        maxPrice: p.maxPrice,
        minSize: p.minSize,
        maxSize: p.maxSize,
        amenities: p.amenities,
        agent: p.agent,
    }));

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
    } = usePropertyList(propertyListItems, propertyFilter, "grid", 12);

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
        if (typeof window === 'undefined') return null; // Early return on server-side

        if (property.images && Object.keys(property.images).length > 0) {
            return (
                <DynamicSwiper {...swiperFade} className="swiper swiper-fade">
                    <div className="swiper-wrapper">
                        {Object.values(property.images).map((image, index) => (
                            <DynamicSwiperSlide key={index}>
                                <img src={image || "/assets/img/all-images/properties/property-img1.png"} alt={property.keyword} />
                            </DynamicSwiperSlide>
                        ))}
                    </div>
                    <div className="swiper-pagination" />
                </DynamicSwiper>
            );
        }
        return null;
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
                                    setCurrentPage(Math.max(1, currentPage - 1));
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
                                            setCurrentPage(pageNumber);
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
                                        setCurrentPage(totalPages);
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
                                    setCurrentPage(Math.min(totalPages, currentPage + 1));
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
                            <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                        </div>
                        <div className="text">
                            <Link href="#">Santiago Towne</Link>
                        </div>
                    </div>
                    <div className="love-share">
                        <Link href="#" className="heart" onClick={(e) => handleFavoriteToggle(e, property.id)}>
                            <img src={favoriteProperties.includes(property.id) ? "/assets/img/icons/heart2.svg" : "/assets/img/icons/heart1.svg"} alt="favorite" className={favoriteProperties.includes(property.id) ? "heart2" : "heart1"} />
                        </Link>
                        <Link href="#" className="share">
                            <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                <path
                                    d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                    fill="#ED8438"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    // Function to render a list item
    const renderListItem = (property: PropertyListItem) => (
        <div className="property-single-boxarea">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 position-relative">
                    <div className="property-list-img-area">
                        <div className="img1 image-anime">{renderPropertyImages(property)}</div>
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
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
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
                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="#">Santiago Towne</Link>
                                </div>
                            </div>
                            <div className="love-share">
                                <Link href="#" className="heart" onClick={(e) => handleFavoriteToggle(e, property.id)}>
                                    <img src={favoriteProperties.includes(property.id) ? "/assets/img/icons/heart2.svg" : "/assets/img/icons/heart1.svg"} alt="favorite" className={favoriteProperties.includes(property.id) ? "heart2" : "heart1"} />
                                </Link>
                                <Link href="#" className="share">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                        <path
                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                            fill="#ED8438"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <>
            <Layout>
                <InnerHeader title="Find Sidebar Grid" currentpage="Find Sidebar Grid" />
                <>
                    <div className="space30" />
                    {/*===== PROPERTY AREA STARTS =======*/}
                    <div className="property-inner-section-find">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="property-mapgrid-area">
                                        <div className="heading1 mb-3">
                                            <h3>Properties ({filteredProperties.length})</h3>
                                            <div className="tabs-btn">
                                                <ul className="nav nav-pills d-none d-lg-block" id="pills-tab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className={`nav-link ${viewMode === 'grid' ? 'active' : ''}`}
                                                            id="pills-home-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-home"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-home"
                                                            aria-selected={viewMode === 'grid'}
                                                            onClick={() => setViewMode('grid')}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M22 12.999V20C22 20.5523 21.5523 21 21 21H13V12.999H22ZM11 12.999V21H3C2.44772 21 2 20.5523 2 20V12.999H11ZM11 3V10.999H2V4C2 3.44772 2.44772 3 3 3H11ZM21 3C21.5523 3 22 3.44772 22 4V10.999H13V3H21Z" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className={`nav-link ${viewMode === 'list' ? 'active' : ''}`}
                                                            id="pills-profile-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-profile"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-profile"
                                                            aria-selected={viewMode === 'list'}
                                                            onClick={() => setViewMode('list')}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                </ul>
                                                <div className="d-flex">
                                                    <div className="filter-group me-3">
                                                        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                                                            <option value="6">Show:(6)</option>
                                                            <option value="12">Show:(12)</option>
                                                            <option value="24">Show:(24)</option>
                                                            <option value="48">Show:(48)</option>
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
                                            <div className="col-lg-3">
                                                <PropertyFilter />
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="tab-content">
                                                    <div className={`tab-pane fade ${viewMode === 'grid' ? 'show active' : ''}`}>
                                                        <div className="row g-4">
                                                            {paginatedProperties.map((property) => (
                                                                <div key={property.id} className="col-lg-6 col-md-6">
                                                                    {renderGridItem(property)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className={`tab-pane fade ${viewMode === 'list' ? 'show active' : ''}`}>
                                                        <div className="row g-4">
                                                            {paginatedProperties.map((property) => (
                                                                <div key={property.id} className="col-12">
                                                                    {renderListItem(property)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space32" />
                                                {renderPagination()}
                                            </div>
                                        </div>
                                        <div className="space30"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===== PROPERTY AREA ENDS =======*/}
                </>
            </Layout>
        </>
    );
}
