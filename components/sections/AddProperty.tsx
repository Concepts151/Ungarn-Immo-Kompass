import Link from "next/link";

export default function AddProperty() {
    return (
        <>
            {/*===== DASHBOARD AREA STARTS =======*/}
            <div className="add-property-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="property-boxarea">
                                <h3>Add New Property</h3>
                                <div className="space40" />
                                <div className="all-tabs-boxarea">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                                1. Description
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                2. Media
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                                                3. Location
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact1-tab" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">
                                                4. Details
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact2-tab" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">
                                                5. Amenities
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                                            <div className="space48" />
                                            <h4>Property Description</h4>
                                            <div className="space28" />
                                            <h5>Tittle Your Home*</h5>
                                            <div className="space16" />
                                            <div className="col-lg-12">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Tittle Name" />
                                                </div>
                                                <div className="space32" />
                                                <h5>Description Note*</h5>
                                                <div className="space16" />
                                                <div className="input-area">
                                                    <textarea placeholder="Your Message" defaultValue={""} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="space30" />
                                                    <div className="input-area">
                                                        <h5>Select Category*</h5>
                                                        <div className="space16" />
                                                        <select className="nice-select">
                                                            <option>Apartment</option>
                                                            <option>Bar</option>
                                                            <option>Cafe</option>
                                                            <option>House</option>
                                                            <option>Farm</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="space30" />
                                                    <div className="input-area">
                                                        <h5>Listed In*</h5>
                                                        <div className="space16" />
                                                        <select className="nice-select">
                                                            <option>Active</option>
                                                            <option>Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="space30" />
                                                    <div className="input-area">
                                                        <h5>Property Status*</h5>
                                                        <div className="space16" />
                                                        <select className="nice-select">
                                                            <option>Approved</option>
                                                            <option>Sale</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="space30" />
                                                        <div className="input-area">
                                                            <h5>Price In $</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Your Price" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="space30" />
                                                        <div className="input-area">
                                                            <h5>Yearly Tax Rate*</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Tax Rate" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="space30" />
                                                        <div className="input-area">
                                                            <h5>After Price Label*</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Tax Lebel" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="space40" />
                                                        <div className="btn-area1 text-end">
                                                            <Link href="#" className="vl-btn1">
                                                                Update To Next Step
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                            <div className="property-main-boxarea">
                                                <div className="space48" />
                                                <h4>Upload Photos Of Your Property</h4>
                                                <div className="space38" />
                                                <div className="box-uploadfile text-center">
                                                    <div className="uploadfile">
                                                        <div className="btn-upload vl-btn1 text-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
                                                            </svg>
                                                            Select Property Photos
                                                            <input type="file" className="ip-file" />
                                                        </div>
                                                        <p className="file-name fw-5">
                                                            or drag photos here <br />
                                                            <span>(Up to 10 photos)</span>
                                                        </p>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="box-img-upload">
                                                        <div className="item-upload file-delete">
                                                            <img src="/assets/img/all-images/others/add-img1.png" alt="housa" />
                                                            <span className="remove-file">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="item-upload file-delete">
                                                            <img src="/assets/img/all-images/others/add-img2.png" alt="housa" />
                                                            <span className="remove-file">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="item-upload file-delete">
                                                            <img src="/assets/img/all-images/others/add-img3.png" alt="housa" />
                                                            <span className="remove-file">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="item-upload file-delete">
                                                            <img src="/assets/img/all-images/others/add-img4.png" alt="housa" />
                                                            <span className="remove-file">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <h4>Video Option</h4>
                                                <div className="space40" />
                                                <div className="row">
                                                    <div className="col-lg-6 co-md-6">
                                                        <div className="input-area">
                                                            <h5>Select Category*</h5>
                                                            <div className="space16" />
                                                            <select className="nice-select">
                                                                <option>Facebook</option>
                                                                <option>Instagram</option>
                                                                <option>Linkedin</option>
                                                                <option>Youtube</option>
                                                                <option>Pintares</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 co-md-6">
                                                        <div className="input-area">
                                                            <h5>Embed Video Id*</h5>
                                                            <div className="space16" />
                                                            <select className="nice-select">
                                                                <option>Facebook</option>
                                                                <option>Instagram</option>
                                                                <option>Linkedin</option>
                                                                <option>Youtube</option>
                                                                <option>Pintares</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 co-md-6">
                                                        <div className="space30" />
                                                        <div className="input-area">
                                                            <h5>Virtual Tour</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Virtual Tour" />
                                                        </div>
                                                    </div>
                                                    <div className="space40" />
                                                    <div className="col-lg-12">
                                                        <div className="btn-area1 text-end">
                                                            <Link href="#" className="vl-btn1">
                                                                Update To Next Step
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                            <div className="upload-main-boxarea">
                                                <div className="space48" />
                                                <h4>Listing Property Location</h4>
                                                <div className="space32" />
                                                <div className="input-area">
                                                    <h5>Address</h5>
                                                    <div className="space16" />
                                                    <input type="text" placeholder="Property Address" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Country Name</h5>
                                                            <div className="space16" />
                                                            <div className="nice-select" tabIndex={0}>
                                                                <span className="current">Select Country</span>
                                                                <ul className="list">
                                                                    <li data-value={1} className="option">
                                                                        USA
                                                                    </li>
                                                                    <li data-value={2} className="option selected">
                                                                        Australia
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        England
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Portugal
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        California
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Inter Milan
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Liverpool
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Property City</h5>
                                                            <div className="space16" />
                                                            <div className="nice-select" tabIndex={0}>
                                                                <span className="current">Select City</span>
                                                                <ul className="list">
                                                                    <li data-value={1} className="option">
                                                                        USA
                                                                    </li>
                                                                    <li data-value={2} className="option selected">
                                                                        Australia
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        England
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Portugal
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        California
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Inter Milan
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        Liverpool
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>State Location</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="State Location" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>ZIP Code*</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Zip Code" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Neighborhood*</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Neighborhood*" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="space48" />
                                                        <div className="mapouter">
                                                            <div className="gmap_canvas">
                                                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Latitude</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Latitude" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Longitude</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Longitude*" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="space40" />
                                                        <div className="btn-area1 text-end">
                                                            <Link href="#" className="vl-btn1">
                                                                Update To Next Step
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab" tabIndex={0}>
                                            <div className="upload-main-boxarea">
                                                <div className="space48" />
                                                <h4>Listing Details</h4>
                                                <div className="space4" />
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Size in ft (only numbers)</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Size in ft (only numbers)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Lot size in ft (only numbers)</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Lot size in ft (only numbers)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Room</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Room" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Bedrooms</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Bedrooms" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Bethrooms</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Bethrooms" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Custom Id (Text)</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Custom Id (Text)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Garages</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Garages" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Garages Size</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Garages Size" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Year Built</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Year Built" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Available from (date)</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Available from (date)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Basement</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Basement" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Extra details</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Extra details" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Roofing</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Roofing" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Exterior Material</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Exterior Material" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Structure type</h5>
                                                            <div className="space16" />
                                                            <input type="text" placeholder="Structure type" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Floors no</h5>
                                                            <div className="space16" />
                                                            <div className="nice-select" tabIndex={0}>
                                                                <span className="current">Select</span>
                                                                <ul className="list">
                                                                    <li data-value={1} className="option">
                                                                        1
                                                                    </li>
                                                                    <li data-value={2} className="option selected">
                                                                        2
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        3
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        4
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        5
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        6
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        7
                                                                    </li>
                                                                    <li data-value={1} className="option">
                                                                        8
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Energy Class</h5>
                                                            <div className="space16" />
                                                            <div className="nice-select" tabIndex={0}>
                                                                <span className="current">Choose</span>
                                                                <ul className="list">
                                                                    <li data-value={1} className="option">
                                                                        For Rent
                                                                    </li>
                                                                    <li data-value={2} className="option selected">
                                                                        For Sale
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Energy index in kWh/m2a</h5>
                                                            <div className="space16" />
                                                            <div className="nice-select" tabIndex={0}>
                                                                <span className="current">Choose</span>
                                                                <ul className="list">
                                                                    <li data-value={1} className="option">
                                                                        New Listing
                                                                    </li>
                                                                    <li data-value={2} className="option selected">
                                                                        Open House
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12">
                                                        <div className="space28" />
                                                        <div className="input-area">
                                                            <h5>Owner/ Agent nots (not visible on front end)</h5>
                                                            <div className="space16" />
                                                            <textarea placeholder="There are many variations of passages" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="space40" />
                                                        <div className="btn-area1 text-end">
                                                            <Link href="#" className="vl-btn1">
                                                                Update To Next Step
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact2-tab" tabIndex={0}>
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
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="space40" />
                                                        <div className="btn-area1 text-end">
                                                            <Link href="#" className="vl-btn1">
                                                                Upload Your property
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== DASHBOARD AREA ENDS =======*/}
        </>
    );
}
