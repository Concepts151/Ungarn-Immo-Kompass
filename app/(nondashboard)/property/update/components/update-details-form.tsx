import React from "react";

interface MonthlyCosts {
  electricity: number;
  water: number;
  gas: number;
  trash: number;
  tax: number;
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
  monthlyCosts: MonthlyCosts;
  gardenDesc: string;
}

interface DetailsFormProps {
  data: DetailsFormData;
  onDetailsChange: (data: DetailsFormData) => void;
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
}

const UpdateDetailsForm = ({
  data,
  onNext,
  onBack,
  onDetailsChange,
  steps,
  currentStep,
}: DetailsFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof DetailsFormData, value: any) => {
    onDetailsChange({ ...data, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleMonthlyCostChange = (
    costType: keyof MonthlyCosts,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const updatedCosts = {
      ...data.monthlyCosts,
      [costType]: numValue,
    };
    onDetailsChange({ ...data, monthlyCosts: updatedCosts });
  };

  const handleBooleanChange = (
    field: "hasRollerShutters" | "energyCertificate",
    value: string
  ) => {
    onDetailsChange({ ...data, [field]: value === "true" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields for details
    if (!data.heatingType.trim())
      newErrors.heatingType = "Heating type is required";
    if (!data.heatingCondition.trim())
      newErrors.heatingCondition = "Heating condition is required";
    if (!data.electricCondition.trim())
      newErrors.electricCondition = "Electric condition is required";
    if (!data.waterCondition.trim())
      newErrors.waterCondition = "Water condition is required";
    if (!data.internetType.trim())
      newErrors.internetType = "Internet type is required";
    if (!data.internetSpeed)
      newErrors.internetSpeed = "Internet speed is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

    // Energy class options for Hungarian properties
  const energyClasses = ['AA', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  
  // Common roof conditions in Hungary
  const roofConditions = ['Kiváló', 'Jó', 'Közepes', 'Felújítandó', 'Rossz'];
  
  // Common heating types in Hungary
  const heatingTypes = [
    'Gázkazán',
    'Távfűtés',
    'Elektromos',
    'Padlófűtés',
    'Klíma',
    'Vegyes tüzelésű',
    'Kandalló',
    'Cserépkályha'
  ];
  return  <div>
      <div className="upload-main-boxarea">
        <div className="space48" />
        <h4>Listing Details</h4>
        <div className="space4" />
        
        <div className="row">
          {/* First Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Material</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="e.g., Tégla, Ytong, Panel"
                name="material"
                value={data.material}
                onChange={(e) => handleInputChange("material", e.target.value)}
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
                placeholder="e.g., Cserép, Pala, Lapostető"
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
              <select
                className="nice-select"
                name="roofCondition"
                value={data.roofCondition}
                onChange={(e) => handleInputChange("roofCondition", e.target.value)}
              >
                <option value="">Select Condition</option>
                {roofConditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Insulation</h5>
              <div className="space16" />
              <input
                type="text"
                placeholder="e.g., Teljes körű, Részleges, Nincs"
                name="insulation"
                value={data.insulation}
                onChange={(e) => handleInputChange("insulation", e.target.value)}
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
                placeholder="e.g., Dupla üvegezés, Tripla üvegezés"
                name="windows"
                value={data.windows}
                onChange={(e) => handleInputChange("windows", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Windows Age (years)</h5>
              <div className="space16" />
              <input
                type="number"
                placeholder="0"
                min="0"
                name="windowsAge"
                value={data.windowsAge}
                onChange={(e) => handleInputChange("windowsAge", e.target.value)}
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Roller Shutters</h5>
              <div className="space16" />
              <select
                className="nice-select"
                name="hasRollerShutters"
                value={data.hasRollerShutters ? 'true' : 'false'}
                onChange={(e) => handleBooleanChange("hasRollerShutters", e.target.value)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Heating Type*</h5>
              <div className="space16" />
              <select
                className={`nice-select ${errors.heatingType ? 'input_error' : ''}`}
                name="heatingType"
                value={data.heatingType}
                onChange={(e) => handleInputChange("heatingType", e.target.value)}
              >
                <option value="">Select Heating Type</option>
                {heatingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.heatingType && (
                <p className="error_msg">{errors.heatingType}</p>
              )}
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Heating Condition*</h5>
              <div className="space16" />
              <select
                className={`nice-select ${errors.heatingCondition ? 'input_error' : ''}`}
                name="heatingCondition"
                value={data.heatingCondition}
                onChange={(e) => handleInputChange("heatingCondition", e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="Kiváló">Kiváló (Excellent)</option>
                <option value="Jó">Jó (Good)</option>
                <option value="Közepes">Közepes (Average)</option>
                <option value="Felújítandó">Felújítandó (Needs renovation)</option>
              </select>
              {errors.heatingCondition && (
                <p className="error_msg">{errors.heatingCondition}</p>
              )}
            </div>
          </div>

          {/* Fourth Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Electric Condition*</h5>
              <div className="space16" />
              <select
                className={`nice-select ${errors.electricCondition ? 'input_error' : ''}`}
                name="electricCondition"
                value={data.electricCondition}
                onChange={(e) => handleInputChange("electricCondition", e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="Kiváló">Kiváló (Excellent)</option>
                <option value="Jó">Jó (Good)</option>
                <option value="Felújított">Felújított (Renovated)</option>
                <option value="Felújítandó">Felújítandó (Needs renovation)</option>
              </select>
              {errors.electricCondition && (
                <p className="error_msg">{errors.electricCondition}</p>
              )}
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Water Condition*</h5>
              <div className="space16" />
              <select
                className={`nice-select ${errors.waterCondition ? 'input_error' : ''}`}
                name="waterCondition"
                value={data.waterCondition}
                onChange={(e) => handleInputChange("waterCondition", e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="Kiváló">Kiváló (Excellent)</option>
                <option value="Jó">Jó (Good)</option>
                <option value="Közepes">Közepes (Average)</option>
                <option value="Saját kút">Saját kút (Own well)</option>
              </select>
              {errors.waterCondition && (
                <p className="error_msg">{errors.waterCondition}</p>
              )}
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
                value={data.energyCertificate ? 'true' : 'false'}
                onChange={(e) => handleBooleanChange("energyCertificate", e.target.value)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          {/* Fifth Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Energy Class</h5>
              <div className="space16" />
              <select
                className="nice-select"
                name="energyClass"
                value={data.energyClass}
                onChange={(e) => handleInputChange("energyClass", e.target.value)}
                disabled={!data.energyCertificate}
              >
                <option value="">Select Energy Class</option>
                {energyClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Energy Consumption (kWh/m²/year)</h5>
              <div className="space16" />
              <input
                type="number"
                placeholder="0"
                min="0"
                step="0.1"
                name="energyConsumption"
                value={data.energyConsumption}
                onChange={(e) => handleInputChange("energyConsumption", e.target.value)}
                disabled={!data.energyCertificate}
              />
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Internet Type*</h5>
              <div className="space16" />
              <select
                className={`nice-select ${errors.internetType ? 'input_error' : ''}`}
                name="internetType"
                value={data.internetType}
                onChange={(e) => handleInputChange("internetType", e.target.value)}
              >
                <option value="">Select Internet Type</option>
                <option value="Optikai">Optikai (Fiber)</option>
                <option value="Kábel">Kábel (Cable)</option>
                <option value="DSL">DSL</option>
                <option value="Mobil internet">Mobil internet</option>
                <option value="Elérhető">Elérhető (Available)</option>
                <option value="Nincs">Nincs (None)</option>
              </select>
              {errors.internetType && (
                <p className="error_msg">{errors.internetType}</p>
              )}
            </div>
          </div>

          {/* Sixth Row */}
          <div className="col-lg-4 col-md-6">
            <div className="space28" />
            <div className="input-area">
              <h5>Internet Speed (Mbps)*</h5>
              <div className="space16" />
              <input
                type="number"
                className={errors.internetSpeed ? 'input_error' : ''}
                placeholder="0"
                min="0"
                name="internetSpeed"
                value={data.internetSpeed}
                onChange={(e) => handleInputChange("internetSpeed", e.target.value)}
              />
              {errors.internetSpeed && (
                <p className="error_msg">{errors.internetSpeed}</p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Costs Section */}
        <div className="row">
          <div className="col-12">
            <div className="space28" />
            <h5>Monthly Costs (HUF)</h5>
            <div className="space16" />
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Electricity</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={data.monthlyCosts.electricity}
                onChange={(e) => handleMonthlyCostChange("electricity", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Water</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={data.monthlyCosts.water}
                onChange={(e) => handleMonthlyCostChange("water", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Gas</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={data.monthlyCosts.gas}
                onChange={(e) => handleMonthlyCostChange("gas", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Trash</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={data.monthlyCosts.trash}
                onChange={(e) => handleMonthlyCostChange("trash", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Property Tax</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={data.monthlyCosts.tax}
                onChange={(e) => handleMonthlyCostChange("tax", e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <div className="input-area">
              <label>Total/Month</label>
              <input
                type="number"
                value={
                  data.monthlyCosts.electricity +
                  data.monthlyCosts.water +
                  data.monthlyCosts.gas +
                  data.monthlyCosts.trash +
                  data.monthlyCosts.tax
                }
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </div>
          </div>
        </div>

        {/* Garden Description */}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="space28" />
            <div className="input-area">
              <h5>Garden Description</h5>
              <div className="space16" />
              <textarea
                placeholder="Describe the garden area, its features, and any landscaping details."
                name="gardenDesc"
                value={data.gardenDesc}
                onChange={(e) => handleInputChange("gardenDesc", e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <div className="space28" />
          
          {/* Navigation Buttons */}
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
    </div>;
};

export default UpdateDetailsForm;
