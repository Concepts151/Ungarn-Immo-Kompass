import Link from "next/link";

export default function Service2() {
    return (
        <>
            {/*===== SERVICE AREA STARTS =======*/}
            <div className="service1-inner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h2>Real Estate Tailored Solution</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="service-single-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img4.png" alt="housa" />
                                </div>
                                <div className="content-area">
                                    <div className="icons">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path d="M6.31818 19.2955C6.14639 16.9763 7.98171 15 10.3073 15H37.6927C40.0183 15 41.8536 16.9763 41.6818 19.2955L40.2744 38.2955C40.1197 40.3843 38.3798 42 36.2853 42H11.7147C9.62016 42 7.88032 40.3843 7.72559 38.2955L6.31818 19.2955Z" stroke="white" strokeWidth={3} strokeLinejoin="round" />
                                            <path d="M16 19V10C16 7.79086 17.7909 6 20 6H28C30.2091 6 32 7.79086 32 10V19" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 34H32" stroke="white" strokeWidth={3} strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <Link href="#">Buying Property</Link>
                                        <div className="space16" />
                                        <p>At Housa, we know that buying and home is one life’s biggest milestones, Our experienced team is here guide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="service-single-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img5.png" alt="housa" />
                                </div>
                                <div className="content-area">
                                    <div className="icons">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path
                                                d="M33.0007 13.5H39.1447C39.5163 13.5004 39.8746 13.6387 40.15 13.8881C40.4255 14.1375 40.5986 14.4803 40.6357 14.85L41.5507 24H38.5327L37.7827 16.5H33.0007V21C33.0007 21.3978 32.8427 21.7794 32.5614 22.0607C32.2801 22.342 31.8985 22.5 31.5007 22.5C31.1029 22.5 30.7214 22.342 30.4401 22.0607C30.1588 21.7794 30.0007 21.3978 30.0007 21V16.5H18.0007V21C18.0007 21.3978 17.8427 21.7794 17.5614 22.0607C17.2801 22.342 16.8985 22.5 16.5007 22.5C16.1029 22.5 15.7214 22.342 15.4401 22.0607C15.1588 21.7794 15.0007 21.3978 15.0007 21V16.5H10.2157L7.81572 40.5H24.0007V43.5H6.15672C5.94721 43.4998 5.74007 43.4557 5.54864 43.3706C5.35721 43.2854 5.18574 43.1611 5.04528 43.0057C4.90481 42.8502 4.79847 42.6671 4.73309 42.468C4.66772 42.269 4.64477 42.0585 4.66572 41.85L7.36572 14.85C7.40288 14.4803 7.57596 14.1375 7.85142 13.8881C8.12689 13.6387 8.48512 13.5004 8.85672 13.5H15.0007V12.453C15.0007 7.251 19.0087 3 24.0007 3C28.9927 3 33.0007 7.251 33.0007 12.453V13.503V13.5ZM30.0007 13.5V12.453C30.0007 8.871 27.2947 6 24.0007 6C20.7067 6 18.0007 8.871 18.0007 12.453V13.503H30.0007V13.5ZM39.4417 36.18L36.0007 32.742V43.5C36.0007 43.8978 35.8427 44.2794 35.5614 44.5607C35.2801 44.842 34.8985 45 34.5007 45C34.1029 45 33.7214 44.842 33.4401 44.5607C33.1588 44.2794 33.0007 43.8978 33.0007 43.5V32.742L29.5627 36.18C29.4244 36.3233 29.2588 36.4375 29.0758 36.5162C28.8928 36.5948 28.696 36.6361 28.4968 36.6379C28.2977 36.6396 28.1001 36.6017 27.9158 36.5262C27.7314 36.4508 27.564 36.3394 27.4231 36.1986C27.2823 36.0578 27.1709 35.8903 27.0955 35.7059C27.0201 35.5216 26.9821 35.3241 26.9838 35.1249C26.9856 34.9257 27.027 34.7289 27.1056 34.5459C27.1842 34.3629 27.2985 34.1974 27.4417 34.059L33.4417 28.059C33.723 27.7778 34.1045 27.6198 34.5022 27.6198C34.9 27.6198 35.2814 27.7778 35.5627 28.059L41.5627 34.059C41.706 34.1974 41.8203 34.3629 41.8989 34.5459C41.9775 34.7289 42.0189 34.9257 42.0206 35.1249C42.0223 35.3241 41.9844 35.5216 41.909 35.7059C41.8335 35.8903 41.7222 36.0578 41.5813 36.1986C41.4405 36.3394 41.273 36.4508 41.0887 36.5262C40.9043 36.6017 40.7068 36.6396 40.5076 36.6379C40.3084 36.6361 40.1116 36.5948 39.9286 36.5162C39.7456 36.4375 39.5801 36.3233 39.4417 36.18Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <Link href="#">Sell Property</Link>
                                        <div className="space16" />
                                        <p>Selling your home doesn’t have to be overwhelming. With Housa, our and dedicated experts will make process.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="service-single-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/service/service-img6.png" alt="housa" />
                                </div>
                                <div className="content-area">
                                    <div className="icons">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path d="M19 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V29" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M42 19L38.3162 7.94868C38.1416 7.42474 37.5753 7.14158 37.0513 7.31623L26 11" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M38 7C33 22 30 25 20 29" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <Link href="#">Renting Property</Link>
                                        <div className="space16" />
                                        <p>Finding the right rental property is easy with Housebox. Whether you’re seeking a cozy apartment spacious.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== SERVICE AREA ENDS =======*/}
        </>
    );
}
