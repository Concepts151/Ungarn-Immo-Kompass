import React from "react";

interface AmenitiesFormProps {
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
}
const AmenitiesForm = ({
  onBack,
  onNext,
  steps,
  currentStep,
}: AmenitiesFormProps) => {
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
        <h4>Amenities*</h4>
        <div className="space16" />
        <div className="row">
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Air Condition </span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Selling Height </span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Heating</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Window Type</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Elevator</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Fire Place</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Pet Friendly</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Parking</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Disabled Access</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Floor</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Renovation</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Cable TV</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Furnishing</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Garden</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">Wifi</span>
              </label>
            </fieldset>
          </div>
        </div>
        <div className="space40" />
        <div className="row">
          <div className="col-lg-12">
            <div className=" Forms_navigaion_button_wrapper">
              <button
                type="button"
                className="forms_navigation_back_btn"
                onClick={() => onBack()}
              >
                <span className="">
                  <i className="fa-solid fa-arrow-left" />
                </span>
                Back
              </button>
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
      </div>
    </div>
  );
};

export default AmenitiesForm;
