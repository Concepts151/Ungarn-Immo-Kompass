import Link from "next/link";

export default function About2() {
    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about2 sp1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="heading1">
                                <h5>About Company</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Building Dreams, One Home a Time</h2>
                                <div className="space50" />
                                <div className="img1 image-anime reveal">
                                    <img src="/assets/img/all-images/about/about-img3.png" alt="housa" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="space30 d-lg-none d-block" />
                            <div className="img2 image-anime reveal">
                                <img src="/assets/img/all-images/about/about-img4.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="heading1">
                                <div className="arrow-btnarea" data-aos="fade-left" data-aos-duration={900}>
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
                                <div className="space30" />
                                <p>
                                    We are passionate about simplifying the real estate experience. With a deep understanding of the housing market and a client-first approach, we strive to help buyers, sellers, and renters achieve their property goals. Our team experienced professionals is dedicated to providing personalized service, transparency, expert advice.
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link href="/property-halfmap-grid" className="vl-btn1">
                                        Add Listing
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
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}
