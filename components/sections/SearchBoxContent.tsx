"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/state/redux";
import { setFilters, FiltersState } from "@/state";
import { debounce } from "lodash";
import { cleanParams } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchVillagesQuery } from "@/state/api";

interface Village {
  id: string;
  name: string;
  county: string;
  thumbnailUrl?: string | null;
}

export default function SearchBoxContent() {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Common");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useAppSelector((state) => state.global.filters);

  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Village dropdown state
  const [villageDropdownOpen, setVillageDropdownOpen] = useState(false);
  const [villageSearchTerm, setVillageSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [initialVillageLoaded, setInitialVillageLoaded] = useState(false);
  const villageDropdownRef = useRef<HTMLDivElement>(null);

  // Get villageId from URL on mount
  const urlVillageId = searchParams?.get("villageId") ?? null;

  // Debounce search term
  const debouncedSetSearch = useMemo(
    () => debounce((term: string) => setDebouncedSearchTerm(term), 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(villageSearchTerm);
    return () => debouncedSetSearch.cancel();
  }, [villageSearchTerm, debouncedSetSearch]);

  // Determine if we need to fetch villages
  const needsInitialVillageFetch = !!(urlVillageId || filters.village) && !selectedVillage && !initialVillageLoaded;
  const shouldFetchVillages = villageDropdownOpen || needsInitialVillageFetch;

  // Fetch villages with search
  const { data: villagesData, isLoading: villagesLoading } = useSearchVillagesQuery(
    { search: debouncedSearchTerm || undefined, limit: 50 },
    { skip: !shouldFetchVillages }
  );
  
  // Extract villages array from response
  const villages: Village[] = villagesData?.data || [];

  // Filter villages locally for immediate feedback
  const filteredVillages = villageSearchTerm && villages.length > 0
    ? villages.filter(
        (village) =>
          village.name.toLowerCase().includes(villageSearchTerm.toLowerCase()) ||
          village.county.toLowerCase().includes(villageSearchTerm.toLowerCase())
      )
    : villages;

  // Load village from URL/filters on initial load
  useEffect(() => {
    const targetVillageId = urlVillageId || filters.village;
    
    // Skip if no target, no villages, or already loaded
    if (!targetVillageId || villages.length === 0 || initialVillageLoaded) {
      return;
    }
    
    // Skip if already selected the correct village
    if (selectedVillage?.id === targetVillageId) {
      return;
    }
    
    const village = villages.find((v) => v.id === targetVillageId);
    if (village) {
      setSelectedVillage(village);
      setInitialVillageLoaded(true);
      
      if (urlVillageId && !localFilters.village) {
        setLocalFilters(prev => ({ ...prev, village: urlVillageId }));
      }
    }
  }, [urlVillageId, filters.village, villages.length, initialVillageLoaded, selectedVillage?.id, localFilters.village]);

  const isHomepage = pathname === "/";

  // Property types from schema
  const propertyTypes = [
    { value: "any", label: tc("all_types") },
    { value: "HOUSE", label: tc("house") },
    { value: "APARTMENT", label: tc("apartment") },
    { value: "FARMHOUSE", label: tc("farmhouse") },
    { value: "LAND", label: tc("land") },
    { value: "COMMERCIAL", label: tc("commercial") },
  ];

  // Bed and bath options
  const bedOptions = [
    { value: "any", label: tc("any") },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ];

  const bathOptions = [
    { value: "any", label: tc("any") },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  // Close village dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (villageDropdownRef.current && !villageDropdownRef.current.contains(event.target as Node)) {
        setVillageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear selected village when village is removed from filters
  useEffect(() => {
    if (!localFilters.village && selectedVillage) {
      setSelectedVillage(null);
    }
  }, [localFilters.village, selectedVillage]);

  const updateURL = debounce((newFilters: FiltersState) => {
    const params = cleanParams({
      location: newFilters.location !== "Budapest" ? newFilters.location : undefined,
      beds: newFilters.beds !== "any" ? newFilters.beds : undefined,
      baths: newFilters.baths !== "any" ? newFilters.baths : undefined,
      propertyType: newFilters.propertyType !== "any" ? newFilters.propertyType : undefined,
      priceMin: newFilters.priceRange[0],
      priceMax: newFilters.priceRange[1],
      areaMin: newFilters.squareFeet[0],
      areaMax: newFilters.squareFeet[1],
      villageId: newFilters.village,
    });

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.set(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `?${queryString}` : "";

    if (isHomepage) {
      router.push("/search" + url);
      return;
    }

    router.push(`${pathname}${url}`);
  }, 500);

  const handleInputChange = (field: keyof FiltersState, value: any) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
  };

  const handleVillageSelect = (village: Village) => {
    setSelectedVillage(village);
    setVillageDropdownOpen(false);
    setVillageSearchTerm("");
    handleInputChange("village", village.id);
  };

  const handleVillageClear = () => {
    setSelectedVillage(null);
    setVillageSearchTerm("");
    handleInputChange("village", undefined);
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
      village: undefined,
    };
    setLocalFilters(resetFilters);
    setSelectedVillage(null);
    dispatch(setFilters(resetFilters));
    router.push(pathname);
  };

  // Sync with Redux state changes
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Check if any filter is active (for reset button)
  const hasActiveFilters = 
    localFilters.location !== "Budapest" ||
    localFilters.propertyType !== "any" ||
    localFilters.beds !== "any" ||
    localFilters.baths !== "any" ||
    localFilters.priceRange[0] !== null ||
    localFilters.priceRange[1] !== null ||
    localFilters.village !== undefined;

  return (
    <>
      <style jsx>{`
        /* ============================================
           FILTER GROUP - Using main.css design system
           ============================================ */
        .filter-group select,
        .filter-group input[type="text"],
        .filter-group input[type="number"] {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          border: none;
          border-radius: 52px;
          background: var(--ztc-bg-bg-1);
          color: var(--ztc-text-text-2);
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s16);
          font-weight: var(--ztc-weight-medium);
          line-height: 16px;
        }

        .filter-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231B1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 20px center;
          padding-right: 40px;
        }

        .filter-group input:hover,
        .filter-group select:hover {
          background: #eee;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          outline: none;
          background: var(--ztc-bg-bg-1);
        }

        .filter-group {
          margin-bottom: 16px;
        }

        .keyword-input {
          border-radius: 52px !important;
          padding: 0 24px !important;
          height: 52px !important;
        }

        /* ============================================
           ADVANCE BUTTON
           ============================================ */
        .advance-button {
          background: #d9d9d9;
          border: 0;
          color: var(--ztc-text-text-2);
          padding: 10px 28px;
          border-radius: 80px;
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s14);
          font-weight: var(--ztc-weight-bold);
          cursor: pointer;
          transition: all 0.3s ease;
          height: 56px;
        }

        .advance-button:hover {
          background: var(--ztc-bg-bg-3) !important;
          color: var(--ztc-text-text-1);
        }

        .advance-button.active {
          background: var(--ztc-bg-bg-3);
          color: var(--ztc-text-text-1);
        }

        /* ============================================
           ADVANCED FILTERS
           ============================================ */
        .advanced-filters {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-out;
          margin-top: 20px;
          padding: 0 30px;
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
          color: var(--ztc-text-text-3);
          font-size: var(--ztc-font-size-font-s14);
        }

        .reset-button {
          background: transparent;
          border: 1px solid var(--ztc-border-border-1);
          color: var(--ztc-text-text-3);
          padding: 10px 20px;
          border-radius: 80px;
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s14);
          font-weight: var(--ztc-weight-medium);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-button:hover {
          background: #f5f5f5;
          border-color: var(--ztc-text-text-3);
        }

        .filter-section {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .filter-section h4 {
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s16);
          font-weight: var(--ztc-weight-semibold);
          margin-bottom: 16px;
          color: var(--ztc-text-text-2);
        }

        /* ============================================
           VILLAGE DROPDOWN - Matching nice-select style
           ============================================ */
        .village-dropdown-wrapper {
          position: relative;
        }

        .village-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-width: 180px;
          height: 52px;
          padding: 0 20px;
          background: var(--ztc-bg-bg-1);
          border: none;
          border-radius: 52px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .village-dropdown-trigger:hover {
          background: #eee;
        }

        .village-dropdown-trigger.active {
          background: var(--ztc-bg-bg-1);
        }

        .village-dropdown-trigger.has-value {
          background: rgba(237, 132, 56, 0.1);
        }

        .village-dropdown-icon {
          color: var(--ztc-text-text-3);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .village-dropdown-trigger.has-value .village-dropdown-icon {
          color: var(--ztc-text-text-4);
        }

        .village-dropdown-text {
          flex: 1;
          text-align: left;
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s16);
          font-weight: var(--ztc-weight-medium);
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .village-dropdown-placeholder {
          color: var(--ztc-text-text-3);
        }

        .village-dropdown-selected {
          color: var(--ztc-text-text-2);
        }

        .village-dropdown-arrow {
          color: var(--ztc-text-text-3);
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .village-dropdown-trigger.active .village-dropdown-arrow {
          transform: rotate(180deg);
        }

        .village-dropdown-clear {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          padding: 0;
          background: rgba(237, 132, 56, 0.2);
          border: none;
          border-radius: 50%;
          color: var(--ztc-text-text-4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .village-dropdown-clear:hover {
          background: var(--ztc-bg-bg-3);
          color: var(--ztc-text-text-1);
        }

        /* ============================================
           VILLAGE DROPDOWN MENU
           ============================================ */
        .village-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          min-width: 300px;
          background: var(--ztc-bg-bg-1);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          z-index: 1000;
          overflow: hidden;
          animation: villageSlideIn 0.3s ease;
        }

        @keyframes villageSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .village-dropdown-search {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--ztc-border-border-1);
        }

        .village-dropdown-search svg {
          color: var(--ztc-text-text-3);
          flex-shrink: 0;
        }

        .village-dropdown-search input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s14);
          color: var(--ztc-text-text-2);
          background: transparent;
          height: auto;
          padding: 0;
        }

        .village-dropdown-search input::placeholder {
          color: var(--ztc-text-text-3);
        }

        .village-dropdown-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .village-dropdown-list::-webkit-scrollbar {
          width: 6px;
        }

        .village-dropdown-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .village-dropdown-list::-webkit-scrollbar-thumb {
          background: var(--ztc-border-border-1);
          border-radius: 3px;
        }

        .village-dropdown-list::-webkit-scrollbar-thumb:hover {
          background: var(--ztc-text-text-3);
        }

        .village-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .village-dropdown-item:hover {
          background: #f5f5f5;
        }

        .village-dropdown-item.selected {
          background: rgba(237, 132, 56, 0.1);
        }

        .village-dropdown-item-image {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
        }

        .village-dropdown-item-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f2f3;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ztc-text-text-3);
        }

        .village-dropdown-item-info {
          flex: 1;
          min-width: 0;
        }

        .village-dropdown-item-name {
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s14);
          font-weight: var(--ztc-weight-medium);
          color: var(--ztc-text-text-2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .village-dropdown-item-county {
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s12);
          color: var(--ztc-text-text-3);
          margin-top: 2px;
        }

        .village-dropdown-item-check {
          color: var(--ztc-text-text-4);
          flex-shrink: 0;
        }

        .village-dropdown-loading,
        .village-dropdown-empty {
          padding: 30px 20px;
          text-align: center;
          color: var(--ztc-text-text-3);
          font-family: var(--ztc-family-font1);
          font-size: var(--ztc-font-size-font-s14);
        }

        .village-dropdown-loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid var(--ztc-border-border-1);
          border-top-color: var(--ztc-bg-bg-3);
          border-radius: 50%;
          animation: villageSpin 0.7s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes villageSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 991px) {
          .village-dropdown-trigger {
            width: 100%;
          }
          
          .village-dropdown-menu {
            min-width: 100%;
          }
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
                      <h2 className="fw-bold">{t('Search_title')}</h2>
                    </div>

                    {/* Basic Filters */}
                    <div className="filters z-1 position-relative">
                      <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
                        <div className="filter-group flex-grow-1">
                          <input
                            type="text"
                            className="keyword-input"
                            placeholder={t('Search_location_placeholder')}
                            value={localFilters.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                          />
                        </div>

                        {/* Village Dropdown */}
                        <div
                          className="filter-group village-dropdown-wrapper"
                          style={{ minWidth: "180px" }}
                          ref={villageDropdownRef}
                        >
                          <div
                            className={`village-dropdown-trigger ${villageDropdownOpen ? "active" : ""} ${selectedVillage ? "has-value" : ""}`}
                            onClick={() => setVillageDropdownOpen(!villageDropdownOpen)}
                          >
                            <div className="village-dropdown-icon">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                              </svg>
                            </div>
                            <div className="village-dropdown-text">
                              {selectedVillage ? (
                                <span className="village-dropdown-selected">{selectedVillage.name}</span>
                              ) : (
                                <span className="village-dropdown-placeholder">{tc("select_village")}</span>
                              )}
                            </div>
                            {selectedVillage ? (
                              <button
                                type="button"
                                className="village-dropdown-clear"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVillageClear();
                                }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            ) : (
                              <div className="village-dropdown-arrow">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {villageDropdownOpen && (
                            <div className="village-dropdown-menu">
                              <div className="village-dropdown-search">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="11" cy="11" r="8" />
                                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                  type="text"
                                  placeholder={tc("search_villages")}
                                  value={villageSearchTerm}
                                  onChange={(e) => setVillageSearchTerm(e.target.value)}
                                  autoFocus
                                />
                              </div>
                              <div className="village-dropdown-list">
                                {villagesLoading ? (
                                  <div className="village-dropdown-loading">
                                    <div className="village-dropdown-loading-spinner"></div>
                                    <span>{tc("loading")}</span>
                                  </div>
                                ) : filteredVillages.length === 0 ? (
                                  <div className="village-dropdown-empty">
                                    {tc("no_villages_found")}
                                  </div>
                                ) : (
                                  filteredVillages.map((village) => (
                                    <div
                                      key={village.id}
                                      className={`village-dropdown-item ${selectedVillage?.id === village.id ? "selected" : ""}`}
                                      onClick={() => handleVillageSelect(village)}
                                    >
                                      {village.thumbnailUrl ? (
                                        <img
                                          src={village.thumbnailUrl}
                                          alt={village.name}
                                          className="village-dropdown-item-image"
                                        />
                                      ) : (
                                        <div className="village-dropdown-item-placeholder">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                          </svg>
                                        </div>
                                      )}
                                      <div className="village-dropdown-item-info">
                                        <div className="village-dropdown-item-name">{village.name}</div>
                                        <div className="village-dropdown-item-county">{village.county}</div>
                                      </div>
                                      {selectedVillage?.id === village.id && (
                                        <svg className="village-dropdown-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
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
                                {option.label} {tc('beds')}
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
                                {option.label} {tc('baths')}
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
                        <h4>{t('Search_price_range')}</h4>
                        <div className="range-inputs">
                          <input
                            type="number"
                            placeholder={t('Search_min_price')}
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
                            placeholder={t('Search_max_price')}
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
                        <h4>{t('Search_living_area')}</h4>
                        <div className="range-inputs">
                          <input
                            type="number"
                            placeholder={t('Search_min_area')}
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
                            placeholder={t('Search_max_area')}
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
                              {t('Search_btn')}
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
                            {showAdvanced ? t('Search_hide_filters') : t('Search_more_filters')}
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

                          {hasActiveFilters && (
                            <button
                              type="button"
                              className="reset-button"
                              onClick={handleReset}
                            >
                              {t('Search_reset')}
                            </button>
                          )}

                          <Link
                            href="/search"
                            className="text-decoration-none text-primary ms-2"
                          >
                            {tc('view_all')}
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