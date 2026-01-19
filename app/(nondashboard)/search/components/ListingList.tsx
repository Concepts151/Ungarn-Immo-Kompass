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
                            <ul style={{ marginTop: '0' }}>
                                {/* Previous Button */}
                                <li>
                                    <a
                                        onClick={() => pagination.hasPreviousPage && handlePageChange(currentPage - 1)}
                                        style={{
                                            cursor: pagination.hasPreviousPage ? 'pointer' : 'not-allowed',
                                            opacity: pagination.hasPreviousPage ? 1 : 0.5,
                                            padding: '8px 12px',
                                            fontSize: '13px',
                                            minWidth: '36px',
                                            height: '36px'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={5} height={10} viewBox="0 0 7 12">
                                            <path d="M0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12L0 6Z" />
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
                                        return <li key={page}><a style={{ cursor: 'default', padding: '8px 12px', fontSize: '13px', minWidth: '36px', height: '36px' }}>...</a></li>;
                                    }
                                    if (!showPage && page === pagination.totalPages - 1 && currentPage < pagination.totalPages - 2) {
                                        return <li key={page}><a style={{ cursor: 'default', padding: '8px 12px', fontSize: '13px', minWidth: '36px', height: '36px' }}>...</a></li>;
                                    }
                                    if (!showPage) return null;

                                    return (
                                        <li key={page}>
                                            <a
                                                className={page === currentPage ? 'active' : ''}
                                                onClick={() => handlePageChange(page)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '8px 12px',
                                                    fontSize: '13px',
                                                    minWidth: '36px',
                                                    height: '36px'
                                                }}
                                            >
                                                {page}
                                            </a>
                                        </li>
                                    );
                                })}

                                {/* Next Button */}
                                <li>
                                    <a
                                        onClick={() => pagination.hasNextPage && handlePageChange(currentPage + 1)}
                                        style={{
                                            cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed',
                                            opacity: pagination.hasNextPage ? 1 : 0.5,
                                            padding: '8px 12px',
                                            fontSize: '13px',
                                            minWidth: '36px',
                                            height: '36px'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={5} height={10} viewBox="0 0 7 12">
                                            <path d="M7 6L1 0L-0.4 1.4L4.2 6L-0.4 10.6L1 12L7 6Z" />
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
