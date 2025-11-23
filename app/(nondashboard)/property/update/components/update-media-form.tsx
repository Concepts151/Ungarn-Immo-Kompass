import React from "react";
import "@/app/(dashboard)/add-property/components/css/add-property.css";

interface MediaFormProps {
  imageUrls: any[];
  videoUrls?: any[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
  steps: string[];
  currentStep: number;
  handleDeleteImage: (url: any) => void;
  handleDeleteVideo: (url: any) => void;
}
const UpdateMediaForm = ({
  imageUrls,
  videoUrls = [],
  handleVideoChange,
  handleImageChange,
  onBack,
  onNext,
  steps,
  currentStep,
  handleDeleteImage,
  handleDeleteVideo,
}: MediaFormProps) => {
  const handleNext = () => {
    onNext();
  };
  return (
    <div>
      <div className="property-main-boxarea">
        <div className="space48" />
        <h4>Upload Photos Of Your Property</h4>
        <div className="space38" />

        <div className="box-uploadfile text-center">
          <div className="uploadfile">
            <div className="btn-upload vl-btn1 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
              </svg>
              Select Property Photos
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="ip-file"
              />
            </div>
            <p className="file-name fw-5">
              or drag photos here <br />
              <span>(Up to 10 photos)</span>
            </p>
          </div>
          <div className="space20" />
          <div className="box-img-upload">
            {imageUrls.map((url, index) => (
              <div className="item-upload file-delete" key={url}>
                <img src={url} alt={`img-${index}`} />
                <span
                  className="remove-file"
                  onClick={() => handleDeleteImage(url)}
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
              </div>
            ))}
          </div>

          <div className="space20" />
        </div>
        {/* property video ui */}
        <div className="space48" />
        <h4>Upload videos Of Your Property</h4>
        <div className="space38" />
        <div className="box-uploadfile text-center">
          <div className="uploadfile">
            <div className="btn-upload vl-btn1 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
              </svg>
              Select Property Videos
              <input
                type="file"
                multiple
                onChange={handleVideoChange}
                className="ip-file"
              />
            </div>
            <p className="file-name fw-5">
              or drag Videos here <br />
              <span>(Up to 10 photos)</span>
            </p>
            {/* <div className="">
              <button className="vl-btn1" onClick={testUplaodVideo}>
                Test Upload Video
              </button>
            </div> */}
          </div>
          <div className="space20" />
          <div className="box-img-upload">
            {videoUrls.map((url, index) => (
              <div className="item-upload file-delete" key={url}>
                <video
                  src={url}
                  width="400"
                  controls
                  style={{ marginTop: "20px", borderRadius: "10px" }}
                />
                <span
                  className="remove-file"
                  onClick={() => handleDeleteVideo(url)}
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
              </div>
            ))}
          </div>

          <div className="space20" />
        </div>
        {/* property video ui end */}
        <div className="space30" />

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

export default UpdateMediaForm;
