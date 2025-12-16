"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import cities from "@/data/hu.json";
import "@/app/(dashboard)/add-property/components/css/location-picker.css";
import "leaflet/dist/leaflet.css"

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
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

interface UpdateLocationFormProps {
  propertyData: ListingDescriptionFormData;
  data: Locationdata;
  onDataChange: (data: Locationdata) => void;
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
            debouncedQuery
          )}&limit=5&addressdetails=1`
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
      result.display_name
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
  const [ReactLeaflet, setReactLeaflet] =
    useState<typeof import("react-leaflet") | null>(null);

  const [pinpoint, setPinpoint] = useState<{ lat: number; lng: number } | null>(
    initialLat && initialLng && initialLat !== "0" && initialLng !== "0"
      ? { lat: parseFloat(initialLat), lng: parseFloat(initialLng) }
      : null
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
        const leaflet = await import("leaflet");
        const reactLeaflet = await import("react-leaflet");
        

        // Fix default icon issue
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        setL(leaflet);
        setReactLeaflet(reactLeaflet);
        setLeafletLoaded(true);
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    }

    loadLeaflet();
  }, []);

  // Reverse geocode to get address
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setPinpointAddress(data.display_name || "Unknown location");
    } catch (error) {
      console.error("Reverse geocode error:", error);
      setPinpointAddress("Unable to fetch address");
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
    [onLocationChange, reverseGeocode]
  );

  // Handle search selection
  const handleSearchSelect = useCallback(
    (lat: number, lng: number, address: string) => {
      setPinpoint({ lat, lng });
      setPinpointAddress(address);
      setFlyToPosition({ lat, lng });
      onLocationChange(lat.toString(), lng.toString());
    },
    [onLocationChange]
  );

  // Clear pinpoint
  const handleClearPinpoint = useCallback(() => {
    setPinpoint(null);
    setPinpointAddress("");
    onLocationChange("0", "0");
  }, [onLocationChange]);

  // Get instruction text
  const getInstructionText = () => {
    if (pinpoint) {
      return "Click elsewhere on the map to change location";
    }
    return "Click on the map to select a location";
  };

  if (!leafletLoaded || !L || !ReactLeaflet) {
    return (
      <div className="map-loading-container">
        <div className="map-loading-spinner" />
        <p>Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = ReactLeaflet;

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
        map.flyTo([flyToPosition.lat, flyToPosition.lng], 13, { duration: 1.5 });
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
          center={
            pinpoint
              ? [pinpoint.lat, pinpoint.lng]
              : defaultCenter
          }
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
            <Marker position={[pinpoint.lat, pinpoint.lng]} icon={defaultIcon} />
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

const UpdateLocationForm = ({
  propertyData,
  data,
  onDataChange,
  onBack,
  onNext,
  steps,
  currentStep,
}: UpdateLocationFormProps) => {
  // Handle location change from map
  const handleLocationChange = (lat: string, lng: string) => {
    onDataChange({
      latitude: lat,
      longitude: lng,
    });
  };

  // Handle manual input changes
  const handleInputChange = (field: keyof Locationdata, value: string) => {
    onDataChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <div className="upload-main-boxarea">
        <div className="space48" />
        <h4>Update Property Location</h4>
        <div className="space32" />

        <div className="input-area">
          <h5>Address</h5>
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
              <h5>Country</h5>
              <div className="space16" />
              <select
                className="nice-select"
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
              <h5>City</h5>
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
              <h5>ZIP Code*</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Zip Code"
                value={propertyData.postalCode}
                disabled
              />
            </div>
          </div>

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

          <div className="col-lg-6 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Latitude</h5>
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
              <h5>Longitude</h5>
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
                onClick={() => onNext()}
              >
                Continue to {steps[currentStep]}
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

export default UpdateLocationForm;