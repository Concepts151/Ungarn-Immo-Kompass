import React from "react";

type DescriptionTabProps = {
  formData: any;
  handleChange: any;
  handleTextAreaChange?: any;
};
const DescriptionTab = ({
  formData,
  handleChange,
  handleTextAreaChange,
}: DescriptionTabProps) => {
  return (
    <>
      <div className="tab-content">
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group" style={{ flex: 1 }}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group" style={{ flex: 1 }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleTextAreaChange}
            />
          </div>
        </div>
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group" style={{ flex: 1 }}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="number"
              name="price"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group" style={{ flex: 1 }}>
            <label>City</label>
            <input
              type="text"
              name="title"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="address"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Currency</label>
            <input
              type="text"
              name="title"
              value={formData.currency}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lot size</label>
            <input
              type="text"
              name="address"
              value={formData.lotSize}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Living Area</label>
            <input
              type="number"
              name="price"
              value={formData.livingArea}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className=""
          style={{ display: "flex", gap: "10px", width: "100%" }}
        >
          <div className="form-group">
            <label>Rooms</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bedrooms</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bathroom</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bathroom</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Build Year</label>
            <input
              type="number"
              name="price"
              value={formData.buildYear}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionTab;
