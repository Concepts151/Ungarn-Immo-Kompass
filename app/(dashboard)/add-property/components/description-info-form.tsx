"use client";
import React from "react";
import cities from "@/data/hu.json";
import "@/app/(dashboard)/add-property/components/css/description-info-form.css";

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

import DocumentUploadAid from "./DocumentUploadAid";

interface DescriptionInfoFormProps {
  data: ListingDescriptionFormData;
  onDataChange: (data: any) => void;
  onNext: () => void;
  steps: string[];
  currentStep: number;
  onDataExtracted?: (data: any) => void;
}

const DescriptionInfoForm = ({
  data,
  onDataChange,
  onNext,
  steps,
  currentStep,
  onDataExtracted,
}: DescriptionInfoFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof ListingDescriptionFormData,
    value: any
  ) => {
    onDataChange({ ...data, [field]: value });
    // Clear error when user starts typing
    console.log(data);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.address.trim()) newErrors.address = "Address is required";
    if (!data.category.trim()) newErrors.category = "Category is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.country.trim()) newErrors.country = "Country is required";
    if (!data.currency) newErrors.currency = "Currency is required";
    if (!data.description.trim()) newErrors.description = "Description is required";
    if (!data.listedIn.trim()) newErrors.listedIn = "Listed in is required";
    if (!data.livingArea.trim())
      newErrors.livingArea = "Living area is required";
    if (!data.lotSize.trim())
      newErrors.lotSize = "Lot size  is required";
    if (!data.numberOfBathrooms.trim())
      newErrors.numberOfBathrooms = "Number of bathrooms is required";
    if (!data.numberOfBedrooms.trim())
      newErrors.numberOfBedrooms = "Number of bedrooms is required";
    if (!data.numberOfRooms.trim())
      newErrors.numberOfRooms = "Number of rooms is required";
    if (!data.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!data.price.trim()) newErrors.price = "Price is required";

    if (!data.title.trim()) newErrors.title = "Title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // onNext();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="">
      <div className="space48" />
      {onDataExtracted && (
        <DocumentUploadAid onDataExtracted={onDataExtracted} />
      )}
      <h4>Property Description</h4>
      <div className="space28" />
      <h5>Title Your Home*</h5>
      <div className="space16" />
      <div className="col-lg-12">
        <div className="input-area">
          <input
            id="title"
            className={errors.title && "input_error"}
            type="text"
            placeholder="Title Name"
            value={data.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          {errors.title && (
              <p className="error_msg">{errors.title}</p>
            )}
        </div>
        <div className="space32" />
        <h5>Description Note*</h5>
        <div className="space16" />
        <div className="input-area">
          <textarea
            id="description"
            className={errors.description && "input_error"}
            placeholder="Your Message"
            value={data.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
           {errors.description && (
              <p className="error_msg">{errors.description}</p>
            )}
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
              className={errors.address && "input_error"}
              placeholder="Enter Address"
              id="address"
              value={data.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            {errors.address && (
              <p className="error_msg">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space16" />
          <h5>Postal Code</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              className={errors.postalCode && "input_error"}
              placeholder="0000"
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
            {errors.postalCode && (
              <p className="error_msg">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>City</h5>
            <div className="space16" />
            <input
              type="text"
              className={errors.city && "input_error"}
              placeholder="City"
              id="city"
              value={data.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            {errors.category && (
              <p className="error_msg">{errors.city}</p>
            )} 
            {/* <select
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
            {errors.category && (
              <p className="error_msg">{errors.category}</p>
            )} */}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Country</h5>
            <div className="space16" />
            <select
              className="form-select"
              value={data.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="Hungary">Hungary</option>
              <option value="Nigeria">Nigeria</option>
            </select>
            {errors.country && (
              <p className="error_msg">{errors.country}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Price</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="number"
              className={errors.price && "input_error"}
              placeholder="000,000.00"
              value={data.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
             {errors.price && (
              <p className="error_msg">{errors.price}</p>
            )}
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
              className="form-select"
              value={data.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            >
              <option value="">Select Currency</option>
              <option value="US Dollar (USD)">US Dollar (USD)</option>
              <option value="Euro (EUR)">Euro (EUR)</option>
              <option value="Hungarian forint (HUF)">
                Hungarian forint (HUF)
              </option>
            </select>
            {errors.currency && (
              <p className="error_msg">{errors.currency}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Lot Size (in m²)</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              className={errors.lotSize && "input_error"}
              placeholder="000"
              value={data.lotSize}
              onChange={(e) => handleInputChange("lotSize", e.target.value)}
            />
          {errors.lotSize && (
              <p className="error_msg">{errors.lotSize}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Living Area (in m²)</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              className={errors.livingArea && "input_error"}
              placeholder="000,000.00"
              value={data.livingArea}
              onChange={(e) => handleInputChange("livingArea", e.target.value)}
            />
            {errors.livingArea && (
              <p className="error_msg">{errors.livingArea}</p>
            )}
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
              className={errors.numberOfRooms && "input_error"}
              placeholder="0"
              value={data.numberOfRooms}
              onChange={(e) =>
                handleInputChange("numberOfRooms", e.target.value)
              }
            />
             {errors.numberOfRooms && (
              <p className="error_msg">{errors.numberOfRooms}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Number of Bedrooms</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              className={errors.numberOfBedrooms && "input_error"}
              placeholder="0"
              value={data.numberOfBedrooms}
              onChange={(e) =>
                handleInputChange("numberOfBedrooms", e.target.value)
              }
            />
             {errors.numberOfBedrooms && (
              <p className="error_msg">{errors.numberOfBedrooms}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="space30" />
          <h5>Number of Bathroom</h5>
          <div className="space16" />
          <div className="input-area">
            <input
              type="text"
              className={errors.numberOfBathrooms && "input_error"}
              placeholder="0"
              value={data.numberOfBathrooms}
              onChange={(e) =>
                handleInputChange("numberOfBathrooms", e.target.value)
              }
            />
             {errors.numberOfBathrooms && (
              <p className="error_msg">{errors.numberOfBathrooms}</p>
            )}
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
              className="form-select"
              value={data.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="Apartment">Apartment</option>
              <option value="Bar">Bar</option>
              <option value="Cafe">Cafe</option>
              <option value="House">House</option>
              <option value="Farm">Farm</option>
            </select>
            {errors.category && (
              <p className="error_msg">{errors.category}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Listed In*</h5>
            <div className="space16" />
            <select
              className="form-select"
              value={data.listedIn}
              onChange={(e) => handleInputChange("listedIn", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.listedIn && (
              <p className="error_msg">{errors.listedIn}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="space30" />
          <div className="input-area">
            <h5>Property Status*</h5>
            <div className="space16" />
            <select
              className="form-select"
              value={data.propertyStatus}
              onChange={(e) =>
                handleInputChange("propertyStatus", e.target.value)
              }
            >
              <option value="Approved">Approved</option>
              <option value="Sale">Sale</option>
            </select>
            {errors.propertyStatus && (
              <p className="error_msg">{errors.propertyStatus}</p>
            )}
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
                className={errors.year && "input_error"}
                value={data.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="YYYY"
              />
               {errors.year && (
              <p className="error_msg">{errors.year}</p>
            )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="space40" />
        <div className="btn-area1 Forms_navigaion_button_wrapper">
          <div className=""></div>
          <button
            type="button"
            className="vl-btn1"
            onClick={() => handleNext()}
          >
            Continue to {steps[currentStep]}
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
