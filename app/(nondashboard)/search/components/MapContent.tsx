import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for property markers
const createCustomIcon = () => {
  return L.icon({
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
};

// Format price with currency
const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "HUF",
    maximumFractionDigits: 0,
  }).format(price);
};

// Format property type
const formatPropertyType = (type: string) => {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Auto-zoom component to fit all markers in view
function AutoZoomToMarkers({ markers }: { markers: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!markers || markers.length === 0) {
      // If no markers, show a default view
      map.setView([47.4979, 19.0402], 10);
      return;
    }

    // Single marker - zoom in closer
    if (markers.length === 1) {
      map.setView(markers[0].position, 15);
      return;
    }

    // Multiple markers - fit all in view
    const bounds = L.latLngBounds(markers.map((m) => m.position));

    // Fit bounds with padding for better visibility
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 16, // Don't zoom in too close even if markers are very close
      animate: true,
      duration: 0.5,
    });

    // Ensure we don't zoom out too far
    setTimeout(() => {
      if (map.getZoom() < 8) {
        map.setZoom(8);
      }
    }, 100);
  }, [markers, map]);

  // Also handle window resize to refit markers
  useEffect(() => {
    const handleResize = () => {
      if (markers && markers.length > 1) {
        const bounds = L.latLngBounds(markers.map((m) => m.position));
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 16,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [markers, map]);

  return null;
}

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
  const [location] = useState<[number, number]>([47.4979, 19.0402]); // Default to Budapest

  // Create custom icon
  const customIcon = useMemo(() => createCustomIcon(), []);

  console.log("Properties/Exposes in Map:", properties);

  // Convert exposes to format needed for markers
  const markers = useMemo(() => {
    if (!properties) return [];

    return properties
      .filter((expose: any) => {
        // Filter out exposes without valid coordinates
        return (
          expose.location?.latitude &&
          expose.location?.longitude &&
          !isNaN(expose.location.latitude) &&
          !isNaN(expose.location.longitude) 
          &&
          expose.status === "PUBLISHED"
        ); // Only show published properties
      })
      .map((expose: any) => ({
        id: expose.id,
        position: [expose.location.latitude, expose.location.longitude] as [
          number,
          number
        ],
        // Basic info
        propertyType: expose.basic?.propertyType || "HOUSE",
        address: expose.basic?.address || "",
        city: expose.basic?.city || "",
        county: expose.basic?.county || "",
        postalCode: expose.basic?.postalCode || "",
        // Price info
        price: expose.basic?.price || 0,
        currency: expose.basic?.currency || "HUF",
        // Property details
        bedrooms: expose.basic?.bedrooms || 0,
        bathrooms: expose.basic?.bathrooms || 0,
        rooms: expose.basic?.rooms || 0,
        livingArea: expose.basic?.livingArea || 0,
        lotSize: expose.basic?.lotSize || 0,
        buildYear: expose.basic?.buildYear || null,
        // Additional info
        heatingType: expose.details?.heatingType || "",
        internetType: expose.details?.internetType || "",
        hasEnergyCertificate: expose.details?.energyCertificate || false,
        energyClass: expose.details?.energyClass || "",
        // Media
        thumbnailUrl:
          expose.media?.[0]?.thumbnailUrl || expose.media?.[0]?.url || null,
      }));
  }, [properties]);


  // console.log("Markers for map:", markers);
  

  // Set initial center based on first marker or default location
  const mapCenter = markers.length > 0 ? markers[0].position : location;

  // Calculate initial bounds if we have markers
  const initialBounds = useMemo(() => {
    if (markers.length === 0) return undefined;
    return markers.map((m: any) => m.position);
  }, [markers]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="text-gray-600">Loading properties...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="text-red-600">Error loading properties</div>
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={false}
        zoomControl={true}
        className=""
        style={{ height: "100%" }}
        bounds={
          markers.length > 0 ? markers.map((m: any) => m.position) : undefined
        }
        boundsOptions={{ padding: [50, 50], maxZoom: 16 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Auto-zoom to fit all markers */}
        <AutoZoomToMarkers markers={markers} />

        {/* Render property markers */}
        {markers.map((marker: any) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup className="property-popup">
              <div className="p-2 min-w-[250px] max-w-[300px]">
                {/* Property image if available */}
                {marker.thumbnailUrl && (
                  <img
                    src={marker.thumbnailUrl}
                    alt={marker.address}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}

                {/* Property type badge */}
                <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mb-2">
                  {formatPropertyType(marker.propertyType)}
                </div>

                {/* Address */}
                <h3 className="font-bold text-base mb-1">{marker.address}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {marker.postalCode} {marker.city}, {marker.county}
                </p>

                {/* Price */}
                <p className="text-xl font-bold text-green-600 mb-2">
                  {formatPrice(marker.price, marker.currency)}
                </p>

                {/* Property details grid */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 border-t pt-2">
                  {marker.rooms > 0 && (
                    <div>
                      <span className="font-medium">Rooms:</span> {marker.rooms}
                    </div>
                  )}
                  {marker.bedrooms > 0 && (
                    <div>
                      <span className="font-medium">Bedrooms:</span>{" "}
                      {marker.bedrooms}
                    </div>
                  )}
                  {marker.bathrooms > 0 && (
                    <div>
                      <span className="font-medium">Bathrooms:</span>{" "}
                      {marker.bathrooms}
                    </div>
                  )}
                  {marker.livingArea > 0 && (
                    <div>
                      <span className="font-medium">Living area:</span>{" "}
                      {marker.livingArea} m²
                    </div>
                  )}
                  {marker.lotSize > 0 && (
                    <div>
                      <span className="font-medium">Lot size:</span>{" "}
                      {marker.lotSize} m²
                    </div>
                  )}
                  {marker.buildYear && (
                    <div>
                      <span className="font-medium">Built:</span>{" "}
                      {marker.buildYear}
                    </div>
                  )}
                </div>

                {/* Additional features */}
                {(marker.heatingType ||
                  marker.internetType ||
                  marker.energyClass) && (
                  <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                    {marker.heatingType && (
                      <div>Heating: {marker.heatingType}</div>
                    )}
                    {marker.internetType && (
                      <div>Internet: {marker.internetType}</div>
                    )}
                    {marker.energyClass && (
                      <div>Energy class: {marker.energyClass}</div>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Show message if no properties */}
        {!isLoading && markers.length === 0 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded shadow-lg z-[1000]">
            No published properties found with valid coordinates
          </div>
        )}
      </MapContainer>
    </>
  );
};

export default MapContent;
