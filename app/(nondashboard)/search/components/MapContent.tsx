import React, { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "./map.css";
import Link from "next/link";

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatPrice = (price: number, currency: string): string => {
  if (currency === "HUF") {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1).replace(/\.0$/, "")} M Ft`;
    }
    return `${price.toLocaleString()} Ft`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatPriceShort = (price: number, currency: string): string => {
  if (currency === "HUF") {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}k`;
    }
    return `${price}`;
  }

  if (price >= 1000000) {
    return `€${(price / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (price >= 1000) {
    return `€${(price / 1000).toFixed(0)}k`;
  }
  return `€${price}`;
};

const formatPropertyType = (type: string): string => {
  const typeMap: Record<string, string> = {
    HOUSE: "House",
    APARTMENT: "Apartment",
    CONDO: "Condo",
    TOWNHOUSE: "Townhouse",
    LAND: "Land",
    COMMERCIAL: "Commercial",
    VILLA: "Villa",
    FARM: "Farm",
    COTTAGE: "Cottage",
  };
  return (
    typeMap[type] ||
    type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
};

// ============================================
// CUSTOM MARKER ICONS
// ============================================

const createPriceMarkerIcon = (price: number, currency: string) => {
  const priceText = formatPriceShort(price, currency);

  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div class="price-marker-container">
        <div class="price-marker-tag">${priceText}</div>
        <div class="price-marker-arrow"></div>
      </div>
    `,
    iconSize: [80, 45],
    iconAnchor: [40, 45],
    popupAnchor: [0, -45],
  });
};

const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  let size = "small";
  let dimensions = 40;

  if (count >= 10 && count < 30) {
    size = "medium";
    dimensions = 50;
  } else if (count >= 30) {
    size = "large";
    dimensions = 60;
  }

  return L.divIcon({
    html: `<div class="cluster-marker cluster-${size}"><span>${count}</span></div>`,
    className: "custom-cluster-icon",
    iconSize: L.point(dimensions, dimensions),
  });
};

// ============================================
// AUTO ZOOM COMPONENT
// ============================================

function AutoZoomToMarkers({ markers }: { markers: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!markers || markers.length === 0) {
      map.setView([47.1625, 19.5033], 7);
      return;
    }

    if (markers.length === 1) {
      map.setView(markers[0].position, 14);
      return;
    }

    const bounds = L.latLngBounds(markers.map((m) => m.position));
    map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 15,
      animate: true,
      duration: 0.5,
    });
  }, [markers, map]);

  return null;
}

// ============================================
// PROPERTY POPUP COMPONENT
// ============================================

const PropertyPopup: React.FC<{ marker: any }> = ({ marker }) => {
  return (
    <div className="popup-container">
      {marker.thumbnailUrl ? (
        <div className="popup-image-container">
          <img
            src={marker.thumbnailUrl}
            alt={marker.address}
            className="popup-image"
          />
          <span className="popup-badge">
            {formatPropertyType(marker.propertyType)}
          </span>
        </div>
      ) : (
        <div className="popup-no-image">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 21h18M3 7v14M21 7v14M6 21V10M18 21V10M6 10h12M6 10V7l6-4 6 4v3" />
          </svg>
        </div>
      )}

      <div className="popup-content">
        <div className="popup-price">
          {formatPrice(marker.price, marker.currency)}
        </div>

        <div className="popup-address">{marker.address}</div>
        <div className="popup-location">
          {marker.postalCode} {marker.city}, {marker.county}
        </div>

        <div className="popup-details">
          {marker.bedrooms > 0 && (
            <div className="popup-detail-item">
              <svg
                className="popup-detail-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21V7l9-4 9 4v14M9 21V10h6v11" />
              </svg>
              <span>{marker.bedrooms} beds</span>
            </div>
          )}
          {marker.bathrooms > 0 && (
            <div className="popup-detail-item">
              <svg
                className="popup-detail-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12h16v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5zM6 12V5a2 2 0 012-2h1" />
              </svg>
              <span>{marker.bathrooms} baths</span>
            </div>
          )}
          {marker.livingArea > 0 && (
            <div className="popup-detail-item">
              <svg
                className="popup-detail-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span>{marker.livingArea} m²</span>
            </div>
          )}
        </div>

        <Link href={`/property/${marker.id}`} className="popup-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

// ============================================
// RESET VIEW BUTTON
// ============================================

const ResetViewButton: React.FC<{ markers: any[] }> = ({ markers }) => {
  const map = useMap();

  const handleReset = () => {
    if (!markers || markers.length === 0) {
      map.setView([47.1625, 19.5033], 7);
      return;
    }

    if (markers.length === 1) {
      map.setView(markers[0].position, 14, { animate: true });
      return;
    }

    const bounds = L.latLngBounds(markers.map((m) => m.position));
    map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 15,
      animate: true,
      duration: 0.5,
    });
  };

  return (
    <button
      onClick={handleReset}
      className="map-reset-button"
      title="View all properties"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span>View All</span>
    </button>
  );
};

// ============================================
// PROPERTY MARKER WITH ZOOM ON CLICK
// ============================================

const PropertyMarker: React.FC<{ marker: any }> = ({ marker }) => {
  const map = useMap();

  const handleClick = () => {
    map.setView(marker.position, 16, {
      animate: true,
      duration: 0.5,
    });
  };

  return (
    <Marker
      position={marker.position}
      icon={createPriceMarkerIcon(marker.price, marker.currency)}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup
        className="custom-property-popup"
        closeButton={true}
        maxWidth={320}
        minWidth={280}
      >
        <PropertyPopup marker={marker} />
      </Popup>
    </Marker>
  );
};

// ============================================
// MAIN MAP CONTENT COMPONENT
// ============================================

interface MapContentProps {
  properties: any;
  isLoading: boolean;
  error: any;
}

const MapContent: React.FC<MapContentProps> = ({
  properties,
  isLoading,
  error,
}) => {
  const defaultCenter: [number, number] = [47.1625, 19.5033];

  const markers = useMemo(() => {
    if (!properties) return [];

    return properties
      .filter((expose: any) => {
        return (
          expose.location?.latitude &&
          expose.location?.longitude &&
          !isNaN(expose.location.latitude) &&
          !isNaN(expose.location.longitude) &&
          expose.status === "PUBLISHED"
        );
      })
      .map((expose: any) => ({
        id: expose.id,
        position: [expose.location.latitude, expose.location.longitude] as [
          number,
          number
        ],
        propertyType: expose.basic?.propertyType || "HOUSE",
        address: expose.basic?.address || "",
        city: expose.basic?.city || "",
        county: expose.basic?.county || "",
        postalCode: expose.basic?.postalCode || "",
        price: expose.basic?.price || 0,
        currency: expose.basic?.currency || "HUF",
        bedrooms: expose.basic?.bedrooms || 0,
        bathrooms: expose.basic?.bathrooms || 0,
        rooms: expose.basic?.rooms || 0,
        livingArea: expose.basic?.livingArea || 0,
        lotSize: expose.basic?.lotSize || 0,
        buildYear: expose.basic?.buildYear || null,
        thumbnailUrl:
          expose.media?.[0]?.thumbnailUrl || expose.media?.[0]?.url || null,
      }));
  }, [properties]);

  const mapCenter = markers.length > 0 ? markers[0].position : defaultCenter;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="map-loading-overlay">
          <div className="map-loading-content">
            <div className="map-spinner" />
            <div className="map-loading-text">Loading properties...</div>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="map-error-overlay">
          <div className="map-error-content">
            <svg
              className="map-error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <div className="map-error-text">Error loading properties</div>
          </div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ height: "100%", width: "100%", borderRadius: "20px" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <AutoZoomToMarkers markers={markers} />

        {/* Reset View Button */}
        <ResetViewButton markers={markers} />

        {/* Clustered Markers */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          disableClusteringAtZoom={16}
        >
          {markers.map((marker: any) => (
            <PropertyMarker key={marker.id} marker={marker} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* No Properties Message */}
      {!isLoading && !error && markers.length === 0 && (
        <div className="map-no-properties">
          <i className="fa-solid fa-map-marker-alt"></i>
          <p>No properties found in this area</p>
        </div>
      )}
    </div>
  );
};

export default MapContent;