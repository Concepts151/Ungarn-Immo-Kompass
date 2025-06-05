import Link from "next/link";

export default function About3() {
    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about3-section-area sp1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-images-area">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="img2 image-anime reveal">
                                            <img src="/assets/img/all-images/about/about-img5.png" alt="housa" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="space100" />
                                        <div className="img1 image-anime reveal">
                                            <img src="/assets/img/all-images/about/about-img6.png" alt="housa" />
                                        </div>
                                    </div>
                                </div>
                                <div className="author-img">
                                    <img src="/assets/img/elements/elements3.png" alt="housa" className="elements10" />
                                    <div className="arrow-btnarea">
                                        <Link href="/about-us">
                                            <div className="content keyframe5">
                                                <h6 className="circle rotateme">
                                                    <span style={{ transform: "rotate(0deg)" }}>A</span>
                                                    <span style={{ transform: "rotate(17deg)" }}>S</span>
                                                    <span style={{ transform: "rotate(34deg)" }}>u</span>
                                                    <span style={{ transform: "rotate(51deg)" }}>c</span>
                                                    <span style={{ transform: "rotate(51deg)" }}>c</span>
                                                    <span style={{ transform: "rotate(68deg)" }}>e</span>
                                                    <span style={{ transform: "rotate(85deg)" }}>s</span>
                                                    <span style={{ transform: "rotate(102deg)" }}>s</span>
                                                    <span style={{ transform: "rotate(119deg)" }}>b</span>
                                                    <span style={{ transform: "rotate(136deg)" }}>r</span>
                                                    <span style={{ transform: "rotate(153deg)" }}>a</span>
                                                    <span style={{ transform: "rotate(170deg)" }}>n</span>
                                                    <span style={{ transform: "rotate(187deg)" }}>w</span>
                                                    <span style={{ transform: "rotate(204deg)" }}>i</span>
                                                    <span style={{ transform: "rotate(221deg)" }}>t</span>
                                                    <span style={{ transform: "rotate(238deg)" }}>h</span>
                                                    <span style={{ transform: "rotate(255deg)" }}>d</span>
                                                    <span style={{ transform: "rotate(272deg)" }}>e</span>
                                                    <span style={{ transform: "rotate(289deg)" }}>m</span>
                                                    <span style={{ transform: "rotate(306deg)" }}>o</span>
                                                    <span style={{ transform: "rotate(323deg)" }}>u</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>i</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>b</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>u</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>i</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>l</span>
                                                    <span style={{ transform: "rotate(340deg)" }}>d</span>
                                                </h6>
                                            </div>
                                            <img src="/assets/img/icons/arrow1.svg" alt="housa" className="arrow1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1" />
                        <div className="col-lg-5">
                            <div className="about-heading heading2">
                                <h5 data-aos="fade-left" data-aos-duration={800}>
                                    Unlock Exclusive Listings
                                </h5>
                                <div className="space26" />
                                <h2 className="text-anime-style-3">Discover propertie that match your style needs</h2>
                                <div className="space18" />
                                <p data-aos="fade-left" data-aos-duration={900}>
                                    At Housa, we believe that finding a home goes beyond just a roof over your head – it’s about discovering an place that fits your unique lifestyle. Whether you're searching for cozy.
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link href="/add-property" className="vl-btn1">
                                        Add Listing
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                    <div className="man-images-text">
                                        <div className="mans-img">
                                            <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                        </div>
                                        <div className="man-text">
                                            <Link href="/about-us">Alex Robertson</Link>
                                            <div className="space12" />
                                            <p>Real Estate Agent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}
