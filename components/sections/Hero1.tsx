import Link from "next/link";

export default function Hero1() {
    return (
        <>
            <div className="hero1-section-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero-heading-content heading1">
                                <h1 className="text-anime-style-3">
                                    Making Your Homeownership <br className="d-lg-block d-none" /> Dream a Reality
                                </h1>
                                <div className="space20" />
                                <p className="text-anime-style-1">
                                    Whether you're looking to buy, sell, or rent, Housa connects you with <br className="d-lg-block d-none" /> the best properties and expert advice. Explore homes that fit your <br className="d-lg-block d-none" /> vision and budget with ease and confidence.
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1000}>
                                    <Link href="/add-property" className="vl-btn1">
                                        Add Listing
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="space80 d-lg-block d-none" />
                                <div className="space40 d-lg-none d-block" />
                                <div className="counter-boxarea">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-6" data-aos="fade-up" data-aos-duration={300}>
                                            <div className="counter-box">
                                                <h1>
                                                    <span className="odometer text-nowrap" data-count={180} />+
                                                </h1>
                                                <div className="space10" />
                                                <p>Selling Property</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-6" data-aos="fade-up" data-aos-duration={500}>
                                            <div className="counter-box">
                                                <h1>
                                                    <span className="odometer text-nowrap" data-count={120} />+
                                                </h1>
                                                <div className="space10" />
                                                <p>Buying Property</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-12" data-aos="fade-up" data-aos-duration={700}>
                                            <div className="space30 d-md-none d-block" />
                                            <div className="counter-box">
                                                <h1>
                                                    <span className="odometer text-nowrap" data-count={150} />+
                                                </h1>
                                                <div className="space10" />
                                                <p>Property Available</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-images-area image-anime">
                                <img src="/assets/img/all-images/hero/hero-img1.png" alt="housa" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space20" />
        </>
    );
}
