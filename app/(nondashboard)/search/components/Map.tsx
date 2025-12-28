"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useGetPropertiesQuery } from "@/state/api";
import { useAppSelector } from "@/state/redux";

// Dynamically import MapContent to avoid SSR issues with Leaflet
const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "sticky",
        top: "100px",
        height: "85vh",
        overflow: "hidden",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "4px solid #e5e7eb",
            borderTopColor: "#ed8438",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <div style={{ color: "#6b7280", fontSize: "16px", fontWeight: 500 }}>
          Loading map...
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  ),
});

const Map = () => {
  const filters = useAppSelector((state) => state.global.filters);
  const { data: properties, isLoading, error } = useGetPropertiesQuery(filters);

  return (
    <div
      style={{
        position: "sticky",
        top: "100px",
        height: "85vh",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <MapContent properties={properties} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Map;