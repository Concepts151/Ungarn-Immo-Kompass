import Link from "next/link";

export default function About1() {
    return (
        <>
            <div className="about1-section-area container-home1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="about-img1 image-anime reveal">
                                <img src="/assets/img/all-images/about/about-img1.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="heading1">
                                <div className="head">
                                    <h5>About Company</h5>
                                    <div className="space16" />
                                    <h3 className="text-anime-style-2">Empowering Your Real Estate Journey</h3>
                                </div>
                                <div className="space20" />
                                <div className="perag-bg">
                                    <p>
                                        We are passionate about simplifying the real estate experience. Our expert team combines industry knowledge with a client-first approach to help you achieve your property goals.
                                    </p>
                                    <div className="space32" />
                                    <div className="btn-area1">
                                        <Link href="/my-property" className="vl-btn1">
                                            See Properties
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
                        <div className="col-lg-4">
                            <div className="about-img2 image-anime reveal">
                                <img src="/assets/img/all-images/about/about-img2.png" alt="housa" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
