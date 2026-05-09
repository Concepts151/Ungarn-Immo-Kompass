"use client";

import Link from "next/link";
import { useState } from "react";

export default function About1() {
    const [isExpanded, setIsExpanded] = useState(false);

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
                                    <h5>Welcome to Ungarn-Immo</h5>
                                    <div className="space16" />
                                    <h3 className="text-anime-style-2">Our Vision: Transparency Meets Community</h3>
                                </div>
                                <div className="space20" />
                                <div className="perag-bg">
                                    <p>
                                        We aren't just another real estate portal; we are your neighbors in Hungary. Many of you already know us through wir-in-ungarn.hu...
                                        {isExpanded && (
                                            <span>
                                                {" "}where we've built a reputation for providing honest and reliable information to the expat community. Ungarn-Immo was born out of a shared frustration: the traditional real estate market in Hungary often lacks the transparency that international buyers desperately need. We've seen too many "polished" photos that hide serious defects and too many buyers left alone with complex legal processes.
                                            </span>
                                        )}
                                    </p>
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#436f4d",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            padding: "0",
                                            marginTop: "8px",
                                            textDecoration: "underline"
                                        }}
                                    >
                                        {isExpanded ? "Show Less" : "Read More"}
                                    </button>
                                    <div className="space32" />
                                    <div className="btn-area1">
                                        <Link href="/search" className="vl-btn1">
                                            Explore Properties
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
