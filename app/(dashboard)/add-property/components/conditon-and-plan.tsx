"use client";
import React from "react";
import { useTranslations } from "next-intl";

export interface ExposeCondition {
  structureRating: number;
  electricRating: number;
  heatingRating: number;
  damageDescription: string;
  renovationNeeded: string;
  additionalNotes?: string | null;
}

interface ConditionsProps {
  data: ExposeCondition;
  onConditionData: (data: ExposeCondition) => void;
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
  floorPlanFiles?: File[];
  floorPlanUrls?: string[];
  onFloorPlanChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteFloorPlan?: (url: string) => void;
}

const Conditions = ({
  data,
  onConditionData,
  onNext,
  onBack,
  steps,
  currentStep,
  floorPlanFiles = [],
  floorPlanUrls = [],
  onFloorPlanChange,
  onDeleteFloorPlan,
}: ConditionsProps) => {
  const t = useTranslations("AddProperty");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ExposeCondition, value: any) => {
    onConditionData({ ...data, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleRatingChange = (field: keyof ExposeCondition, value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 5) {
      handleInputChange(field, numValue);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      !data.structureRating ||
      data.structureRating < 1 ||
      data.structureRating > 5
    ) {
      newErrors.structureRating = "Please select a rating between 1-5";
    }
    if (
      !data.electricRating ||
      data.electricRating < 1 ||
      data.electricRating > 5
    ) {
      newErrors.electricRating = "Please select a rating between 1-5";
    }
    if (
      !data.heatingRating ||
      data.heatingRating < 1 ||
      data.heatingRating > 5
    ) {
      newErrors.heatingRating = "Please select a rating between 1-5";
    }
    if (!data.damageDescription.trim()) {
      newErrors.damageDescription = "Damage description is required";
    }
    if (!data.renovationNeeded.trim()) {
      newErrors.renovationNeeded = "Renovation details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  // Rating component helper
  const RatingSelector = ({
    label,
    field,
    value,
    description,
  }: {
    label: string;
    field: keyof ExposeCondition;
    value: number;
    description?: string;
  }) => (
    <div className="rating-selector">
      <h5>{label}*</h5>
      {description && <p className="text-muted small">{description}</p>}
      <div className="space16" />
      <div className="rating-buttons d-flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className={`rating-btn ${value === rating ? "active" : ""}`}
            onClick={() => handleRatingChange(field, rating.toString())}
            style={{
              padding: "10px 15px",
              border: "2px solid #ddd",
              borderRadius: "5px",
              backgroundColor: value === rating ? "#007bff" : "white",
              color: value === rating ? "white" : "#333",
              cursor: "pointer",
              minWidth: "50px",
              fontWeight: value === rating ? "bold" : "normal",
            }}
          >
            {rating}
          </button>
        ))}
        <span className="ms-2 align-self-center">
          {value === 1 && "Poor"}
          {value === 2 && "Fair"}
          {value === 3 && "Average"}
          {value === 4 && "Good"}
          {value === 5 && "Excellent"}
        </span>
      </div>
      {errors[field] && <p className="error_msg mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div>
      <div className="upload-main-boxarea">
        <div className="space48" />
        <h4>{t("condition_title")}</h4>
        <div className="space4" />
        <p className="text-muted">
          Please rate the condition of various aspects of your property (1 =
          Poor, 5 = Excellent)
        </p>
        <div className="space28" />

        <div className="row">
          {/* Rating Fields */}
          <div className="col-lg-4 col-md-6">
            <RatingSelector
              label={t("condition_structure")}
              field="structureRating"
              value={data.structureRating}
              description="Foundation, walls, structural integrity"
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <RatingSelector
              label={t("condition_electric")}
              field="electricRating"
              value={data.electricRating}
              description="Wiring, outlets, electrical panel"
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <RatingSelector
              label={t("condition_heating")}
              field="heatingRating"
              value={data.heatingRating}
              description="Heating system efficiency and condition"
            />
          </div>

          {/* Text Areas */}
          <div className="col-lg-12 col-md-12">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("condition_damage")}*</h5>
              <div className="space16" />
              <textarea
                className={errors.damageDescription ? "input_error" : ""}
                placeholder="Describe any existing damage to the property (e.g., water damage, cracks, wear and tear)"
                name="damageDescription"
                value={data.damageDescription}
                onChange={(e) =>
                  handleInputChange("damageDescription", e.target.value)
                }
                rows={4}
              />
              {errors.damageDescription && (
                <p className="error_msg">{errors.damageDescription}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("condition_renovation")}*</h5>
              <div className="space16" />
              <textarea
                className={errors.renovationNeeded ? "input_error" : ""}
                placeholder="Describe any renovations needed or recommended (e.g., bathroom update, kitchen remodel, painting)"
                name="renovationNeeded"
                value={data.renovationNeeded}
                onChange={(e) =>
                  handleInputChange("renovationNeeded", e.target.value)
                }
                rows={4}
              />
              {errors.renovationNeeded && (
                <p className="error_msg">{errors.renovationNeeded}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="space28" />
            <div className="input-area">
              <h5>{t("condition_notes")}</h5>
              <div className="space16" />
              <textarea
                placeholder="Any additional notes about the property condition (optional)"
                name="additionalNotes"
                value={data.additionalNotes || ""}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Floor Plan Section */}
        <div className="row">
          <div className="space28" />
          <h4>Floor Plans</h4>
          <div className="space4" />
          <p className="text-muted">
            Upload floor plan images or PDFs (optional)
          </p>
          <div className="space28" />

          <div className="property-main-boxarea">
            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <div className="btn-upload vl-btn1 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    className="me-2"
                  >
                    <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
                  </svg>
                  Select Floor Plan Files
                  <input
                    type="file"
                    multiple
                    onChange={onFloorPlanChange}
                    className="ip-file"
                    accept="image/*,.pdf"
                  />
                </div>
                <p className="file-name fw-5">
                  or drag files here <br />
                  <span>(Images or PDFs)</span>
                </p>
              </div>

              {floorPlanUrls.length > 0 && (
                <>
                  <div className="space20" />
                  <div className="box-img-upload">
                    {floorPlanUrls.map((url, index) => (
                      <div
                        className="item-upload file-delete"
                        key={`floor-${index}`}
                      >
                        {url.includes(".pdf") ? (
                          <div
                            className="pdf-preview"
                            style={{
                              width: "100%",
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "5px",
                            }}
                          >
                            <svg
                              width="40"
                              height="40"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18.5,9H13V3.5L18.5,9Z" />
                            </svg>
                            <span className="ms-2">PDF File</span>
                          </div>
                        ) : (
                          <img src={url} alt={`Floor plan ${index + 1}`} />
                        )}
                        {onDeleteFloorPlan && (
                          <span
                            className="remove-file"
                            onClick={() => onDeleteFloorPlan(url)}
                            style={{ cursor: "pointer" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="row">
          <div className="space28" />
          <div className="col-lg-12">
            <div className="Forms_navigaion_button_wrapper">
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

export default Conditions;
