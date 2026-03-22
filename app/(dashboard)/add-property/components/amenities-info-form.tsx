import React from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("AddProperty");
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
        <h4>{t("amenities_title")}</h4>
        <div className="space16" />
        <div className="row">
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_air_condition")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_ceiling_height")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_heating")}</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_window_type")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_elevator")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_fire_place")}</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_pet_friendly")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_parking")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_disabled_access")}</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_floor")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_renovation")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_cable_tv")}</span>
              </label>
            </fieldset>
          </div>
          <div className="col-lg-2 col-md-6">
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_furnishing")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_garden")}</span>
              </label>
            </fieldset>
            <fieldset className="checkbox-item style-1">
              <label>
                <input type="checkbox" />
                <span className="btn-checkbox" />
                <span className="text-4">{t("amenity_wifi")}</span>
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
                {t("description_next", { step: steps[currentStep] })}
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
