import Link from "next/link";

export default function Profile1() {
    return (
        <>
            {/*===== DASHBOARD AREA STARTS =======*/}
            <div className="profile-section-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="heading1">
                                <h2>My Profile</h2>
                                <div className="space32" />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-details-boxarea">
                                <h4>Upload Profile Photo</h4>
                                <div className="space24" />
                                <div className="box-agent-avt">
                                    <div className="img-poster">
                                        <img src="/assets/img/all-images/others/others-img11.png" alt="avatar" loading="lazy" />
                                    </div>
                                    <div className="content uploadfile">
                                        <p>Upload a new poster</p>
                                        <div className="space16" />
                                        <div className="box-ip">
                                            <input type="file" className="ip-file" />
                                        </div>
                                        <div className="space16" />
                                        <span>PNG/JPEG (100/100)</span>
                                    </div>
                                </div>
                                <div className="space30" />
                                <div className="personal-info-area">
                                    <h3>Upload Profile Photo</h3>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Username*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Username" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Email*</h5>
                                                <div className="space16" />
                                                <input type="email" placeholder="Email*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Phone*</h5>
                                                <div className="space16" />
                                                <input type="number" placeholder="Phone*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>First Name*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="First Name*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Last Name*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Last Name*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Position*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Position*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Language*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Language*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Company Name*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Company Name*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Tax Number*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Tax Number*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>Address*</h5>
                                                <div className="space16" />
                                                <input type="text" placeholder="Address*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="space28" />
                                            <div className="input-area">
                                                <h5>About Me*</h5>
                                                <div className="space16" />
                                                <textarea placeholder="Your Message" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="space32" />
                                            <div className="btn-area1 text-end">
                                                <Link href="/" className="vl-btn1">
                                                    Update Profile
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
                            <div className="space30" />
                            <div className="password-info-area">
                                <h2>Change Your Password</h2>
                                <div className="box">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="box-fieldset">
                                                <label>
                                                    Old Password:<span>*</span>
                                                </label>
                                                <div className="box-password">
                                                    <input type="password" className="form-contact style-1 password-field" placeholder="Password" />
                                                    <span className="show-pass">
                                                        <i className="fa-regular fa-eye" />
                                                        <i className="fa-regular fa-eye-slash" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="box-fieldset">
                                                <label>
                                                    New Password:<span>*</span>
                                                </label>
                                                <div className="box-password">
                                                    <input type="password" className="form-contact style-1 password-field2" placeholder="Password" />
                                                    <div
                                                        data-lastpass-icon-root=""
                                                        style={{
                                                            position: "relative",
                                                            height: "0px !important",
                                                            width: "0px !important",
                                                            float: "left",
                                                        }}
                                                    />
                                                    <span className="show-pass2">
                                                        <i className="fa-regular fa-eye" />
                                                        <i className="fa-regular fa-eye-slash" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="box-fieldset">
                                                <label>
                                                    Confirm Password:<span>*</span>
                                                </label>
                                                <div className="box-password">
                                                    <input type="password" className="form-contact style-1 password-field3" placeholder="Password" />
                                                    <div
                                                        data-lastpass-icon-root=""
                                                        style={{
                                                            position: "relative",
                                                            height: "0px !important",
                                                            width: "0px !important",
                                                            float: "left",
                                                        }}
                                                    />
                                                    <span className="show-pass3">
                                                        <i className="fa-regular fa-eye" />
                                                        <i className="fa-regular fa-eye-slash" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space32" />
                                <div className="btn-area1 text-end">
                                    <Link href="/" className="vl-btn1">
                                        Update Password
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
            {/*===== DASHBOARD AREA ENDS =======*/}
        </>
    );
}
