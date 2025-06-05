import Link from "next/link";

export default function Others4() {
    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="choose1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Why Choose Us</h5>
                                <div className="space16" />
                                <h2>Why Choose Housa</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="choose-heading heading1">
                                <h2>Why Housa Stands Out</h2>
                                <div className="space16" />
                                <p>Choosing Housa means partnering with a real estate company that puts your needs first. We combine industry expertise, innovative technology, and a client-centric approach to simplify property transactions.</p>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/our-service">Expert Guidance</Link>
                                    <div className="space16" />
                                    <p>Our team of real estate professionals is dedicated to providing the best market insights and tailored advice.</p>
                                </div>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/our-service">Wide Property Listings</Link>
                                    <div className="space16" />
                                    <p>From modern apartments to luxury villas, we offer diverse listings to match your preferences.</p>
                                </div>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/our-service">Clients-Centric Approach</Link>
                                    <div className="space16" />
                                    <p>Your needs come first, and we ensure a smooth, stress-free real estate experience.</p>
                                </div>
                                <div className="space32" />
                                <div className="btn-area1">
                                    <Link href="/contact" className="vl-btn1">
                                        Contact Us
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
                        <div className="col-lg-6">
                            <div className="chosse-images">
                                <img src="/assets/img/elements/elements8.png" alt="housa" className="elements8" />
                                <div className="img1 text-end">
                                    <img src="/assets/img/all-images/others/others-img9.png" alt="housa" />
                                </div>
                                <div className="img2">
                                    <img src="/assets/img/all-images/others/others-img10.png" alt="housa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OTHERS AREA ENDS =======*/}
            <div className="space30" />
        </>
    );
}
