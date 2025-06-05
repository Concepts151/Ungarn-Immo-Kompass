export default function Case1() {
    return (
        <>
            {/*===== CASE AREA STARTS =======*/}
            <div className="case1 sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Why Choose Us</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Why Housa Stands Out</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="case-btn-area">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                            <span className="title">Experts Agents</span>
                                            <span className="space16 d-block" />
                                            <span className="pera">Our team consists of seasoned professionals with deep market knowledge.</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                            <span className="title">Extensive Listings</span>
                                            <span className="space16 d-block" />
                                            <span className="pera">Access a wide range of properties across various price ranges and styles.</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                                            <span className="title">Tailored Listings Solutions</span>
                                            <span className="space16 d-block" />
                                            <span className="pera">We understand that every client has unique needs, and we provide personalized service to match.</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact1-tab" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">
                                            <span className="title">Customer Satisfaction</span>
                                            <span className="space16 d-block" />
                                            <span className="pera">We prioritize transparency and trust to deliver exceptional experiences.</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                                    <div className="img1 image-anime reveal">
                                        <img src="/assets/img/all-images/case/case-img1.png" alt="housa" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                    <div className="img1">
                                        <img src="/assets/img/all-images/case/case-img2.png" alt="housa" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                    <div className="img1">
                                        <img src="/assets/img/all-images/case/case-img3.png" alt="housa" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab" tabIndex={0}>
                                    <div className="img1">
                                        <img src="/assets/img/all-images/case/case-img4.png" alt="housa" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== CASE AREA ENDS =======*/}
        </>
    );
}
