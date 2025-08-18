import React from "react";
import cities from "@/data/hu.json";

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
  longitude: number;
  latitude: number;
}
interface LocationFormProps {
  propertyData: ListingDescriptionFormData;
  data: Locationdata;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationInfoForm = ({
  propertyData,
  data,
  onDataChange,
  onBack,
  onNext,
}: LocationFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof Locationdata, value: any) => {
    onDataChange({ ...data, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };
  const handleNext = () => {
    onNext();
    // if (validateForm()) {
    //   onNext();
    // }
  };
  return (
    <div>
      <div className="upload-main-boxarea">
        <div className="space48" />
        <h4>Listing Property Location</h4>
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
                //   onChange={(e) => handleInputChange("country", e.target.value)}
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
                value={propertyData.category}
                //  onChange={(e) => handleInputChange("city", e.target.value)}
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
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd"
                  width={600}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
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
                onChange={(e) => handleInputChange("latitude", Number(e.target.value))}
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
                    id="latitude"
                placeholder="longitude*"
                value={data.longitude}
                onChange={(e) => handleInputChange("longitude", Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="space30" />
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
                Continue to Media
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

export default LocationInfoForm;
