"use client";
import { useGetPropertiesQuery } from '@/state/api';
import React, { useState } from 'react'
import ListingCard from './ListingCard';
import { useAppSelector } from '@/state/redux';

const ListingList = () => {
    const filters = useAppSelector((state) => state.global.filters);
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useGetPropertiesQuery({...filters, page: currentPage, limit: 12});

    const properties = data?.data || [];
    const pagination = data?.pagination;

    console.log(data);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Scroll to top of property list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
        <div className="property-mapgrid-area">
            <div className="heading1">
                <h3>
                Properties({pagination?.totalItems || 0})
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

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        {properties?.map((property)=>(
                            <ListingCard key={property.id} basic={property.basic} media={property.media} seller={property.seller} propertyId={property.id}/>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="pagination-area" style={{ marginTop: '20px' }}>
                            <ul className="d-flex align-items-center justify-content-center">
                                {/* Previous Button */}
                                <li style={{ pointerEvents: !pagination.hasPreviousPage ? 'none' : 'auto' }}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            pagination.hasPreviousPage && handlePageChange(currentPage - 1);
                                        }}
                                        style={{ opacity: !pagination.hasPreviousPage ? 0.5 : 1 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                                        </svg>
                                    </a>
                                </li>

                                {/* Page Numbers */}
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                                    // Show first page, last page, current page, and pages around current
                                    const showPage =
                                        page === 1 ||
                                        page === pagination.totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1);

                                    if (!showPage && page === 2 && currentPage > 3) {
                                        return (
                                            <li key={page}>
                                                <a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>...</a>
                                            </li>
                                        );
                                    }
                                    if (!showPage && page === pagination.totalPages - 1 && currentPage < pagination.totalPages - 2) {
                                        return (
                                            <li key={page}>
                                                <a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>...</a>
                                            </li>
                                        );
                                    }
                                    if (!showPage) return null;

                                    return (
                                        <li key={page}>
                                            <a
                                                href="#"
                                                className={page === currentPage ? 'active' : ''}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(page);
                                                }}
                                            >
                                                {page}
                                            </a>
                                        </li>
                                    );
                                })}

                                {/* Next Button */}
                                <li style={{ pointerEvents: !pagination.hasNextPage ? 'none' : 'auto' }}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            pagination.hasNextPage && handlePageChange(currentPage + 1);
                                        }}
                                        style={{ opacity: !pagination.hasNextPage ? 0.5 : 1 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    </>
  )
}

export default ListingList
