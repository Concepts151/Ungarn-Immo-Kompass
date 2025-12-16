"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ListingFormData {
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

interface DetailsFormData {
  material: string;
  roofType: string;
  roofCondition: string;
  insulation: string;
  windows: string;
  windowsAge: string;
  hasRollerShutters: boolean;
  heatingType: string;
  heatingCondition: string;
  electricCondition: string;
  waterCondition: string;
  energyCertificate: boolean;
  energyClass: string;
  energyConsumption: string;
  internetType: string;
  internetSpeed: string;
  monthlyCosts: {
    electricity: number;
    water: number;
    gas: number;
    trash: number;
    tax: number;
  };
  gardenDesc: string;
}

interface Locationdata {
  longitude: string;
  latitude: string;
}

interface AddOverviewProps {
  descriptionData: ListingFormData;
  mediaData: string[];
  videoData?: string[];
  locationData: Locationdata;
  detailsData: DetailsFormData;
  upload: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const AddOverview: React.FC<AddOverviewProps> = ({
  descriptionData,
  mediaData,
  videoData = [],
  locationData,
  detailsData,
  upload,
  onBack,
  isLoading = false,
}) => {
  const formatCurrency = (value: string, currency: string) => {
    const num = parseInt(value) || 0;
    const currencyCode = currency.includes("EUR") ? "EUR" : "HUF";
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      HOUSE: "House",
      APARTMENT: "Apartment",
      FARMHOUSE: "Farmhouse",
      Farm: "Farm",
      Bar: "Bar",
      Cafe: "Cafe",
    };
    return labels[category] || category;
  };

  return (
    <div className="upload-main-boxarea">
      <div className="space48" />
      <h4>Review & Create Property</h4>
      <p className="text-muted">
        Please review all the information before creating your property listing.
      </p>
      <div className="space32" />

      {/* Basic Information */}
      <div className="overview-section">
        <h5 className="overview-section-title">
          <span className="section-number">1</span>
          Basic Information
        </h5>
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-label">Title</span>
            <span className="overview-value">{descriptionData.title || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Category</span>
            <span className="overview-value">{getCategoryLabel(descriptionData.category) || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Price</span>
            <span className="overview-value highlight">
              {formatCurrency(descriptionData.price, descriptionData.currency)}
            </span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Status</span>
            <span className="overview-value">{descriptionData.propertyStatus || "—"}</span>
          </div>
        </div>

        <div className="overview-item full-width">
          <span className="overview-label">Description</span>
          <span className="overview-value description">
            {descriptionData.description || "No description provided"}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="overview-section">
        <h5 className="overview-section-title">
          <span className="section-number">2</span>
          Location
        </h5>
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-label">Address</span>
            <span className="overview-value">{descriptionData.address || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">City</span>
            <span className="overview-value">{descriptionData.city || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Country</span>
            <span className="overview-value">{descriptionData.country || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Postal Code</span>
            <span className="overview-value">{descriptionData.postalCode || "—"}</span>
          </div>
          {locationData.latitude !== "0" && locationData.longitude !== "0" && (
            <div className="overview-item">
              <span className="overview-label">Coordinates</span>
              <span className="overview-value mono">
                {parseFloat(locationData.latitude).toFixed(6)}, {parseFloat(locationData.longitude).toFixed(6)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="overview-section">
        <h5 className="overview-section-title">
          <span className="section-number">3</span>
          Property Details
        </h5>
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-label">Lot Size</span>
            <span className="overview-value">{descriptionData.lotSize || "—"} m²</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Living Area</span>
            <span className="overview-value">{descriptionData.livingArea || "—"} m²</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Rooms</span>
            <span className="overview-value">{descriptionData.numberOfRooms || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Bedrooms</span>
            <span className="overview-value">{descriptionData.numberOfBedrooms || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Bathrooms</span>
            <span className="overview-value">{descriptionData.numberOfBathrooms || "—"}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Year Built</span>
            <span className="overview-value">{descriptionData.year || "—"}</span>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      {detailsData.heatingType && (
        <div className="overview-section">
          <h5 className="overview-section-title">
            <span className="section-number">4</span>
            Technical Details
          </h5>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-label">Material</span>
              <span className="overview-value">{detailsData.material || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Heating Type</span>
              <span className="overview-value">{detailsData.heatingType || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Heating Condition</span>
              <span className="overview-value">{detailsData.heatingCondition || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Windows</span>
              <span className="overview-value">{detailsData.windows || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Energy Class</span>
              <span className="overview-value">{detailsData.energyClass || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Internet</span>
              <span className="overview-value">
                {detailsData.internetType || "—"}
                {detailsData.internetSpeed && ` (${detailsData.internetSpeed} Mbps)`}
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Roof Type</span>
              <span className="overview-value">{detailsData.roofType || "—"}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Insulation</span>
              <span className="overview-value">{detailsData.insulation || "—"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Media */}
      <div className="overview-section">
        <h5 className="overview-section-title">
          <span className="section-number">5</span>
          Media
        </h5>
        
        {/* Images */}
        <div className="media-subsection">
          <h6 className="media-subsection-title">
            <i className="fa-solid fa-image" style={{ marginRight: 8 }} />
            Images ({mediaData.length})
          </h6>
          <div className="overview-media-grid">
            {mediaData.length > 0 ? (
              mediaData.slice(0, 6).map((url, index) => (
                <div key={index} className="overview-media-item">
                  <img src={url} alt={`Property ${index + 1}`} />
                </div>
              ))
            ) : (
              <p className="text-muted no-media">No images uploaded</p>
            )}
          </div>
          {mediaData.length > 6 && (
            <p className="text-muted mt-2">+{mediaData.length - 6} more images</p>
          )}
        </div>

        {/* Videos */}
        {videoData.length > 0 && (
          <div className="media-subsection" style={{ marginTop: 24 }}>
            <h6 className="media-subsection-title">
              <i className="fa-solid fa-video" style={{ marginRight: 8 }} />
              Videos ({videoData.length})
            </h6>
            <div className="overview-video-grid">
              {videoData.slice(0, 4).map((url, index) => (
                <div key={index} className="overview-video-item">
                  <video src={url} controls preload="metadata">
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-overlay">
                    <i className="fa-solid fa-play" />
                  </div>
                </div>
              ))}
            </div>
            {videoData.length > 4 && (
              <p className="text-muted mt-2">+{videoData.length - 4} more videos</p>
            )}
          </div>
        )}

        {mediaData.length === 0 && videoData.length === 0 && (
          <div className="no-media-warning">
            <i className="fa-solid fa-exclamation-triangle" />
            <p>No media uploaded. Consider adding images or videos to attract more buyers.</p>
          </div>
        )}
      </div>

      <div className="space30" />

      {/* Navigation Buttons */}
      <div className="row">
        <div className="col-lg-12">
          <div className="Forms_navigaion_button_wrapper">
            <button
              type="button"
              className="forms_navigation_back_btn"
              onClick={onBack}
              disabled={isLoading}
            >
              <span>
                <i className="fa-solid fa-arrow-left" />
              </span>
              Back
            </button>
            <button
              type="button"
              className="vl-btn1"
              onClick={upload}
              disabled={isLoading}
              style={{ 
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Property...
                </>
              ) : (
                <>
                  Create Property
                  <span className="arrow1 ms-2">
                    <i className="fa-solid fa-check" />
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview-section {
          background: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid #e5e7eb;
        }

        .overview-section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .section-number {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #31543a 0%, #4a7c59 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .overview-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .overview-item.full-width {
          grid-column: 1 / -1;
          margin-top: 16px;
        }

        .overview-label {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .overview-value {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        .overview-value.highlight {
          color: #31543a;
          font-size: 18px;
          font-weight: 700;
        }

        .overview-value.description {
          color: #4b5563;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .overview-value.mono {
          font-family: monospace;
          font-size: 13px;
          background: #e5e7eb;
          padding: 4px 8px;
          border-radius: 4px;
          width: fit-content;
        }

        .overview-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }

        .overview-media-item {
          aspect-ratio: 4/3;
          border-radius: 8px;
          overflow: hidden;
          background: #e5e7eb;
        }

        .overview-media-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-subsection {
          margin-bottom: 16px;
        }

        .media-subsection-title {
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }

        .overview-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .overview-video-item {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: #1f2937;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .overview-video-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overview-video-item .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .overview-video-item:hover .video-overlay {
          opacity: 1;
        }

        .overview-video-item .video-overlay i {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1f2937;
          font-size: 18px;
        }

        .no-media {
          grid-column: 1 / -1;
          padding: 20px;
          text-align: center;
        }

        .no-media-warning {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          color: #92400e;
        }

        .no-media-warning i {
          font-size: 20px;
          color: #f59e0b;
        }

        .no-media-warning p {
          margin: 0;
          font-size: 14px;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: 1fr 1fr;
          }

          .overview-media-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .overview-video-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .overview-grid {
            grid-template-columns: 1fr;
          }

          .overview-media-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default AddOverview;