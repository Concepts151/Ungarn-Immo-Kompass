"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import cities from "@/data/hu.json";
import "./css/location-picker.css";
import "./css/village-selector.css";

import "leaflet/dist/leaflet.css";

// ============================================
// Types and Interfaces
// ============================================

interface ListingDescriptionFormData {
  title: string;
  description: string;
  address: string;
  postalCode: string;
  price: string;
  currency: string;
  lotSize: string;
  livingArea: string;
  numberOfRooms: string;
  numberOfBedrooms: string;
  numberOfBathrooms: string;
  city: string;
  year: string;
  country: string;
  category: string;
  listedIn: string;
  propertyStatus: string;
}

interface Locationdata {
  longitude: string;
  latitude: string;
  villageId: string;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

interface Village {
  id: string;
  name: string;
  county: string;
  population: number;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
  distance_km?: number;
}

interface LocationFormProps {
  propertyData: ListingDescriptionFormData;
  data: Locationdata;
  onDataChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
}

// ============================================
// Debounce Hook
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// Village Selector Component
// ============================================

interface VillageSelectorProps {
  value: string | null;
  onChange: (villageId: string | null, village: Village | null) => void;
  coordinates?: { lat: number; lng: number } | null;
  disabled?: boolean;
  apiBaseUrl?: string;
}

function VillageSelector({
  value,
  onChange,
  coordinates,
  disabled = false,
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005",
}: VillageSelectorProps) {
  const locale = useLocale(); // Get user's current language

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [villages, setVillages] = useState<Village[]>([]);
  const [filteredVillages, setFilteredVillages] = useState<Village[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoDetectedVillage, setAutoDetectedVillage] =
    useState<Village | null>(null);
  const [discoveredVillage, setDiscoveredVillage] = useState<any | null>(null);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Show notification banner
  const showNotification = useCallback(
    (
      message: string,
      type: "success" | "error" | "warning" | "info" = "info",
    ) => {
      setNotification({ message, type });
      // Auto-dismiss after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    },
    [],
  );

  // Fetch all villages from database
  const fetchAllVillages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/village`);
      const data = await response.json();

      if (data.success) {
        setVillages(data.data);
        setFilteredVillages(data.data);
      }
    } catch (err) {
      console.error("Error fetching villages:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl]);

  // Filter villages locally based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredVillages(villages);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = villages.filter(
        (v) =>
          v.name.toLowerCase().includes(term) ||
          v.county.toLowerCase().includes(term),
      );
      setFilteredVillages(filtered);
    }
  }, [searchTerm, villages]);

  // Auto-detect nearest village when coordinates change
  const autoDetectVillage = useCallback(async () => {
    if (!coordinates) {
      setAutoDetectedVillage(null);
      setDiscoveredVillage(null);
      setShowDiscovery(false);
      return;
    }

    // Validate coordinates are not (0,0) or invalid
    if (coordinates.lat === 0 && coordinates.lng === 0) {
      setAutoDetectedVillage(null);
      setDiscoveredVillage(null);
      setShowDiscovery(false);
      return;
    }

    // Validate coordinates are within reasonable bounds
    if (Math.abs(coordinates.lat) > 90 || Math.abs(coordinates.lng) > 180) {
      setAutoDetectedVillage(null);
      setDiscoveredVillage(null);
      setShowDiscovery(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        lat: coordinates.lat.toString(),
        lng: coordinates.lng.toString(),
        radius: "10",
      });

      const response = await fetch(`${apiBaseUrl}/village/nearest?${params}`);
      const data = await response.json();

      if (data.success && data.data.nearestMatch) {
        const nearest = data.data.nearestMatch;
        setAutoDetectedVillage(nearest);
        setShowDiscovery(false);

        // Auto-select if no village is currently selected
        if (!value) {
          setSelectedVillage(nearest);
          onChange(nearest.id, nearest);
        }
      } else {
        // No village found in database - try AI discovery
        setAutoDetectedVillage(null);
        await discoverVillageWithAI();
      }
    } catch (err) {
      console.error("Error auto-detecting village:", err);
      setAutoDetectedVillage(null);
    }
  }, [coordinates, apiBaseUrl, value, onChange]);

  // Fetch villages on mount
  useEffect(() => {
    fetchAllVillages();
  }, [fetchAllVillages]);

  // Auto-detect when coordinates change
  useEffect(() => {
    autoDetectVillage();
  }, [autoDetectVillage]);

  // Discover village using AI when not in database
  const discoverVillageWithAI = useCallback(async () => {
    if (!coordinates) return;

    // Validate coordinates are not (0,0) or invalid
    if (coordinates.lat === 0 && coordinates.lng === 0) {
      return;
    }

    // Validate coordinates are within reasonable bounds
    if (Math.abs(coordinates.lat) > 90 || Math.abs(coordinates.lng) > 180) {
      return;
    }

    setIsDiscovering(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for AI

    try {
      const response = await fetch(`${apiBaseUrl}/village/discover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          radius: 10,
          language: locale, // Send user's current language
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && !data.found) {
        // AI discovered a new village
        setDiscoveredVillage(data.data);
        setShowDiscovery(true);
      } else if (data.found) {
        // Found in database (shouldn't happen, but handle it)
        setShowDiscovery(false);
      } else {
        // No village found at all
        setShowDiscovery(false);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Error discovering village with AI:", err);

      // Show user-friendly error message
      if (err.name === "AbortError") {
        showNotification(
          "AI discovery timed out due to slow connection. Please try again or select a village manually.",
          "warning",
        );
      } else if (err.message?.includes("Failed to fetch")) {
        showNotification(
          "Network error. Please check your internet connection and try again.",
          "error",
        );
      } else {
        showNotification(
          "Unable to discover village. Please select manually from the list.",
          "error",
        );
      }

      setShowDiscovery(false);
    } finally {
      setIsDiscovering(false);
    }
  }, [coordinates, apiBaseUrl]);

  // Handle adding discovered village to database
  const handleAddDiscoveredVillage = async () => {
    if (!discoveredVillage) return;

    setIsCreating(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      const response = await fetch(`${apiBaseUrl}/village/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: discoveredVillage.name,
          county: discoveredVillage.county,
          latitude: discoveredVillage.latitude,
          longitude: discoveredVillage.longitude,
          population: discoveredVillage.population || 0,
          description: discoveredVillage.description || "",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Add to villages list
        const newVillage = data.data;
        setVillages([...villages, newVillage]);

        // Auto-select the new village
        setSelectedVillage(newVillage);
        onChange(newVillage.id, newVillage);

        // Hide discovery UI
        setShowDiscovery(false);
        setDiscoveredVillage(null);

        // Show success feedback
        showNotification(
          `Successfully added ${newVillage.name} to the database!`,
          "success",
        );
      } else {
        showNotification(`Failed to add village: ${data.message}`, "error");
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Error creating village:", err);

      // User-friendly error messages
      if (err.name === "AbortError") {
        showNotification(
          "Request timed out due to slow connection. Please try again.",
          "warning",
        );
      } else if (err.message?.includes("Failed to fetch")) {
        showNotification(
          "Network error. Please check your internet connection and try again.",
          "error",
        );
      } else {
        showNotification("Failed to add village. Please try again.", "error");
      }
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (value && villages.length > 0) {
      const found = villages.find((v) => v.id === value);
      if (found) {
        setSelectedVillage(found);
      }
    } else if (!value) {
      setSelectedVillage(null);
    }
  }, [value, villages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleSelect = (village: Village) => {
    setSelectedVillage(village);
    onChange(village.id, village);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedVillage(null);
    onChange(null, null);
    setSearchTerm("");
  };

  const handleUseAutoDetected = () => {
    if (autoDetectedVillage) {
      handleSelect(autoDetectedVillage);
    }
  };

  // Replace placeholder with a stateful viewMode and setter.
  // Default to "dropdown" (list view)
  const [viewMode, setViewMode] = useState<"dropdown" | "map">("dropdown");

  return (
    <div className="village-selector-wrapper">
      {/* Notification Banner */}
      {notification && (
        <div
          className={`notification-banner notification-${notification.type}`}
        >
          <div className="notification-content">
            <i
              className={`fa-solid ${
                notification.type === "success"
                  ? "fa-circle-check"
                  : notification.type === "error"
                    ? "fa-circle-xmark"
                    : notification.type === "warning"
                      ? "fa-triangle-exclamation"
                      : "fa-circle-info"
              }`}
            ></i>
            <span>{notification.message}</span>
          </div>
          <button
            className="notification-close"
            onClick={() => setNotification(null)}
            aria-label="Close notification"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
      )}

      {/* Label with Auto-detect badge */}
      <label className="village-selector-label">
        <h5>Village</h5>
        {autoDetectedVillage && !selectedVillage && (
          <span className="auto-detect-badge">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Auto-detected
          </span>
        )}
      </label>

      <div className="space16" />

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button
          type="button"
          className={`toggle-btn ${viewMode === "dropdown" ? "active" : ""}`}
          onClick={() => setViewMode("dropdown")}
        >
          <i className="fa-solid fa-list"></i>
          <span>List</span>
        </button>
        <button
          type="button"
          className={`toggle-btn ${viewMode === "map" ? "active" : ""}`}
          onClick={() => setViewMode("map")}
        >
          <i className="fa-solid fa-map"></i>
          <span>Map</span>
        </button>
      </div>

      <div className="space12" />

      {/* Auto-detected suggestion */}
      {autoDetectedVillage && !selectedVillage && viewMode === "dropdown" && (
        <div className="auto-detect-suggestion">
          <div className="suggestion-content">
            <i className="fa-solid fa-location-dot"></i>
            <div className="suggestion-text">
              <span className="suggestion-label">
                Nearest village detected:
              </span>
              <span className="suggestion-name">
                {autoDetectedVillage.name}
                <small>({autoDetectedVillage.distance_km}km away)</small>
              </span>
            </div>
          </div>
          <button
            type="button"
            className="use-suggestion-btn"
            onClick={handleUseAutoDetected}
          >
            Use this
          </button>
        </div>
      )}

      {/* AI Discovery Card */}
      {showDiscovery && discoveredVillage && viewMode === "dropdown" && (
        <div className="village-discovery-card">
          <div className="discovery-header">
            <i className="fa-solid fa-sparkles"></i>
            <h5>Village Discovered by AI</h5>
          </div>

          <div className="discovery-content">
            <div className="village-info">
              <span className="village-name">{discoveredVillage.name}</span>
              <span className="village-county">{discoveredVillage.county}</span>
              {discoveredVillage.population && (
                <span className="village-population">
                  Pop: ~{discoveredVillage.population.toLocaleString()}
                </span>
              )}
            </div>

            <div className="confidence-badge">
              <span>
                Confidence: {(discoveredVillage.confidence * 100).toFixed(0)}%
              </span>
            </div>

            {discoveredVillage.description && (
              <p className="discovery-description">
                {discoveredVillage.description}
              </p>
            )}

            <p className="discovery-message">
              <strong>Is this the village this property is located in?</strong>
            </p>

            {discoveredVillage.reasoning && (
              <p className="discovery-reasoning">
                <i className="fa-solid fa-lightbulb"></i>
                {discoveredVillage.reasoning}
              </p>
            )}

            <div className="discovery-actions">
              <button
                className="btn-yes-village"
                onClick={handleAddDiscoveredVillage}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i>
                    Yes
                  </>
                )}
              </button>
              <button
                className="btn-no-village"
                onClick={() => setShowDiscovery(false)}
                disabled={isCreating}
              >
                <i className="fa-solid fa-times"></i>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Discovery Loading State */}
      {isDiscovering && viewMode === "dropdown" && (
        <div className="village-discovery-loading">
          <div className="loading-content">
            <div className="spinner-ai">
              <i className="fa-solid fa-sparkles fa-spin"></i>
            </div>
            <span>Discovering village with AI...</span>
          </div>
        </div>
      )}

      {/* Dropdown View */}
      {viewMode === "dropdown" && (
        <div
          className={`village-selector-dropdown ${isOpen ? "open" : ""} ${
            disabled ? "disabled" : ""
          }`}
          ref={dropdownRef}
        >
          {/* Trigger */}
          <div
            className="dropdown-trigger"
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            {selectedVillage ? (
              <div className="selected-village">
                <div className="village-info">
                  <span className="village-name">{selectedVillage.name}</span>
                  <span className="village-county">
                    {selectedVillage.county}
                  </span>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                )}
              </div>
            ) : (
              <div className="placeholder-text">
                <i className="fa-solid fa-search"></i>
                <span>Select or search village...</span>
              </div>
            )}
            <i
              className={`fa-solid fa-chevron-${
                isOpen ? "up" : "down"
              } dropdown-arrow`}
            ></i>
          </div>

          {/* Dropdown Content */}
          {isOpen && (
            <div className="dropdown-content">
              {/* Search Input */}
              <div className="search-input-wrapper">
                <i className="fa-solid fa-search"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search villages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                )}
              </div>

              {/* Villages List */}
              <div className="villages-list">
                {isLoading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <span>Loading villages...</span>
                  </div>
                ) : filteredVillages.length === 0 ? (
                  <div className="empty-state">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    <span>
                      {searchTerm
                        ? "No villages found matching your search"
                        : "No villages found"}
                    </span>
                  </div>
                ) : (
                  filteredVillages.map((village) => (
                    <div
                      key={village.id}
                      className={`village-item ${
                        selectedVillage?.id === village.id ? "selected" : ""
                      } ${
                        autoDetectedVillage?.id === village.id
                          ? "auto-detected"
                          : ""
                      }`}
                      onClick={() => handleSelect(village)}
                    >
                      <div className="village-item-info">
                        <span className="village-item-name">
                          {village.name}
                        </span>
                        <span className="village-item-meta">
                          Pop: {village.population.toLocaleString()}
                          {village.distance_km !== undefined && (
                            <span> · {village.distance_km}km</span>
                          )}
                        </span>
                      </div>
                      {autoDetectedVillage?.id === village.id && (
                        <span className="nearest-badge">
                          <i className="fa-solid fa-location-crosshairs"></i>
                          Nearest
                        </span>
                      )}
                      {selectedVillage?.id === village.id && (
                        <i className="fa-solid fa-check selected-check"></i>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* No village option */}
              <div className="no-village-option" onClick={handleClear}>
                <i className="fa-solid fa-ban"></i>
                <span>No village / Not in a village</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map View */}
      {viewMode === "map" && (
        <VillageMapView
          villages={villages}
          selectedVillage={selectedVillage}
          autoDetectedVillage={autoDetectedVillage}
          propertyCoordinates={coordinates}
          onSelect={handleSelect}
          county={selectedVillage?.county || ""}
        />
      )}

      {/* Selected Village Info */}
      {selectedVillage && (
        <div className="selected-village-info">
          <div className="info-row">
            <i className="fa-solid fa-users"></i>
            <span>
              Population: {selectedVillage.population.toLocaleString()}
            </span>
          </div>
          {selectedVillage.distance_km !== undefined && (
            <div className="info-row">
              <i className="fa-solid fa-route"></i>
              <span>
                Distance: {selectedVillage.distance_km}km from property
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// Village Map View Component
// ============================================

interface VillageMapViewProps {
  villages: Village[];
  selectedVillage: Village | null;
  autoDetectedVillage: Village | null;
  propertyCoordinates?: { lat: number; lng: number } | null;
  onSelect: (village: Village) => void;
  county: string;
}

function VillageMapView({
  villages,
  selectedVillage,
  autoDetectedVillage,
  propertyCoordinates,
  onSelect,
  county,
}: VillageMapViewProps) {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [ReactLeaflet, setReactLeaflet] = useState<
    typeof import("react-leaflet") | null
  >(null);

  useEffect(() => {
    async function loadLeaflet() {
      try {
        const leafletModule = await import("leaflet");
        const reactLeafletModule = await import("react-leaflet");

        setL(leafletModule.default);
        setReactLeaflet(reactLeafletModule);
        setLeafletLoaded(true);
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    }
    loadLeaflet();
  }, []);

  if (!leafletLoaded || !L || !ReactLeaflet) {
    return (
      <div className="village-map-loading">
        <div className="spinner"></div>
        <span>Loading map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = ReactLeaflet;

  // Create custom icons
  const createVillageIcon = (isSelected: boolean, isAutoDetected: boolean) => {
    const color = isSelected
      ? "#10b981"
      : isAutoDetected
        ? "#f59e0b"
        : "#6366f1";
    const size = isSelected || isAutoDetected ? 32 : 24;

    return L.divIcon({
      className: "village-marker-icon",
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 2px solid white;
        ">
          <i class="fa-solid fa-home" style="color: white; font-size: ${
            size / 2.5
          }px;"></i>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const propertyIcon = L.divIcon({
    className: "property-marker-icon",
    html: `
      <div style="
        background-color: #ef4444;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 12px rgba(239,68,68,0.5);
        border: 3px solid white;
      ">
        <i class="fa-solid fa-building" style="color: white; font-size: 16px;"></i>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  // Calculate center
  const getCenter = (): [number, number] => {
    if (propertyCoordinates) {
      return [propertyCoordinates.lat, propertyCoordinates.lng];
    }
    if (villages.length > 0) {
      return [villages[0].latitude, villages[0].longitude];
    }
    return [47.1625, 19.5033]; // Hungary center
  };

  return (
    <div className="village-map-picker">
      {/* Map Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <span
            className="legend-marker"
            style={{ backgroundColor: "#ef4444" }}
          ></span>
          <span>Your Property</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-marker"
            style={{ backgroundColor: "#10b981" }}
          ></span>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-marker"
            style={{ backgroundColor: "#f59e0b" }}
          ></span>
          <span>Nearest</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-marker"
            style={{ backgroundColor: "#6366f1" }}
          ></span>
          <span>Villages</span>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={getCenter()}
        zoom={10}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Property marker */}
        {propertyCoordinates && (
          <Marker
            position={[propertyCoordinates.lat, propertyCoordinates.lng]}
            icon={propertyIcon}
          >
            <Popup>
              <strong>Your Property</strong>
              <p>Location of the property being listed</p>
            </Popup>
          </Marker>
        )}

        {/* Village markers */}
        {villages.map((village) => {
          const isSelected = selectedVillage?.id === village.id;
          const isAutoDetected = autoDetectedVillage?.id === village.id;

          return (
            <Marker
              key={village.id}
              position={[village.latitude, village.longitude]}
              icon={createVillageIcon(isSelected, isAutoDetected)}
              eventHandlers={{
                click: () => onSelect(village),
              }}
            >
              <Popup>
                <div className="village-popup">
                  <h4>{village.name}</h4>
                  <p>
                    <strong>County:</strong> {village.county}
                  </p>
                  <p>
                    <strong>Population:</strong>{" "}
                    {village.population.toLocaleString()}
                  </p>
                  {village.distance_km !== undefined && (
                    <p>
                      <strong>Distance:</strong> {village.distance_km}km
                    </p>
                  )}
                  {isAutoDetected && (
                    <span className="nearest-tag">Nearest Village</span>
                  )}
                  <button
                    className="select-village-btn"
                    onClick={() => onSelect(village)}
                  >
                    {isSelected ? "Selected" : "Select This Village"}
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Footer */}
      <div className="map-footer">
        <p>
          <i className="fa-solid fa-info-circle"></i>
          Click on a village marker to select it.
          {villages.length > 0 && (
            <span>
              {" "}
              Showing {villages.length} village
              {villages.length !== 1 ? "s" : ""} in {county}.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Search Bar Component
// ============================================

function LocationSearch({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function searchLocations() {
      if (debouncedQuery.length < 3) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            debouncedQuery,
          )}&limit=5&addressdetails=1`,
        );
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }

    searchLocations();
  }, [debouncedQuery]);

  const handleSelect = (result: SearchResult) => {
    onLocationSelect(
      parseFloat(result.lat),
      parseFloat(result.lon),
      result.display_name,
    );
    setQuery(result.display_name.split(",")[0]);
    setShowResults(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="location-search-wrapper">
      <div className="location-search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search for a location..."
          className="location-search-input"
        />
        <svg
          className="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {isSearching ? (
          <svg className="search-spinner" fill="none" viewBox="0 0 24 24">
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : query ? (
          <button onClick={handleClear} className="search-clear-btn">
            <svg
              style={{ width: 20, height: 20 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : null}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results-dropdown">
          {results.map((result) => (
            <button
              key={result.place_id}
              onClick={() => handleSelect(result)}
              className="search-result-item"
            >
              <svg
                className="search-result-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="search-result-content">
                <p className="search-result-title">
                  {result.display_name.split(",")[0]}
                </p>
                <p className="search-result-subtitle">
                  {result.display_name.split(",").slice(1).join(",").trim()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults &&
        query.length >= 3 &&
        !isSearching &&
        results.length === 0 && (
          <div className="search-results-dropdown">
            <p className="search-no-results">No locations found</p>
          </div>
        )}
    </div>
  );
}

// ============================================
// Map Component (Client-side only)
// ============================================

function LocationPickerMap({
  initialLat,
  initialLng,
  onLocationChange,
  defaultCenter = [47.4979, 19.0402], // Budapest, Hungary
  defaultZoom = 13,
}: {
  initialLat?: string;
  initialLng?: string;
  onLocationChange: (lat: string, lng: string) => void;
  defaultCenter?: [number, number];
  defaultZoom?: number;
}) {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [ReactLeaflet, setReactLeaflet] = useState<
    typeof import("react-leaflet") | null
  >(null);

  const [pinpoint, setPinpoint] = useState<{ lat: number; lng: number } | null>(
    initialLat && initialLng
      ? { lat: parseFloat(initialLat), lng: parseFloat(initialLng) }
      : null,
  );
  const [pinpointAddress, setPinpointAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [flyToPosition, setFlyToPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Load Leaflet dynamically
  useEffect(() => {
    async function loadLeaflet() {
      try {
        const leafletModule = await import("leaflet");
        const reactLeafletModule = await import("react-leaflet");
        // await import("leaflet/dist/leaflet.css");

        setL(leafletModule.default);
        setReactLeaflet(reactLeafletModule);
        setLeafletLoaded(true);
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    }

    loadLeaflet();
  }, []);

  // Reverse geocode function with timeout and error handling
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          signal: controller.signal,
          headers: {
            "User-Agent": "PropertyListingApp/1.0",
          },
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPinpointAddress(data.display_name || "Unknown location");
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Geocoding error:", error);

      // User-friendly error messages
      if (error.name === "AbortError") {
        setPinpointAddress("⚠️ Request timed out - slow connection");
      } else if (error.message?.includes("Failed to fetch")) {
        setPinpointAddress("⚠️ Network error - check your connection");
      } else {
        setPinpointAddress("⚠️ Unable to get address");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle pinpoint change
  const handlePinpointChange = useCallback(
    (lat: number, lng: number) => {
      setPinpoint({ lat, lng });
      onLocationChange(lat.toString(), lng.toString());
      reverseGeocode(lat, lng);
    },
    [onLocationChange, reverseGeocode],
  );

  // Handle search selection
  const handleSearchSelect = useCallback(
    (lat: number, lng: number, address: string) => {
      setPinpoint({ lat, lng });
      setPinpointAddress(address);
      onLocationChange(lat.toString(), lng.toString());
      setFlyToPosition({ lat, lng });
    },
    [onLocationChange],
  );

  // Clear pinpoint
  const handleClearPinpoint = () => {
    setPinpoint(null);
    setPinpointAddress("");
    onLocationChange("", "");
  };

  // Get instruction text
  const getInstructionText = () => {
    if (!pinpoint) return "Click on the map to place a marker";
    return "Click elsewhere to move the marker";
  };

  if (!leafletLoaded || !L || !ReactLeaflet) {
    return (
      <div className="map-loading-wrapper">
        <div className="spinner" style={{ width: 40, height: 40 }}></div>
        <span style={{ marginTop: 12 }}>Loading map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMapEvents, useMap } =
    ReactLeaflet;

  // Default icon
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Map interaction component
  function MapInteraction() {
    useMapEvents({
      click(e) {
        handlePinpointChange(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  // Fly to location component
  function FlyToLocation() {
    const map = useMap();
    useEffect(() => {
      if (flyToPosition) {
        map.flyTo([flyToPosition.lat, flyToPosition.lng], 13, {
          duration: 1.5,
        });
        setFlyToPosition(null);
      }
    }, [map]);
    return null;
  }

  return (
    <div>
      {/* Search Bar */}
      <LocationSearch onLocationSelect={handleSearchSelect} />

      <div className="space20" />

      {/* Map Container */}
      <div className="map-container-wrapper">
        <MapContainer
          center={pinpoint ? [pinpoint.lat, pinpoint.lng] : defaultCenter}
          zoom={defaultZoom}
          style={{ height: "450px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapInteraction />
          <FlyToLocation />

          {pinpoint && (
            <Marker
              position={[pinpoint.lat, pinpoint.lng]}
              icon={defaultIcon}
            />
          )}
        </MapContainer>

        <div className="map-instruction-overlay">
          <p>{getInstructionText()}</p>
        </div>
      </div>

      <div className="space20" />

      {/* Location Info Card */}
      <div className={`selection-card ${pinpoint ? "has-pinpoint" : ""}`}>
        <div className="selection-card-header">
          <h5 className="selection-card-title">
            <span
              className={`indicator-dot ${pinpoint ? "active-purple" : ""}`}
            />
            Selected Location
          </h5>
          {pinpoint && (
            <button
              onClick={handleClearPinpoint}
              className="selection-card-clear"
            >
              Clear
            </button>
          )}
        </div>

        {pinpoint ? (
          <div className="selection-card-content">
            <div className="selection-info-row">
              <span className="label">Coordinates: </span>
              <span className="value mono">
                {pinpoint.lat.toFixed(6)}, {pinpoint.lng.toFixed(6)}
              </span>
            </div>
            <div className="selection-info-row">
              <span className="label">Address: </span>
              {isLoading ? (
                <span className="value loading-text">Loading...</span>
              ) : (
                <span className="value truncate">{pinpointAddress}</span>
              )}
            </div>
          </div>
        ) : (
          <p className="selection-card-empty">
            Click on the map or search to select a location
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

const LocationInfoForm = ({
  propertyData,
  data,
  onDataChange,
  onBack,
  onNext,
  steps,
  currentStep,
}: LocationFormProps) => {
  const t = useTranslations("AddProperty");
  // Track selected village locally for display
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);

  // Create a fake event object to match AddProperty.tsx handler expectations
  const createFakeEvent = (name: string, value: string) => {
    return {
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>;
  };

  const handleLocationChange = (lat: string, lng: string) => {
    onDataChange(createFakeEvent("latitude", lat));
    onDataChange(createFakeEvent("longitude", lng));
  };

  const handleInputChange = (field: keyof Locationdata, value: string) => {
    onDataChange(createFakeEvent(field, value));
  };

  // Handle village selection
  const handleVillageChange = (
    villageId: string | null,
    village: Village | null,
  ) => {
    onDataChange(createFakeEvent("villageId", villageId || ""));
    setSelectedVillage(village);
  };

  const handleNext = () => {
    onNext();
  };

  // Get coordinates for village selector
  const propertyCoordinates =
    data.latitude && data.longitude
      ? { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }
      : null;

  return (
    <div>
      <div className="upload-main-boxarea">
        <div className="space48" />
        <h4>{t("location_title")}</h4>
        <div className="space32" />

        <div className="input-area">
          <h5>{t("location_address")}</h5>
          <div className="space16" />
          <input
            type="text"
            placeholder="Property Address"
            value={propertyData.address}
            disabled
          />
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("location_country")}</h5>
              <div className="space16" />
              <select
                className="form-select"
                value={propertyData.country}
                disabled
              >
                <option value="Hungary">Hungary</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("location_city")}</h5>
              <div className="space16" />
              <select
                className="form-select"
                value={propertyData.city}
                disabled
              >
                {cities.map((city, index) => (
                  <option key={index} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("location_postal_code")}</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Zip Code"
                value={propertyData.postalCode}
                disabled
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="col-lg-12">
            <div className="space48" />
            <LocationPickerMap
              initialLat={data.latitude}
              initialLng={data.longitude}
              onLocationChange={handleLocationChange}
              defaultCenter={[47.4979, 19.0402]} // Budapest
            />
            <div className="space48" />
          </div>

          {/* Latitude & Longitude */}
          <div className="col-lg-6 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("location_latitude")}</h5>
              <div className="space16" />
              <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                value={data.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("location_longitude")}</h5>
              <div className="space16" />
              <input
                type="text"
                id="longitude"
                placeholder="Longitude"
                value={data.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
              />
            </div>
          </div>

          {/* Village Selector Section */}
          <div className="col-lg-12">
            <div className="space48" />
            <div className="village-section">
              <div className="village-section-header">
                <h4>{t("location_village_info")}</h4>
                <p className="village-section-desc">
                  {t("location_village_desc")}
                </p>
              </div>
              <div className="space24" />

              <VillageSelector
                value={data.villageId || null}
                onChange={handleVillageChange}
                coordinates={propertyCoordinates}
              />
            </div>
            <div className="space30" />
          </div>
        </div>

        <div className="space30" />

        <div className="row">
          <div className="col-lg-12">
            <div className="Forms_navigaion_button_wrapper">
              <button
                type="button"
                className="forms_navigation_back_btn"
                onClick={() => onBack()}
              >
                <span>
                  <i className="fa-solid fa-arrow-left" />
                </span>
                Back
              </button>
              <button
                type="button"
                className="vl-btn1"
                onClick={() => handleNext()}
              >
                {t("description_next", { step: steps[currentStep] })}
                <span className="arrow1 ms-2">
                  <i className="fa-solid fa-arrow-right" />
                </span>
                <span className="arrow2 ms-2">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoForm;
