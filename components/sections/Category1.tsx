import Link from "next/link";

export default function Category1() {
    return (
        <>
            <div className="space30"></div>
            <div className="category1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Category</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Select The Home That Suits You</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={800}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img1.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Apartment</Link>
                                    <div className="space16" />
                                    <p>17 Properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={900}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img2.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Commercial</Link>
                                    <div className="space16" />
                                    <p>10 Propertiess</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={1000}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img3.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Office</Link>
                                    <div className="space16" />
                                    <p>8 Properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={1100}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img4.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Residential</Link>
                                    <div className="space16" />
                                    <p>21 Properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={1200}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img5.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Studio</Link>
                                    <div className="space16" />
                                    <p>06 Properties</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-duration={1300}>
                            <div className="category-boxarea">
                                <div className="img1">
                                    <img src="/assets/img/all-images/category/ca-img6.png" alt="housa" />
                                </div>
                                <div className="text">
                                    <Link href="/topmap-grid">Duplex Villa</Link>
                                    <div className="space16" />
                                    <p>2 Properties</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
