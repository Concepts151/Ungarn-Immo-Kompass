import Link from "next/link";

export default function Team3() {
    return (
        <>
            {/*===== TEAM AREA STARTS =======*/}
            <div
                className="team3 sp2"
                style={{
                    backgroundImage: "url(assets/img/all-images/bg/team-bg1.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h5>Meet Our Expert Team</h5>
                                <div className="space16" />
                                <h2>Trusted Real Estate Professionals</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="team-widget-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/team/team-img1.png" alt="housa" />
                                    <div className="share">
                                        <Link href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                                <path
                                                    d="M15.1352 19.6467L10.4115 17.07C9.59027 17.9477 8.42169 18.4961 7.125 18.4961C4.63972 18.4961 2.625 16.4813 2.625 13.9961C2.625 11.5108 4.63972 9.49609 7.125 9.49609C8.42162 9.49609 9.59016 10.0445 10.4113 10.922L15.1352 8.34537C15.0469 7.99356 15 7.6253 15 7.24609C15 4.76081 17.0148 2.74609 19.5 2.74609C21.9852 2.74609 24 4.76081 24 7.24609C24 9.73138 21.9852 11.7461 19.5 11.7461C18.2033 11.7461 17.0348 11.1977 16.2135 10.3201L11.4897 12.8967C11.5781 13.2485 11.625 13.6169 11.625 13.9961C11.625 14.3753 11.5781 14.7435 11.4898 15.0953L16.2136 17.672C17.0348 16.7945 18.2033 16.2461 19.5 16.2461C21.9852 16.2461 24 18.2609 24 20.7461C24 23.2313 21.9852 25.2461 19.5 25.2461C17.0148 25.2461 15 23.2313 15 20.7461C15 20.3669 15.0469 19.9985 15.1352 19.6467ZM7.125 16.2461C8.36764 16.2461 9.375 15.2388 9.375 13.9961C9.375 12.7534 8.36764 11.7461 7.125 11.7461C5.88236 11.7461 4.875 12.7534 4.875 13.9961C4.875 15.2388 5.88236 16.2461 7.125 16.2461ZM19.5 9.49609C20.7427 9.49609 21.75 8.48874 21.75 7.24609C21.75 6.00345 20.7427 4.99609 19.5 4.99609C18.2573 4.99609 17.25 6.00345 17.25 7.24609C17.25 8.48874 18.2573 9.49609 19.5 9.49609ZM19.5 22.9961C20.7427 22.9961 21.75 21.9888 21.75 20.7461C21.75 19.5034 20.7427 18.4961 19.5 18.4961C18.2573 18.4961 17.25 19.5034 17.25 20.7461C17.25 21.9888 18.2573 22.9961 19.5 22.9961Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
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
                                <div className="space20" />
                                <div className="textarea">
                                    <Link href="#">Henry Nicolas</Link>
                                    <div className="space12" />
                                    <p>Founder &amp; CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-widget-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/team/team-img2.png" alt="housa" />
                                    <div className="share">
                                        <Link href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                                <path
                                                    d="M15.1352 19.6467L10.4115 17.07C9.59027 17.9477 8.42169 18.4961 7.125 18.4961C4.63972 18.4961 2.625 16.4813 2.625 13.9961C2.625 11.5108 4.63972 9.49609 7.125 9.49609C8.42162 9.49609 9.59016 10.0445 10.4113 10.922L15.1352 8.34537C15.0469 7.99356 15 7.6253 15 7.24609C15 4.76081 17.0148 2.74609 19.5 2.74609C21.9852 2.74609 24 4.76081 24 7.24609C24 9.73138 21.9852 11.7461 19.5 11.7461C18.2033 11.7461 17.0348 11.1977 16.2135 10.3201L11.4897 12.8967C11.5781 13.2485 11.625 13.6169 11.625 13.9961C11.625 14.3753 11.5781 14.7435 11.4898 15.0953L16.2136 17.672C17.0348 16.7945 18.2033 16.2461 19.5 16.2461C21.9852 16.2461 24 18.2609 24 20.7461C24 23.2313 21.9852 25.2461 19.5 25.2461C17.0148 25.2461 15 23.2313 15 20.7461C15 20.3669 15.0469 19.9985 15.1352 19.6467ZM7.125 16.2461C8.36764 16.2461 9.375 15.2388 9.375 13.9961C9.375 12.7534 8.36764 11.7461 7.125 11.7461C5.88236 11.7461 4.875 12.7534 4.875 13.9961C4.875 15.2388 5.88236 16.2461 7.125 16.2461ZM19.5 9.49609C20.7427 9.49609 21.75 8.48874 21.75 7.24609C21.75 6.00345 20.7427 4.99609 19.5 4.99609C18.2573 4.99609 17.25 6.00345 17.25 7.24609C17.25 8.48874 18.2573 9.49609 19.5 9.49609ZM19.5 22.9961C20.7427 22.9961 21.75 21.9888 21.75 20.7461C21.75 19.5034 20.7427 18.4961 19.5 18.4961C18.2573 18.4961 17.25 19.5034 17.25 20.7461C17.25 21.9888 18.2573 22.9961 19.5 22.9961Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
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
                                <div className="space20" />
                                <div className="textarea">
                                    <Link href="#">Sarah Johnson</Link>
                                    <div className="space12" />
                                    <p>Real Estate Agent</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-widget-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/team/team-img3.png" alt="housa" />
                                    <div className="share">
                                        <Link href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                                <path
                                                    d="M15.1352 19.6467L10.4115 17.07C9.59027 17.9477 8.42169 18.4961 7.125 18.4961C4.63972 18.4961 2.625 16.4813 2.625 13.9961C2.625 11.5108 4.63972 9.49609 7.125 9.49609C8.42162 9.49609 9.59016 10.0445 10.4113 10.922L15.1352 8.34537C15.0469 7.99356 15 7.6253 15 7.24609C15 4.76081 17.0148 2.74609 19.5 2.74609C21.9852 2.74609 24 4.76081 24 7.24609C24 9.73138 21.9852 11.7461 19.5 11.7461C18.2033 11.7461 17.0348 11.1977 16.2135 10.3201L11.4897 12.8967C11.5781 13.2485 11.625 13.6169 11.625 13.9961C11.625 14.3753 11.5781 14.7435 11.4898 15.0953L16.2136 17.672C17.0348 16.7945 18.2033 16.2461 19.5 16.2461C21.9852 16.2461 24 18.2609 24 20.7461C24 23.2313 21.9852 25.2461 19.5 25.2461C17.0148 25.2461 15 23.2313 15 20.7461C15 20.3669 15.0469 19.9985 15.1352 19.6467ZM7.125 16.2461C8.36764 16.2461 9.375 15.2388 9.375 13.9961C9.375 12.7534 8.36764 11.7461 7.125 11.7461C5.88236 11.7461 4.875 12.7534 4.875 13.9961C4.875 15.2388 5.88236 16.2461 7.125 16.2461ZM19.5 9.49609C20.7427 9.49609 21.75 8.48874 21.75 7.24609C21.75 6.00345 20.7427 4.99609 19.5 4.99609C18.2573 4.99609 17.25 6.00345 17.25 7.24609C17.25 8.48874 18.2573 9.49609 19.5 9.49609ZM19.5 22.9961C20.7427 22.9961 21.75 21.9888 21.75 20.7461C21.75 19.5034 20.7427 18.4961 19.5 18.4961C18.2573 18.4961 17.25 19.5034 17.25 20.7461C17.25 21.9888 18.2573 22.9961 19.5 22.9961Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
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
                                <div className="space20" />
                                <div className="textarea">
                                    <Link href="#">Sohia Rodriguez</Link>
                                    <div className="space12" />
                                    <p>Marketing Director</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-widget-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/team/team-img4.png" alt="housa" />
                                    <div className="share">
                                        <Link href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                                <path
                                                    d="M15.1352 19.6467L10.4115 17.07C9.59027 17.9477 8.42169 18.4961 7.125 18.4961C4.63972 18.4961 2.625 16.4813 2.625 13.9961C2.625 11.5108 4.63972 9.49609 7.125 9.49609C8.42162 9.49609 9.59016 10.0445 10.4113 10.922L15.1352 8.34537C15.0469 7.99356 15 7.6253 15 7.24609C15 4.76081 17.0148 2.74609 19.5 2.74609C21.9852 2.74609 24 4.76081 24 7.24609C24 9.73138 21.9852 11.7461 19.5 11.7461C18.2033 11.7461 17.0348 11.1977 16.2135 10.3201L11.4897 12.8967C11.5781 13.2485 11.625 13.6169 11.625 13.9961C11.625 14.3753 11.5781 14.7435 11.4898 15.0953L16.2136 17.672C17.0348 16.7945 18.2033 16.2461 19.5 16.2461C21.9852 16.2461 24 18.2609 24 20.7461C24 23.2313 21.9852 25.2461 19.5 25.2461C17.0148 25.2461 15 23.2313 15 20.7461C15 20.3669 15.0469 19.9985 15.1352 19.6467ZM7.125 16.2461C8.36764 16.2461 9.375 15.2388 9.375 13.9961C9.375 12.7534 8.36764 11.7461 7.125 11.7461C5.88236 11.7461 4.875 12.7534 4.875 13.9961C4.875 15.2388 5.88236 16.2461 7.125 16.2461ZM19.5 9.49609C20.7427 9.49609 21.75 8.48874 21.75 7.24609C21.75 6.00345 20.7427 4.99609 19.5 4.99609C18.2573 4.99609 17.25 6.00345 17.25 7.24609C17.25 8.48874 18.2573 9.49609 19.5 9.49609ZM19.5 22.9961C20.7427 22.9961 21.75 21.9888 21.75 20.7461C21.75 19.5034 20.7427 18.4961 19.5 18.4961C18.2573 18.4961 17.25 19.5034 17.25 20.7461C17.25 21.9888 18.2573 22.9961 19.5 22.9961Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
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
                                <div className="space20" />
                                <div className="textarea">
                                    <Link href="#">Daniel Williams</Link>
                                    <div className="space12" />
                                    <p>Services Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== TEAM AREA ENDS =======*/}
        </>
    );
}
