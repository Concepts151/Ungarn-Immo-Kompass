import Link from "next/link";

export default function Others3() {
    return (
        <>
            <div className="space30" />
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="miision1">
                <div className="containr-fluid">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Mission &amp; Vision</h5>
                                <div className="space16" />
                                <h2>Our Mission &amp; Vision</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="images1">
                                <img src="/assets/img/all-images/others/others-img8.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-heading heading1">
                                <h2>Shaping the Future of Real Estate</h2>
                                <div className="space16" />
                                <p>We are committed to providing expert guidance, cutting-edge technology, and personalized solutions that empower to clients make confident real estate decisions. Whether you’re searching for your dream home maximizing value of your property, we strive to deliver excellence, trust, and innovation at every step of the journey.</p>
                                <div className="space32" />
                                <h3>Our Mission</h3>
                                <div className="space16" />
                                <p>To simplify real estate transactions through innovation, transparency, and expert guidance, ensuring every client finds their dream property with ease.</p>
                                <div className="space32" />
                                <h3>Our Vision</h3>
                                <div className="space16" />
                                <p>To be the most trusted and innovative real estate platform, transforming the way people buy, sell, and invest in properties.</p>
                                <div className="space32" />
                                <div className="btn-area1">
                                    <Link href="/property-details-v1" className="vl-btn1">
                                        See All Properties
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
            {/*===== OTHERS AREA ENDS =======*/}
            <div className="space30" />
        </>
    );
}
