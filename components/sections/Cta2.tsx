import Link from "next/link";

export default function Cta2() {
    return (
        <>
            {/*===== CTA AREA STARTS =======*/}
            <div className="cat4-section-area ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cta-bg-area">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="heading2">
                                            <h2>Work with Experts Who Care About Your Future</h2>
                                            <div className="space28" />
                                            <form>
                                                <input type="email" placeholder="Email Address" />
                                                <button type="submit" className="vl-btn1">
                                                    Subscribe
                                                    <span className="arrow1 ms-2">
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </span>
                                                    <span className="arrow2 ms-2">
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="cta-images-area">
                                            <img src="/assets/img/elements/elements7.png" alt="housa" className="elements7 aniamtion-key-1" />
                                            <div className="img1 text-end">
                                                <img src="/assets/img/all-images/cta/cta-img1.png" alt="housa" />
                                            </div>
                                            <div className="villa-listing">
                                                <div className="list">
                                                    <Link href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="space8" />
                                                <div className="villa-images">
                                                    <div className="img1">
                                                        <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                    </div>
                                                    <div className="text">
                                                        <Link href="/property-details-v1">Luxury Villa</Link>
                                                        <div className="space10" />
                                                        <p>$1.800,000</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== CTA AREA ENDS =======*/}
            <div className="space80" />
        </>
    );
}
