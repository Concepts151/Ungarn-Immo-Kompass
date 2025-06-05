import Link from "next/link";

export default function Service2() {
    return (
        <>
            {/*===== SERVICE AREA STARTS =======*/}
            <div className="service2 sp2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-offset="60px">
                            <div className="service-h2-boxarea">
                                <Link href="/our-service" className="title">
                                    Buying Services
                                </Link>
                                <div className="space24" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img1.png" alt="housa" />
                                </div>
                                <div className="space20" />
                                <div className="pera-arrow">
                                    <p>We help you find your ideal home at the right price, providing expe...</p>
                                    <Link href="/our-service" className="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 38 38" fill="none">
                                            <path d="M8.30499 19.0002H26.6374" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.1899 11.5527L26.6375 19.0003L19.1899 26.4478" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1000} data-aos-offset="80px">
                            <div className="service-h2-boxarea">
                                <Link href="/our-service" className="title">
                                    Selling Services
                                </Link>
                                <div className="space24" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img2.png" alt="housa" />
                                </div>
                                <div className="space20" />
                                <div className="pera-arrow">
                                    <p>Our marketing and negotiation strategies ensure you get the...</p>
                                    <Link href="/our-service" className="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 38 38" fill="none">
                                            <path d="M8.30499 19.0002H26.6374" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.1899 11.5527L26.6375 19.0003L19.1899 26.4478" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1200} data-aos-offset="100px">
                            <div className="service-h2-boxarea">
                                <Link href="/our-service" className="title">
                                    Rental Services
                                </Link>
                                <div className="space24" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img3.png" alt="housa" />
                                </div>
                                <div className="space20" />
                                <div className="pera-arrow">
                                    <p>Find the perfect rental property attract reliable tenants with ease.</p>
                                    <Link href="/our-service" className="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 38 38" fill="none">
                                            <path d="M8.30499 19.0002H26.6374" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.1899 11.5527L26.6375 19.0003L19.1899 26.4478" stroke="#1B1B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== SERVICE AREA STARTS =======*/}
        </>
    );
}
