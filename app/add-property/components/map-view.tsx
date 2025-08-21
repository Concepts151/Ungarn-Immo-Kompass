import React from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = () => {
  return (
    <div>
      <Map
        mapboxAccessToken="REMOVED_MAPBOX_SECRET"
        initialViewState={{
          longitude:  8.6753,
          latitude:  9.0820,
          zoom: 5.5,
        }}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker latitude={6.5244} longitude={3.3792} color="red" anchor="bottom">
            
        </Marker>
      </Map>
    </div>
  );
};

export default MapView;
