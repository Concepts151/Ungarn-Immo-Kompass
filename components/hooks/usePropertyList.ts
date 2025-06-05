"use client";

import { useReducer, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/features/store';
import type { PropertyListItem } from '@/types/property';

interface ListState {
    filteredProperties: PropertyListItem[];
    currentPage: number;
    itemsPerPage: number;
    sortOrder: string;
    viewMode: string;
}

type ListAction =
    | { type: 'SET_FILTERED_PROPERTIES'; payload: PropertyListItem[] }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
    | { type: 'SET_SORT_ORDER'; payload: string }
    | { type: 'SET_VIEW_MODE'; payload: string }
    | { type: 'RESET_LIST' };

const initialState: ListState = {
    filteredProperties: [],
    currentPage: 1,
    itemsPerPage: 6,
    sortOrder: 'default',
    viewMode: 'grid'
};

function listReducer(state: ListState, action: ListAction): ListState {
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
        case 'RESET_LIST':
            return initialState;
        default:
            return state;
    }
}

// Accept properties and propertyFilter as arguments
export function usePropertyList(
    properties: PropertyListItem[],
    propertyFilter: any,
    defaultViewMode: string = 'grid',
    defaultItemsPerPage: number = 6
) {
    const [state, dispatch] = useReducer(listReducer, {
        ...initialState,
        viewMode: defaultViewMode,
        itemsPerPage: defaultItemsPerPage
    });

    // Reset currentPage về 1 chỉ khi propertyFilter thực sự thay đổi
    const prevFilterRef = useRef<string>("");
    useEffect(() => {
        const filterString = JSON.stringify(propertyFilter);
        if (prevFilterRef.current && prevFilterRef.current !== filterString) {
            if (state.currentPage !== 1) {
                dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
            }
        }
        prevFilterRef.current = filterString;
    }, [propertyFilter, state.currentPage]);

    useEffect(() => {
        let result = [...properties];
        // Keyword
        if (propertyFilter.keyword) {
            const keyword = propertyFilter.keyword.trim().toLowerCase();
            result = result.filter((property) =>
                property.keyword?.toLowerCase().includes(keyword)
            );
        }
        // Type (propertyType from query/filter)
        if (propertyFilter.propertyType) {
            const type = propertyFilter.propertyType.trim().toLowerCase();
            result = result.filter((property) =>
                property.type?.trim().toLowerCase() === type
            );
        }
        // City
        if (propertyFilter.city) {
            const city = propertyFilter.city.trim().toLowerCase();
            result = result.filter((property) =>
                property.city?.trim().toLowerCase() === city
            );
        }
        // State
        if (propertyFilter.state) {
            const state = propertyFilter.state.trim().toLowerCase();
            result = result.filter((property) =>
                property.state?.trim().toLowerCase() === state
            );
        }
        // Status
        if (propertyFilter.status) {
            const status = propertyFilter.status.trim().toLowerCase();
            result = result.filter((property) =>
                property.status?.trim().toLowerCase() === status
            );
        }
        // Amenities
        if (propertyFilter.amenities && propertyFilter.amenities.length > 0) {
            result = result.filter((property) =>
                propertyFilter.amenities.every((amenity: string) =>
                    property.amenities.some((a) => a.trim().toLowerCase() === amenity.trim().toLowerCase())
                )
            );
        }
        if (propertyFilter.bedrooms?.min > 0) {
            result = result.filter((property) => property.bedrooms >= propertyFilter.bedrooms.min);
        }
        if (propertyFilter.bathrooms?.min > 0) {
            result = result.filter((property) => property.bathrooms >= propertyFilter.bathrooms.min);
        }
        if (propertyFilter.garages?.min > 0) {
            result = result.filter((property) => property.garages >= propertyFilter.garages.min);
        }
        if (propertyFilter.rooms?.min > 0) {
            result = result.filter((property) => property.rooms >= propertyFilter.rooms.min);
        }
        if (propertyFilter.price) {
            result = result.filter((property) => property.minPrice >= propertyFilter.price.min && property.maxPrice <= propertyFilter.price.max);
        }
        if (propertyFilter.size) {
            result = result.filter((property) => property.minSize >= propertyFilter.size.min && property.maxSize <= propertyFilter.size.max);
        }
        // Apply sorting
        if (state.sortOrder === "oldest") {
            result.sort((a, b) => a.id - b.id);
        } else if (state.sortOrder === "newest") {
            result.sort((a, b) => b.id - a.id);
        } else if (state.sortOrder === "price-low") {
            result.sort((a, b) => a.minPrice - b.minPrice);
        } else if (state.sortOrder === "price-high") {
            result.sort((a, b) => b.minPrice - a.minPrice);
        }
        // Only dispatch if result is different from state.filteredProperties
        const isSame =
            result.length === state.filteredProperties.length &&
            result.every((item, idx) => item.id === state.filteredProperties[idx]?.id);
        if (!isSame) {
            dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: result });
        }
    }, [properties, propertyFilter, state.sortOrder, state.itemsPerPage]);

    const actions = {
        setCurrentPage: (page: number) => dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
        setItemsPerPage: (items: number) => dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: items }),
        setSortOrder: (order: string) => dispatch({ type: 'SET_SORT_ORDER', payload: order }),
        setViewMode: (mode: string) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
        resetList: () => dispatch({ type: 'RESET_LIST' })
    };

    // Calculate pagination
    const totalPages = Math.ceil(state.filteredProperties.length / state.itemsPerPage);
    const paginatedProperties = state.filteredProperties.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
    );

    return {
        state,
        actions,
        paginatedProperties,
        totalPages
    };
} 