import Link from "next/link";

export default function DashboardArea() {
    return (
        <>
            <div className="dashboard-section-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="space30" />
                            <div className="dashboad-all-details-section">
                                <h3>New Listing</h3>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="input-area">
                                            <form>
                                                <input type="text" placeholder="Search" />
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="input-area">
                                            <form>
                                                <input type="date" />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="input-area">
                                            <div className="nice-select" tabIndex={0}>
                                                <span className="current">Select</span>
                                                <ul className="list">
                                                    <li data-value={1} className="option">
                                                        Today
                                                    </li>
                                                    <li data-value={2} className="option selected">
                                                        Yesterday
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space28" />
                                    <h4 className="found">60 Result Found</h4>
                                    <div className="space20" />
                                    <div className="table-container">
                                        {/* Header */}
                                        <div className="table-header">
                                            <div className="w-75">Listing</div>
                                            <div className="w-25">Action</div>
                                        </div>
                                        {/* Row 1 */}
                                        <div className="table-row">
                                            <div className="property-tab-boxarea w-lg-75">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6">
                                                        <div className="img1 image-anime">
                                                            <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="content-tab-area">
                                                            <div className="property-price">
                                                                <div className="text">
                                                                    <Link href="#" className="title">
                                                                        Luxury Skyline Villa
                                                                    </Link>
                                                                    <div className="space16" />
                                                                    <p>199 Oakway Lane, Woodland </p>
                                                                </div>
                                                                <Link href="#" className="price">
                                                                    $82,000
                                                                </Link>
                                                            </div>
                                                            <div className="space20" />
                                                            <div className="property-other-widget">
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
                                                                <div className="space24" />
                                                                <div className="btn-area">
                                                                    <div className="name-area">
                                                                        <div className="img">
                                                                            <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                        </div>
                                                                        <div className="text">
                                                                            <Link href="#">Santiago Towne</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="love-share">
                                                                        <Link href="javascript:void(0)" className="heart">
                                                                            <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                        </Link>
                                                                        <Link href="#" className="share">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                                <path
                                                                                    d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                                    fill="#ED8438"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actions w-lg-25">
                                                <button className="edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="sold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.0943 5.68009L18.3199 16.9057C19.3736 15.5506 20 13.8491 20 12C20 7.58172 16.4183 4 12 4C10.1509 4 8.44939 4.62644 7.0943 5.68009ZM16.9057 18.3199L5.68009 7.0943C4.62644 8.44939 4 10.1509 4 12C4 16.4183 7.58172 20 12 20C13.8491 20 15.5506 19.3736 16.9057 18.3199ZM4.92893 4.92893C6.73748 3.12038 9.23885 2 12 2C17.5228 2 22 6.47715 22 12C22 14.7611 20.8796 17.2625 19.0711 19.0711C17.2625 20.8796 14.7611 22 12 22C6.47715 22 2 17.5228 2 12C2 9.23885 3.12038 6.73748 4.92893 4.92893Z" />
                                                    </svg>
                                                    Sold
                                                </button>
                                                <button className="delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {/* Row 2 */}
                                        <div className="table-row">
                                            <div className="property-tab-boxarea w-lg-75">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6">
                                                        <div className="img1 image-anime">
                                                            <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="content-tab-area">
                                                            <div className="property-price">
                                                                <div className="text">
                                                                    <Link href="#" className="title">
                                                                        Golden Oaks Residence
                                                                    </Link>
                                                                    <div className="space16" />
                                                                    <p>199 Oakway Lane, Woodland </p>
                                                                </div>
                                                                <Link href="#" className="price">
                                                                    $82,000
                                                                </Link>
                                                            </div>
                                                            <div className="space20" />
                                                            <div className="property-other-widget">
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
                                                                <div className="space24" />
                                                                <div className="btn-area">
                                                                    <div className="name-area">
                                                                        <div className="img">
                                                                            <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                        </div>
                                                                        <div className="text">
                                                                            <Link href="#">Santiago Towne</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="love-share">
                                                                        <Link href="javascript:void(0)" className="heart">
                                                                            <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                        </Link>
                                                                        <Link href="#" className="share">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                                <path
                                                                                    d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                                    fill="#ED8438"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actions w-lg-25">
                                                <button className="edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="sold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.0943 5.68009L18.3199 16.9057C19.3736 15.5506 20 13.8491 20 12C20 7.58172 16.4183 4 12 4C10.1509 4 8.44939 4.62644 7.0943 5.68009ZM16.9057 18.3199L5.68009 7.0943C4.62644 8.44939 4 10.1509 4 12C4 16.4183 7.58172 20 12 20C13.8491 20 15.5506 19.3736 16.9057 18.3199ZM4.92893 4.92893C6.73748 3.12038 9.23885 2 12 2C17.5228 2 22 6.47715 22 12C22 14.7611 20.8796 17.2625 19.0711 19.0711C17.2625 20.8796 14.7611 22 12 22C6.47715 22 2 17.5228 2 12C2 9.23885 3.12038 6.73748 4.92893 4.92893Z" />
                                                    </svg>
                                                    Sold
                                                </button>
                                                <button className="delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {/* Row 3 */}
                                        <div className="table-row">
                                            <div className="property-tab-boxarea w-lg-75">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6">
                                                        <div className="img1 image-anime">
                                                            <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="content-tab-area">
                                                            <div className="property-price">
                                                                <div className="text">
                                                                    <Link href="#" className="title">
                                                                        Tranquil Breeze Villa
                                                                    </Link>
                                                                    <div className="space16" />
                                                                    <p>199 Oakway Lane, Woodland </p>
                                                                </div>
                                                                <Link href="#" className="price">
                                                                    $82,000
                                                                </Link>
                                                            </div>
                                                            <div className="space20" />
                                                            <div className="property-other-widget">
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
                                                                <div className="space24" />
                                                                <div className="btn-area">
                                                                    <div className="name-area">
                                                                        <div className="img">
                                                                            <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                        </div>
                                                                        <div className="text">
                                                                            <Link href="#">Santiago Towne</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="love-share">
                                                                        <Link href="javascript:void(0)" className="heart">
                                                                            <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                        </Link>
                                                                        <Link href="#" className="share">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                                <path
                                                                                    d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                                    fill="#ED8438"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actions w-lg-25">
                                                <button className="edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="sold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.0943 5.68009L18.3199 16.9057C19.3736 15.5506 20 13.8491 20 12C20 7.58172 16.4183 4 12 4C10.1509 4 8.44939 4.62644 7.0943 5.68009ZM16.9057 18.3199L5.68009 7.0943C4.62644 8.44939 4 10.1509 4 12C4 16.4183 7.58172 20 12 20C13.8491 20 15.5506 19.3736 16.9057 18.3199ZM4.92893 4.92893C6.73748 3.12038 9.23885 2 12 2C17.5228 2 22 6.47715 22 12C22 14.7611 20.8796 17.2625 19.0711 19.0711C17.2625 20.8796 14.7611 22 12 22C6.47715 22 2 17.5228 2 12C2 9.23885 3.12038 6.73748 4.92893 4.92893Z" />
                                                    </svg>
                                                    Sold
                                                </button>
                                                <button className="delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="pagination-area" style={{ textAlign: "start" }}>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#" aria-label="Previous">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                                                            </svg>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link active" href="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            ....
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            12
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#" aria-label="Next">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                                                            </svg>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
