"use client";
import dynamic from "next/dynamic";
import React, { useState, useMemo, useEffect } from "react";
import { useGetPropertiesQuery } from "@/state/api";
import { useAppSelector } from "@/state/redux";

// Dynamically import the entire Map component to avoid SSR issues
const MapContent = dynamic(
  () => import("./MapContent"),
  { 
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
          backgroundColor: "#f3f4f6"
        }}
      >
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }
);

const Map = () => {
  const filters = useAppSelector((state) => state.global.filters);
  const { data: properties, isLoading, error } = useGetPropertiesQuery(filters);

  return (
    <div
      className=""
      style={{
        position: "sticky",
        top: "100px",
        height: "85vh",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >
      <MapContent 
        properties={properties} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
};

export default Map;