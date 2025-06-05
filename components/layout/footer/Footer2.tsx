import Link from "next/link";
export default function Footer2() {
    return (
        <>
            {/*===== FOOTER AREA STARTS =======*/}
            <div className="footer-cta2-bg-area">
                <div className="cta2-section-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <div className="heading1">
                                    <h2 className="text-anime-style-3">Ready To Find Your Next Home?</h2>
                                    <div className="space16" />
                                    <p>Ready to take the next step? Whether you're looking to build your dream team or find the perfect career.</p>
                                </div>
                            </div>
                            <div className="col-lg-2" />
                            <div className="col-lg-6">
                                <div className="form-area text-end">
                                    <form>
                                        <input type="text" placeholder="Enter Category" />
                                        <button type="submit" className="vl-btn1">
                                            Search Now
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
                        </div>
                    </div>
                </div>
                <div className="vl-footer2-section-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-time-area">
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
                                    <div className="space24" />
                                    <p>We are committed to making your real estate journey seamless and stress-free. Whether you’re buying, selling, or renting every step the way.</p>
                                    <div className="space32" />
                                    <ul>
                                        <li>
                                            <Link href="#">
                                                <i className="fa-brands fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fa-brands fa-linkedin-in" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fa-brands fa-instagram" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fa-brands fa-youtube" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-6">
                                <div className="space30 d-md-none d-block" />
                                <div className="footer-widget-area foot-padding1">
                                    <h3>Quick Links</h3>
                                    <ul>
                                        <li>
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link href="/about-us">About Us</Link>
                                        </li>
                                        <li>
                                            <Link href="/our-service">Services</Link>
                                        </li>
                                        <li>
                                            <Link href="/property-halfmap-grid">Properties</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-4">
                                <div className="space30 d-lg-none d-block" />
                                <div className="footer-widget-area foot-padding2">
                                    <h3>Near Place</h3>
                                    <ul>
                                        <li>
                                            <Link href="#">Barcelona </Link>
                                        </li>
                                        <li>
                                            <Link href="#">Valencia</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Los Angeles</Link>
                                        </li>
                                        <li>
                                            <Link href="#">New York</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Marbella</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-4">
                                <div className="space30 d-lg-none d-block" />
                                <div className="footer-widget-area">
                                    <h3>Contact Us</h3>
                                    <ul>
                                        <li>
                                            <Link href="tel:+11234567890" className="d-flex align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
                                                        stroke="#31353D"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                +1 123 456 7890
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="d-flex align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#31353D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#31353D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                421 Allen, Mexico 4233
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="mailto:Housa@gmailcom" className="d-flex align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                                                        stroke="#31353D"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Housa@gmailcom
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="d-flex align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <g clipPath="url(#clip0_6058_73821)">
                                                        <path d="M10 19C15.0741 19 19.1875 14.8866 19.1875 9.8125C19.1875 4.73838 15.0741 0.625 10 0.625C4.92588 0.625 0.8125 4.73838 0.8125 9.8125C0.8125 14.8866 4.92588 19 10 19Z" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M7.78641 18.7322C6.54344 16.9094 5.71289 13.597 5.71289 9.81335C5.71289 6.02973 6.54344 2.71733 7.78641 0.894531" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M0.8125 9.8125H19.1875" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.22656 14.7109H17.7726" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.22656 4.91406H17.7726" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.2148 0.894531C13.4578 2.71733 14.2884 6.02973 14.2884 9.81335C14.2884 13.597 13.4578 16.9094 12.2148 18.7322" stroke="#1B1B1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_6058_73821">
                                                            <rect width={20} height={20} fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                DemoHousa.com
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="space24" />
                        <div className="col-lg-12">
                            <div className="copyright-area">
                                <p>© 2025 Housa, Inc. All Rights Reserved.</p>
                                <ul>
                                    <li>
                                        <Link href="/privacy-policy">Privacy Policy</Link>
                                        <span> | </span>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">Terms Of Condition</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== FOOTER AREA ENDS =======*/}
        </>
    );
}
