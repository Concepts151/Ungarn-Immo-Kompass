export default function Hero2() {
    return (
        <>
            {/*===== HERO AREA STARTS =======*/}
            <div
                className="hero2-section-area"
                style={{
                    backgroundImage: "url(assets/img/all-images/hero/hero-img2.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero-heading heading1">
                                <h1 className="text-anime-style-3">Find Your Dream Home with Housa</h1>
                                <div className="space32" />
                                <form data-aos="fade-left" data-aos-duration={900}>
                                    <input type="email" placeholder="Enter keyword or address" />
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                            <path d="M5.83301 22.168L19.833 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.45801 8.16797H19.833V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </form>
                                <div className="space32" />
                                <div className="star-img-area" data-aos="fade-left" data-aos-duration={1000}>
                                    <ul className="img">
                                        <li>
                                            <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                        </li>
                                        <li>
                                            <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                        </li>
                                        <li>
                                            <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                        </li>
                                        <li>
                                            <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                        </li>
                                        <li>
                                            <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                        </li>
                                    </ul>
                                    <div className="rating">
                                        <ul>
                                            <li>
                                                <i className="fa-solid fa-star" />
                                            </li>
                                            <li>
                                                <i className="fa-solid fa-star" />
                                            </li>
                                            <li>
                                                <i className="fa-solid fa-star" />
                                            </li>
                                            <li>
                                                <i className="fa-solid fa-star" />
                                            </li>
                                            <li>
                                                <i className="fa-solid fa-star" />
                                            </li>
                                        </ul>
                                        <div className="space10" />
                                        <p>
                                            <span className="counter">850</span>+ Reviews
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space100" />
                    <div className="space16" />
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-6" data-aos="fade-up" data-aos-duration={800} data-aos-offset="70px">
                            <div className="counterh2-boxarea">
                                <h3>
                                    <span className="odometer text-nowrap" data-count={130} />+
                                </h3>
                                <div className="space10" />
                                <p>Property Available</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6" data-aos="fade-up" data-aos-duration={900} data-aos-offset="80px">
                            <div className="counterh2-boxarea">
                                <h3>
                                    <span className="odometer text-nowrap" data-count={60} />+
                                </h3>
                                <div className="space10" />
                                <p>Total Partner</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6" data-aos="fade-up" data-aos-duration={1000} data-aos-offset="90px">
                            <div className="counterh2-boxarea">
                                <h3>
                                    <span className="odometer text-nowrap" data-count={120} />+
                                </h3>
                                <div className="space10" />
                                <p>Buying Property</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6" data-aos="fade-up" data-aos-duration={1100} data-aos-offset="100px">
                            <div className="counterh2-boxarea">
                                <h3>
                                    <span className="odometer text-nowrap" data-count={120} />+
                                </h3>
                                <div className="space10" />
                                <p>Selling Property</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
        </>
    );
}
