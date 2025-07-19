import { useState } from "react";
import "./listing-edit-modal.css";
import Image from "next/image";
import ImageUpdater from "./micro/update-modal-image-section";
import DescriptionTab from "./micro/update-modal-desc-section";

export default function Modal({
  listing,
  onClose,
  onUpdate,
  fetchListing,
}: {
  listing: any;
  onClose: () => void;
  onUpdate: (updatedData: any) => void;
  fetchListing: () => void;
}) {
  const [activeTab, setActiveTab] = useState("description"); // State for active tab

  const [formData, setFormData] = useState({
    title: listing.basicDetails?.title || "",
    address: listing.basicDetails?.address || "",
    price: listing.basicDetails?.price || "",
    bedroom: listing.basicDetails?.bedroom || "",
    bathroom: listing.basicDetails?.bathroom || "",
    description: listing.description,
    postalCode: listing.basicDetails?.postal_code || "",
    city: listing.basicDetails?.city || "",
    country: listing.basicDetails?.country || "",
    currency: listing.basicDetails?.currency || "",
    lotSize: listing.basicDetails?.lot_size || "",
    livingArea: listing.basicDetails?.living_area || "",
    buildYear: listing.basicDetails?.build_year || "",
    rooms: listing.basicDetails?.rooms || "",
    bedrooms: listing.basicDetails?.bedrooms || "",
    bathrooms: listing.basicDetails?.bathrooms || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData); // Pass updated data to the parent component
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className=" modal-wrapper">
          <div className="space20"></div>
          <h3 className="modal-heading-text ">Edit Listing</h3>
          {/* {JSON.stringify(listing)} */}
          <div className="space20"></div>
          {/* {JSON.stringify(listing)} */}
          <div className="w-full">
            <div className="modal-tabs">
              <button
                className={`tab-button ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>

              <button
                className={`tab-button ${
                  activeTab === "media" ? "active" : ""
                }`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
              <button
                className={`tab-button ${
                  activeTab === "details" ? "active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
            </div>
          </div>
          <div className="w-full" style={{ flex: 1 }}>
            {activeTab === "description" && (
              <DescriptionTab
                formData={formData}
                handleChange={handleChange}
                handleTextAreaChange={handleTextAreaChange}
              />
            )}
            {activeTab === "media" && (
              <ImageUpdater
                listingImages={listing.images}
                listingId={listing.id}
                fetchListings={fetchListing}
              />
            )}
          </div>
          <div className="modal-actions w-full">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="modal-actions-save" type="button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
