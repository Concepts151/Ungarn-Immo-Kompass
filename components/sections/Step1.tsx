import Link from "next/link";
export default function Step1() {
    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="step1 sp2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h5>Our Simple Steps</h5>
                                <div className="space16" />
                                <h2>Real Estate Made Easy</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6" data-aos="zoom-in-up" data-aos-duration={900}>
                            <div className="work-single-boxarea">
                                <img src="/assets/img/elements/elements4.png" alt="housa" className="elements4" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/work/work-img1.png" alt="housa" />
                                </div>
                                <div className="space56" />
                                <div className="textarea">
                                    <span>1</span>
                                    <div className="space18" />
                                    <Link href="/our-service">On Discussion</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="zoom-in-up" data-aos-duration={1000}>
                            <div className="work-single-boxarea">
                                <img src="/assets/img/elements/elements4.png" alt="housa" className="elements4 d-lg-block d-none" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/work/work-img2.png" alt="housa" />
                                </div>
                                <div className="space56" />
                                <div className="textarea">
                                    <span>2</span>
                                    <div className="space18" />
                                    <Link href="/our-service">Buy A New Home</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="zoom-in-up" data-aos-duration={1100}>
                            <div className="work-single-boxarea">
                                <img src="/assets/img/elements/elements4.png" alt="housa" className="elements4" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/work/work-img3.png" alt="housa" />
                                </div>
                                <div className="space56" />
                                <div className="textarea">
                                    <span>3</span>
                                    <div className="space18" />
                                    <Link href="/our-service">Rent A Home</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="zoom-in-up" data-aos-duration={1200}>
                            <div className="work-single-boxarea box2">
                                <img src="/assets/img/elements/elements4.png" alt="housa" className="elements4" />
                                <div className="img1">
                                    <img src="/assets/img/all-images/work/work-img4.png" alt="housa" />
                                </div>
                                <div className="space56" />
                                <div className="textarea">
                                    <span>4</span>
                                    <div className="space18" />
                                    <Link href="/our-service">Sell A Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OTHERS AREA ENDS =======*/}
        </>
    );
}
