import React from "react";

export interface Village {
  id: string;
  name: string;
  county: string;
  population: number;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  status: "PUBLISHED" | "DRAFT" | string;
  infrastructure: Infrastructure;
  internet: InternetInfo;
  transport: TransportInfo;
  community: CommunityInfo;
  leisure: LeisureInfo;
  links: VillageLink[];
  exposes: Expose[];
}

export interface Infrastructure {
  villageId: string;
  hasGroceryStore: boolean;
  hasSupermarket: boolean;
  supermarketName: string | null;
  storeDistanceKm: number;
  hasWeeklyMarket: boolean;
  hasBaker: boolean;
  hasButcher: boolean;
  hasHouseDoctor: boolean;
  doctorHours: string | null;
  doctorGerman: boolean;
  nextSpecialistKm: number;
  nextHospitalKm: number;
  hasPharmacy: boolean;
  pharmacyHours: string | null;
  hasDentist: boolean;
  dentistGerman: boolean;
  hasPost: boolean;
  hasAtm: boolean;
  hasBank: boolean;
  bankName: string | null;
  hasKindergarten: boolean;
  kindergartenInfo: string | null;
  hasPrimarySchool: boolean;
  primarySchoolInfo: string | null;
  hasSecondarySchool: boolean;
  secondarySchoolInfo: string | null;
  restaurantsCount: number;
  restaurantInfo: string | null;
}

export interface InternetInfo {
  villageId: string;
  typicalSpeed: number;
  internetTypes: string[];
  mobileCoverage: string;
}

export interface TransportInfo {
  villageId: string;
  busRoutes: string;
  busFrequency: string;
  trainStation: string | null;
  trainDistanceKm: number;
  motorwayDistanceKm: number;
}

export interface CommunityInfo {
  villageId: string;
  germanCommunityCount: number;
  associations: string | null;
  festivals: string | null;
  atmosphere: string | null;
}

export interface LeisureInfo {
  villageId: string;
  nearLakes: boolean;
  hikingTrails: boolean;
  bicyclePaths: boolean;
  spaDistanceKm: number;
  culturalSites: string | null;
  nearestTownDistanceKm: number;
}

export interface VillageLink {
  id: string;
  villageId: string;
  linkType: "WIKIPEDIA" | "OTHER" | string;
  url: string;
}

export interface Expose {
  exposeId: string;
  title: string;
  description: string;
  propertyType: "APARTMENT" | "HOUSE" | "LAND" | string;
  address: string;
  postalCode: string;
  city: string;
  county: string;
  villageId: string;
  price: number;
  currency: string;
  lotSize: number;
  livingArea: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  buildYear: number;
  lastRenovation: number | null;
}

const VillageSection = ({ village }: { village: Village }) => {
  return (
    <>
      <h3>Everything You Need, Just Steps Away</h3>
      <div className="space12" />
      <div className="row">
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span>Village:</span> {village.name}, {village.county}
              </p>
              <p>
                <span>Village description:</span> {village.description}
              </p>
              <p>
                <span>Village Population:</span> {village.population}
              </p>
              <p>
                <span>Village association:</span>{" "}
                {village.community.associations}
              </p>
              <p>
                <span>Village atmosphere:</span> {village.community.atmosphere}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span>Village Amenities</span>
              </p>
              <p>
                <span>Banks: </span> {village.infrastructure.bankName || "N/A"}
              </p>
              <p>
                <span>Super Markets: </span> {village.infrastructure.supermarketName|| "N/A"}
              </p>
              <p>
                <span>weekly Markets: </span> {village.infrastructure.hasWeeklyMarket ? "Available" : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span>Healthcare: </span> Nearby Hospitals and Clinic.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span> Transport:</span> Metro, Bus Station, Highway &amp;
                Nearby International Airport.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span>Shopping &amp; Entertainment: </span> Malls, Markets,
                Entertainment Centers.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="others-box">
            <img src="/assets/img/icons/check1.svg" alt="housa" />
            <div className="text">
              <p>
                <span>Park &amp; Recreation: </span> Parks Sport Center, Fitness
                Club, Swimming Center.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VillageSection;
