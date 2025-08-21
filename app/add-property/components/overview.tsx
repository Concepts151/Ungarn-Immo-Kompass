import React from "react";
import '@/app/add-property/components/css/overview.css';

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

interface OverviewFormProps {
  descriptionData?: ListingDescriptionFormData;
  mediaData?: any;
  locationData?: any;
  detailsData?: any;
  amenitiesData?: any;
  upload: () => void;
  onBack: () => void;
}

const Overview = ({
  descriptionData,
  mediaData,
  locationData,
  detailsData,
  amenitiesData,
  onBack,
  upload,
}: OverviewFormProps) => {
  const handleNext = () => {
    upload();
    // if (validateForm()) {
    //   onNext();
    // }
  };
  return (
    <div className="overview-container">
      <h2>Property Overview</h2>
     {/* page data */}
     {descriptionData && (
        <div className="desc_data_wrapper">
            <h3 className="Desc_data_header">Description</h3>
            <hr />
            <div className="">
                <p className="Desc_data_text">
                    <strong>Title:</strong> {descriptionData.title || "No title provided"}
                </p>
                <p className="Desc_data_text">
                    <strong>Description:</strong> {descriptionData.description || "No description provided"}
                </p>
                <p className="Desc_data_text">
                    <strong>Address:</strong> {descriptionData.address}, {descriptionData.postalCode}, {descriptionData.city}, {descriptionData.country}
                </p>
                <p className="Desc_data_text">
                    <strong>Price:</strong> {descriptionData.price} {descriptionData.currency} 
                </p>
                <p className="Desc_data_text">
                    <strong>Lot Size:</strong> {descriptionData.lotSize} m²
                </p>
                <p className="Desc_data_text">
                    <strong>Living Area:</strong> {descriptionData.livingArea} m²
                </p>
                <p className="Desc_data_text">
                    <strong>Rooms:</strong> {descriptionData.numberOfRooms || "Not specified"}
                </p>
                <p className="Desc_data_text">
                    <strong>Bedrooms:</strong> {descriptionData.numberOfBedrooms || "Not specified"}
                </p>
                <p className="Desc_data_text">
                    <strong>Bathrooms:</strong> {descriptionData.numberOfBathrooms || "Not specified"}
                </p>
            </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className=" Forms_navigaion_button_wrapper">
            <button
              className="forms_navigation_back_btn"
              onClick={() => onBack()}
            >
              <span className="">
                <i className="fa-solid fa-arrow-left" />
              </span>
              Back
            </button>
            <button className="vl-btn1" onClick={() => handleNext()}>
              Upload New Listing
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
  );
};

export default Overview;
