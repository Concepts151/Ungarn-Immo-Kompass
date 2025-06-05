import Link from "next/link";
import ContactSeller from "@/components/elements/ContactSeller";

export default function PropertyInner({ block_extend }: any) {
    return (
        <>
            {/*===== PROPERTY AREA STARTS =======*/}
            <div className="property-inner-section-find">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="property-mapgrid-area">
                                <div className="space32" />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="sidebar1-area">
                                            <ContactSeller
                                                agentName="Shagor Ahmed"
                                                agentImage="/assets/img/all-images/others/others-img7.png"
                                                agentEmail="housa@.com"
                                                agentPhone="(234) 345-4574"
                                            />
                                            <div className="space30" />


                                            <div className="space30" />
                                            <div className="property-latest">
                                                <h3>Recent added</h3>
                                                <div className="space8" />
                                                <div className="latest-proprty">
                                                    <div className="img1">
                                                        <Link href="/property-details-v1">
                                                            <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <Link href="/property-details-v1">Tranquil Villa</Link>
                                                        <div className="space12" />
                                                        <p>199 Oakway Lane, Woodland</p>
                                                        <div className="space8" />
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space12" />
                                                        <h3>$950,000</h3>
                                                    </div>
                                                </div>
                                                <div className="latest-proprty">
                                                    <div className="img1">
                                                        <Link href="/property-details-v1">
                                                            <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <Link href="/property-details-v1">Breeze Villa</Link>
                                                        <div className="space12" />
                                                        <p>199 Oakway Lane, Woodland</p>
                                                        <div className="space8" />
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space12" />
                                                        <h3>$6,500</h3>
                                                    </div>
                                                </div>
                                                <div className="latest-proprty">
                                                    <div className="img1">
                                                        <Link href="/property-details-v1">
                                                            <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <Link href="/property-details-v1">Tranquil Villa</Link>
                                                        <div className="space12" />
                                                        <p>199 Oakway Lane, Woodland</p>
                                                        <div className="space8" />
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space12" />
                                                        <h3>$950,000</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space30 d-lg-none d-block" />
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="property-widget-sidebar">
                                            <div className="img1">
                                                <img src="/assets/img/all-images/properties/property-img25.png" alt="housa" />
                                            </div>
                                            <div className="space40" />
                                            <div className="padding-side">
                                                <h3>About This Property</h3>
                                                <div className="space24" />
                                                <p>This stunning Apartment is located in the heart of Woodland, offering the perfect blend of modern comfort and timeless elegance. Designed for both functionality and style, this property features spacious rooms, high-quality finishes, and an inviting atmosphere that feels like home. Whether you're looking for a peaceful retreat or a prime investment opportunity, this property is a must-see.</p>
                                                <div className="space30" />
                                                <h3>What Makes This Property Special</h3>
                                                <div className="space12" />
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Modern Interior &amp; Finishes:</span> High-quality materials and contemporary designs.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Spacious Layout:</span> Open-concept living areas and well-planned spaces.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span> Prime Location:</span> Close to schools shopping, and public transport location.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Energy Efficient:</span> Equipped with smart home features and sustainable elements.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Secure &amp; Private: </span> Gated community security features for peace of mind.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <h3>Property Gallery, Explore The Space</h3>
                                                <div className="space32" />
                                                <div className="img2">
                                                    <img src="/assets/img/all-images/properties/property-img26.png" alt="housa" />
                                                    <div className="plus">
                                                        <Link href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                                <path d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z" fill="white" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="img2">
                                                            <img src="/assets/img/all-images/properties/property-img27.png" alt="housa" />
                                                            <div className="plus">
                                                                <Link href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                                        <path d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z" fill="white" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="img2">
                                                            <img src="/assets/img/all-images/properties/property-img28.png" alt="housa" />
                                                            <div className="plus">
                                                                <Link href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                                        <path d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z" fill="white" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="img2">
                                                            <img src="/assets/img/all-images/properties/property-img29.png" alt="housa" />
                                                            <div className="plus">
                                                                <Link href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                                        <path d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z" fill="white" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <h3>Everything You Need, Just Steps Away</h3>
                                                <div className="space12" />
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Schools:</span> Apartment Nearby Schools
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Healthcare: </span> Nearby Hospitals and Clinic.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span> Transport:</span> Metro, Bus Station, Highway &amp; Nearby International Airport.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Shopping &amp; Entertainment: </span> Malls, Markets, Entertainment Centers.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="others-box">
                                                            <img src="/assets/img/icons/check1.svg" alt="housa" />
                                                            <div className="text">
                                                                <p>
                                                                    <span>Park &amp; Recreation: </span> Parks Sport Center, Fitness Club, Swimming Center.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <h3>Floor Plan</h3>
                                                <div className="accordion-area">
                                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                    <span>First Floor</span>
                                                                    <span className="list">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                                <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                            </svg>
                                                                            2150 sqft
                                                                        </span>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                            </svg>
                                                                            5 Beds
                                                                        </span>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                            </svg>
                                                                            3 Baths
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            </h2>
                                                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                <div className="accordion-body">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/properties/property-img30.png" alt="housa" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                                    <span>Second Floor</span>
                                                                    <span className="list">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                                <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                            </svg>
                                                                            2150 sqft
                                                                        </span>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                            </svg>
                                                                            5 Beds
                                                                        </span>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                                <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                                <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                            </svg>
                                                                            3 Baths
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            </h2>
                                                            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                <div className="accordion-body">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/properties/property-img30.png" alt="housa" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <h3>Schedule A Viewing Book a Tour Today!</h3>
                                                <div className="space24" />
                                                <p>Interested in this property? Contact us today to schedule a viewing and experience it for yourself. Our real estate experts are here to guide you every step of the way.</p>
                                                <div className="space32" />
                                                <div className="contact-boxarea ms-0">
                                                    <h3>Get In Touch Now</h3>
                                                    <div className="space8" />
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="input-area">
                                                                <input type="text" placeholder="Your Name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-area">
                                                                <input type="text" placeholder="Last Name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-area">
                                                                <input type="number" placeholder="Phone Number " />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-area">
                                                                <input type="email" placeholder="Email Address" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="input-area">
                                                                <textarea placeholder="Your Message" defaultValue={""} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="space4" />
                                                            <div className="input-area">
                                                                <button type="submit" className="vl-btn1">
                                                                    Submit Now
                                                                    <span className="arrow1 ms-2">
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </span>
                                                                    <span className="arrow2 ms-2">
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space16" />
                                                <div className="contact-box">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={33} height={32} viewBox="0 0 33 32" fill="none">
                                                            <path
                                                                d="M5.83333 24.0013L12.5 16.0013M27.1667 24.0013L20.5 16.0013M4.5 10.668L14.1333 17.0901C14.9887 17.6604 15.4163 17.9456 15.8785 18.0562C16.2871 18.1542 16.7129 18.1542 17.1215 18.0562C17.5837 17.9456 18.0113 17.6604 18.8667 17.0901L28.5 10.668M8.76667 25.3346H24.2333C25.7268 25.3346 26.4736 25.3346 27.044 25.044C27.5457 24.7884 27.9537 24.3804 28.2093 23.8786C28.5 23.3082 28.5 22.5614 28.5 21.068V10.9346C28.5 9.44117 28.5 8.69442 28.2093 8.124C27.9537 7.62222 27.5457 7.21428 27.044 6.95862C26.4736 6.66797 25.7268 6.66797 24.2333 6.66797H8.76667C7.2732 6.66797 6.52645 6.66797 5.95603 6.95862C5.45425 7.21428 5.04631 7.62222 4.79065 8.124C4.5 8.69442 4.5 9.44116 4.5 10.9346V21.068C4.5 22.5614 4.5 23.3082 4.79065 23.8786C5.04631 24.3804 5.45425 24.7884 5.95603 25.044C6.52645 25.3346 7.27319 25.3346 8.76667 25.3346Z"
                                                                stroke="#ED8438"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <div className="text">
                                                        <p>Our Email</p>
                                                        <div className="space8" />
                                                        <Link href="#">Housarealestate@gmail.com / or / Housa1255@gmail.com</Link>
                                                    </div>
                                                </div>
                                                <div className="contact-box">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                            <path
                                                                d="M18.7333 7.99935C20.0357 8.25344 21.2325 8.89036 22.1708 9.8286C23.1091 10.7668 23.746 11.9637 24 13.266M18.7333 2.66602C21.4391 2.9666 23.9621 4.17824 25.8884 6.10203C27.8145 8.0258 29.0295 10.5474 29.3333 13.2527M24.6667 27.9993C13.2528 27.9993 4 18.7465 4 7.33268C4 6.81772 4.01884 6.30716 4.05585 5.80166C4.09833 5.22151 4.11957 4.93144 4.2716 4.66739C4.39752 4.4487 4.62067 4.2413 4.84797 4.13168C5.12241 3.99935 5.44251 3.99935 6.08268 3.99935H9.83909C10.3774 3.99935 10.6466 3.99935 10.8774 4.08795C11.0812 4.16622 11.2627 4.29334 11.4059 4.45815C11.568 4.64472 11.66 4.8977 11.844 5.40363L13.3988 9.67942C13.6128 10.2681 13.7199 10.5624 13.7017 10.8416C13.6857 11.0878 13.6016 11.3248 13.4589 11.5261C13.2971 11.7544 13.0286 11.9155 12.4915 12.2378L10.6667 13.3327C12.2692 16.8645 15.1335 19.7325 18.6667 21.3327L19.7616 19.5079C20.0839 18.9707 20.2449 18.7021 20.4732 18.5404C20.6745 18.3977 20.9115 18.3136 21.1577 18.2976C21.4369 18.2795 21.7313 18.3865 22.32 18.6005L26.5957 20.1553C27.1016 20.3393 27.3547 20.4313 27.5412 20.5935C27.706 20.7367 27.8332 20.9181 27.9113 21.122C28 21.3527 28 21.6219 28 22.1603V25.9167C28 26.5568 28 26.877 27.8676 27.1514C27.758 27.3787 27.5507 27.6019 27.332 27.7278C27.0679 27.8798 26.7779 27.9009 26.1977 27.9435C25.6921 27.9805 25.1816 27.9993 24.6667 27.9993Z"
                                                                stroke="#ED8438"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <div className="text">
                                                        <p>Call Us</p>
                                                        <div className="space8" />
                                                        <Link href="#">(618) 474-9169 / or / (765) 322-1399</Link>
                                                    </div>
                                                </div>
                                                <div className="contact-box">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M16.329 27.958C17.8625 26.5665 19.2817 25.0541 20.573 23.4353C23.293 20.018 24.9477 16.6487 25.0597 13.6527C25.104 12.4351 24.9024 11.221 24.4671 10.0831C24.0317 8.94509 23.3714 7.90654 22.5257 7.02947C21.6799 6.15239 20.6661 5.45477 19.5447 4.97829C18.4233 4.5018 17.2174 4.25622 15.999 4.25622C14.7806 4.25622 13.5747 4.5018 12.4533 4.97829C11.3319 5.45477 10.3181 6.15239 9.47235 7.02947C8.62661 7.90654 7.96634 8.94509 7.53095 10.0831C7.09557 11.221 6.89402 12.4351 6.93834 13.6527C7.05167 16.6487 8.70767 20.018 11.4263 23.4353C12.7176 25.0541 14.1369 26.5665 15.6703 27.958C15.8179 28.0913 15.9277 28.1882 15.9997 28.2487L16.329 27.958ZM15.0157 29.5114C15.0157 29.5114 5.33301 21.3567 5.33301 13.3327C5.33301 10.5037 6.45681 7.7906 8.4572 5.79021C10.4576 3.78982 13.1707 2.66602 15.9997 2.66602C18.8287 2.66602 21.5418 3.78982 23.5421 5.79021C25.5425 7.7906 26.6663 10.5037 26.6663 13.3327C26.6663 21.3567 16.9837 29.5114 16.9837 29.5114C16.445 30.0074 15.5583 30.002 15.0157 29.5114ZM15.9997 17.066C16.9898 17.066 17.9394 16.6727 18.6395 15.9725C19.3397 15.2724 19.733 14.3228 19.733 13.3327C19.733 12.3425 19.3397 11.393 18.6395 10.6928C17.9394 9.99268 16.9898 9.59935 15.9997 9.59935C15.0095 9.59935 14.0599 9.99268 13.3598 10.6928C12.6597 11.393 12.2663 12.3425 12.2663 13.3327C12.2663 14.3228 12.6597 15.2724 13.3598 15.9725C14.0599 16.6727 15.0095 17.066 15.9997 17.066ZM15.9997 18.666C14.5852 18.666 13.2286 18.1041 12.2284 17.1039C11.2282 16.1037 10.6663 14.7472 10.6663 13.3327C10.6663 11.9182 11.2282 10.5616 12.2284 9.56145C13.2286 8.56125 14.5852 7.99935 15.9997 7.99935C17.4142 7.99935 18.7707 8.56125 19.7709 9.56145C20.7711 10.5616 21.333 11.9182 21.333 13.3327C21.333 14.7472 20.7711 16.1037 19.7709 17.1039C18.7707 18.1041 17.4142 18.666 15.9997 18.666Z"
                                                                fill="#ED8438"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <div className="text">
                                                        <p>Visit us</p>
                                                        <div className="space8" />
                                                        <Link href="#">2825 Winding Way, Providence, RI 02908</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${block_extend}`}>
                                            <>
                                                <div className="space30" />
                                                <div className="bg1-property">
                                                    <h3>Map Locations</h3>
                                                    <div className="space32" />
                                                    <div className="map-section">
                                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                                        <div className="space12" />
                                                        <div className="list">
                                                            <ul>
                                                                <li>
                                                                    <span>Address:</span>
                                                                    <div>CA, USA</div>
                                                                </li>
                                                                <li>
                                                                    <span>City:</span>
                                                                    <div>Los Angeles</div>
                                                                </li>
                                                            </ul>
                                                            <ul className="m-0 ">
                                                                <li>
                                                                    <span>Postal Code:</span>
                                                                    <div>CA, USA</div>
                                                                </li>
                                                                <li>
                                                                    <span>Area Name:</span>
                                                                    <div>Los Angeles</div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <div className="comment-bg-area">
                                                    <h3>Comments (2)</h3>
                                                    <div className="space30" />
                                                    <div className="comments-boxarea">
                                                        <div className="comments-boxes">
                                                            <div className="comments-auhtor-box">
                                                                <div className="img3">
                                                                    <img src="/assets/img/all-images/others/others-img7.png" alt="housa" />
                                                                </div>
                                                                <div className="content">
                                                                    <Link href="#" className="date">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                            <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z" />
                                                                        </svg>
                                                                        8 December 2025
                                                                    </Link>
                                                                    <Link href="/about-us" className="name">
                                                                        Alex Robertson
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <Link href="#" className="reply">
                                                                <i className="fa-solid fa-reply" /> Reply
                                                            </Link>
                                                        </div>
                                                        <div className="space16" />
                                                        <p>This property looks absolutely stunning! The modern design and spacious layout really caught my attention. I'm particularly interested in the energy-efficient features—could you provide more details on the smart home integrations and sustainability aspects?</p>
                                                    </div>
                                                    <div className="space30" />
                                                    <div className="comments-boxarea box2">
                                                        <div className="comments-boxes">
                                                            <div className="comments-auhtor-box">
                                                                <div className="img3">
                                                                    <img src="/assets/img/all-images/others/others-img7.png" alt="housa" />
                                                                </div>
                                                                <div className="content">
                                                                    <Link href="#" className="date">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                            <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z" />
                                                                        </svg>
                                                                        12 May 2025
                                                                    </Link>
                                                                    <Link href="/about-us" className="name">
                                                                        Theo Hernandez
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <Link href="#" className="reply">
                                                                <i className="fa-solid fa-reply" /> Reply
                                                            </Link>
                                                        </div>
                                                        <div className="space16" />
                                                        <p>"This property looks like a dream home! The open-concept design and high-quality finishes are exactly what I've been looking for. I'm curious about the natural lighting and ventilation—do the large windows provide good airflow and sunlight throughout the day?</p>
                                                    </div>
                                                </div>
                                                <div className="space30" />
                                                <div className="contact-boxarea">
                                                    <div className="bg-area">
                                                        <h3>Send Us A Message</h3>
                                                        <div className="space8" />
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="text" placeholder="Your Name" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="text" placeholder="Last Name*" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="number" placeholder="Phone Number " />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="email" placeholder="Email Address*" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="input-area">
                                                                    <textarea placeholder="Write message" defaultValue={""} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="space16" />
                                                                <div className="input-area">
                                                                    <button type="submit" className="vl-btn1">
                                                                        Reply Now
                                                                        <span className="arrow1 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                        <span className="arrow2 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTY AREA ENDS =======*/}
        </>
    );
}
