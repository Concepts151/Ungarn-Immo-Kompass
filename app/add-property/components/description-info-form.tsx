"use client";
import React from "react";
import cities from "@/data/hu.json";
import "@/app/add-property/components/css/description-info-form.css";

enum PropertyType {
  HOUSE = "house",
  APARTMENT = "apartment",
  CONDO = "condo",
  VILLA = "villa",
  TOWNHOUSE = "townhouse",
  LAND = "land",
}

enum Currency {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

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

interface DescriptionInfoFormProps {
  data: ListingDescriptionFormData;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

const DescriptionInfoForm = ({
  data,
  onDataChange,
  onNext,
}: DescriptionInfoFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof ListingDescriptionFormData,
    value: any
  ) => {
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
    <div className="">
      <div className="space48" />
      <h4>Property Description</h4>
      <div className="space28" />
      <h5>Title Your Home*</h5>
      <div className="space16" />
      <div className="col-lg-12">
        <div className="input-area">
          <input
            id="title"
            type="text"
            placeholder="Title Name"
            value={data.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="space32" />
        <h5>Description Note*</h5>
        <div className="space16" />
        <div className="input-area">
          <textarea
            id="description"
            placeholder="Your Message"
            value={data.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="space16" />
          <h5>Address</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter Address"
              id="address"
              value={data.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space16" />
          <h5>Postal Code</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="000000"
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>City</h5>
            <div className="space16" />
            <select
              className="form-select"
              value={data.category}
              onChange={(e) => handleInputChange("city", e.target.value)}
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
          <div className="space30" />
          <div className="input-area">
            <h5>Country</h5>
            <div className="space16" />
            <select
              className="nice-select"
              value={data.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            >
              <option value="Hungary">Hungary</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Price</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="number"
              placeholder="000,000.00"
              value={data.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Currency</h5>
            <div className="space16" />
            <select
              className="nice-select"
              value={data.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            >
              <option value="US Dollar (USD)">US Dollar (USD)</option>
              <option value="Euro (EUR)">Euro (EUR)</option>
              <option value="Hungarian forint (HUF)">
                Hungarian forint (HUF)
              </option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Lot Size (in m²)</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="000"
              value={data.lotSize}
              onChange={(e) => handleInputChange("lotSize", e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Living Area (in m²)</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="000,000.00"
              value={data.livingArea}
              onChange={(e) => handleInputChange("livingArea", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Number of Rooms</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="0"
              value={data.numberOfRooms}
              onChange={(e) => handleInputChange("numberOfRooms",e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Number of Bedrooms</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="0"
              value={data.numberOfBedrooms}
              onChange={(e) => handleInputChange("numberOfBedrooms",e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Number of Bathroom</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              placeholder="0"
              value={data.numberOfBathrooms}
              onChange={(e) => handleInputChange("numberOfBathrooms",e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Select Category*</h5>
            <div className="space16" />
            <select
              className="nice-select"
              value={data.category}
              onChange={(e) => handleInputChange("category",e.target.value)}
            >
              <option value="Apartment">Apartment</option>
              <option value="Bar">Bar</option>
              <option value="Cafe">Cafe</option>
              <option value="House">House</option>
              <option value="Farm">Farm</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Listed In*</h5>
            <div className="space16" />
            <select
              className="nice-select"
              value={data.listedIn}
              onChange={(e) => handleInputChange("listedIn",e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Property Status*</h5>
            <div className="space16" />
            <select
              className="nice-select"
              value={data.propertyStatus}
              onChange={(e) => handleInputChange("propertyStatus",e.target.value)}
            >
              <option value="Approved">Approved</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="space30" />
            <div className="input-area">
              <h5>Build Year</h5>
              <div className="space16" />
              <input
                type="text"
                value={data.year}
                onChange={(e) => handleInputChange("year",e.target.value)}
                placeholder="YYYY"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="space40" />
        <div className="btn-area1 Forms_navigaion_button_wrapper">
          <div className=""></div>
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
  );
};

export default DescriptionInfoForm;
