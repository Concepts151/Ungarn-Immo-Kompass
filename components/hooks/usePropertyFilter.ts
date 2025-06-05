"use client";

import { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/features/store';

interface FilterState {
    priceRange: {
        min: number;
        max: number;
    };
    sizeRange: {
        min: number;
        max: number;
    };
    activeTab: string;
    keyword: string;
    address: string;
    showAdvanced: boolean;
}

type FilterAction =
    | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
    | { type: 'SET_SIZE_RANGE'; payload: { min: number; max: number } }
    | { type: 'SET_ACTIVE_TAB'; payload: string }
    | { type: 'SET_KEYWORD'; payload: string }
    | { type: 'SET_ADDRESS'; payload: string }
    | { type: 'TOGGLE_ADVANCED' }
    | { type: 'RESET_FILTERS' }
    | { type: 'UPDATE_FROM_REDUX'; payload: Partial<FilterState> };

const initialState: FilterState = {
    priceRange: { min: 0, max: 0 },
    sizeRange: { min: 0, max: 0 },
    activeTab: '',
    keyword: '',
    address: '',
    showAdvanced: false
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case 'SET_PRICE_RANGE':
            return { ...state, priceRange: action.payload };
        case 'SET_SIZE_RANGE':
            return { ...state, sizeRange: action.payload };
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };
        case 'SET_KEYWORD':
            return { ...state, keyword: action.payload };
        case 'SET_ADDRESS':
            return { ...state, address: action.payload };
        case 'TOGGLE_ADVANCED':
            return { ...state, showAdvanced: !state.showAdvanced };
        case 'RESET_FILTERS':
            return initialState;
        case 'UPDATE_FROM_REDUX':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export function usePropertyFilter() {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const reduxDispatch = useDispatch();
    const { propertyFilter } = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_FROM_REDUX',
            payload: {
                priceRange: {
                    min: propertyFilter.price.min,
                    max: propertyFilter.price.max,
                },
                sizeRange: {
                    min: propertyFilter.size.min,
                    max: propertyFilter.size.max,
                },
                keyword: propertyFilter.keyword || '',
            }
        });
    }, [propertyFilter]);

    const actions = {
        setPriceRange: (range: { min: number; max: number }) => {
            dispatch({ type: 'SET_PRICE_RANGE', payload: range });
            reduxDispatch({ type: 'filter/addPrice', payload: range });
        },
        setSizeRange: (range: { min: number; max: number }) => {
            dispatch({ type: 'SET_SIZE_RANGE', payload: range });
            reduxDispatch({ type: 'filter/addSize', payload: range });
        },
        setActiveTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
        setKeyword: (keyword: string) => {
            dispatch({ type: 'SET_KEYWORD', payload: keyword });
            reduxDispatch({ type: 'filter/addKeyword', payload: keyword });
        },
        setAddress: (address: string) => dispatch({ type: 'SET_ADDRESS', payload: address }),
        toggleAdvanced: () => dispatch({ type: 'TOGGLE_ADVANCED' }),
        resetFilters: () => {
            dispatch({ type: 'RESET_FILTERS' });
            reduxDispatch({ type: 'filter/resetFilters' });
        }
    };

    return {
        state,
        actions
    };
} 