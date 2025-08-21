import React from "react";

interface DetailsFormProps {
  data: any; // Define the type of details based on your requirements
  onDetailsChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
}

const DetailsForm = ({
  data,
  onNext,
  onBack,
  onDetailsChange,
  steps,
  currentStep
}: DetailsFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: any, value: any) => {
    onDetailsChange({ ...data, [field]: value });
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
        <h4>Listing Details</h4>
        <div className="space4" />
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Material</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Material"
                name="material"
                value={data.material}
                onChange={(e) => handleInputChange("roofType", e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Roof Type</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Roof Type"
                name="roofType"
                value={data.roofType}
                onChange={(e) => handleInputChange("roofType", e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Roof Condition</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Roof Condition"
                name="roofCondition"
                value={data.roofCondition}
                onChange={(e) =>
                  handleInputChange("roofCondition", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Insulation</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Insulation"
                name="insulation"
                value={data.insulation}
                onChange={(e) =>
                  handleInputChange("insulation", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Windows</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Windows"
                name="windows"
                value={data.windows}
                onChange={(e) => handleInputChange("windows", e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Windows Age</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="windows age"
                name="windowsAge"
                value={data.windowsAge}
                onChange={(e) =>
                  handleInputChange("windowsAge", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Roller Shutter</h5>
              <div className="space16" />
              <select
                className="nice-select"
                name="hasRollerShutter"
                value={data.hasRollerShutter}
                onChange={(e) =>
                  handleInputChange("hasRollerShutter", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Heating Type</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Heating Type"
                name="heatingType"
                value={data.heatingType}
                onChange={(e) =>
                  handleInputChange("heatingType", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Heating Condition</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Heating Condition"
                name="heatingCondition"
                value={data.heatingCondition}
                onChange={(e) =>
                  handleInputChange("heatingCondition", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Electric Conditions</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Electric Conditions"
                name="electricCondition"
                value={data.electricCondition}
                onChange={(e) =>
                  handleInputChange("electricCondition", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Water Condition</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Water Conditions"
                name="waterCondition"
                value={data.waterCondition}
                onChange={(e) =>
                  handleInputChange("waterCondition", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Energy Certificate</h5>
              <div className="space16" />
              <select
                className="nice-select"
                name="energyCertificate"
                value={data.energyCertificate}
                onChange={(e) =>
                  handleInputChange("energyCertificate", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Energy Class</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Energy Class"
                name="energyClass"
                value={data.energyClass}
                onChange={(e) =>
                  handleInputChange("energyClass", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Energy Consumption</h5>
              <div className="space16" />
              <input
                type="number"
                placeholder="Energy Consumption"
                name="energyConsumption"
                value={data.energyConsumption}
                onChange={(e) =>
                  handleInputChange("energyConsumption", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Internet type</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Internet type"
                name="internetType"
                value={data.internetType}
                onChange={(e) =>
                  handleInputChange("internetType", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Internet Speed</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Internet Speed"
                name="internetSpeed"
                value={data.internetSpeed}
                onChange={(e) =>
                  handleInputChange("internetSpeed", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Monthly Cost</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="Monthly  Cost"
                name="monthlyCost"
                value={data.monthlyCost}
                onChange={(e) =>
                  handleInputChange("monthlyCost", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="space28" />
            <div className="input-area">
              <h5>Gardern Description</h5>
              <div className="space16" />
              <textarea
                placeholder="Decribe the garden area, its features, and any landscaping details."
                name="gardenDesc"
                value={data.gardenDesc}
                onChange={(e) =>
                  handleInputChange("gardenDesc", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space28" />
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
              <button    type="button" className="vl-btn1" onClick={() => handleNext()}>
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

export default DetailsForm;
