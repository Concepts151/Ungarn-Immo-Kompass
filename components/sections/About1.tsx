import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function About1() {
    const t = await getTranslations("HomePage");
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
                                    <h5>{t('About_subtitle')}</h5>
                                    <div className="space16" />
                                    <h3 className="text-anime-style-2">{t('About_title')}</h3>
                                </div>
                                <div className="space20" />
                                <div className="perag-bg">
                                    <p>
                                        {t('About_description')}
                                    </p>
                                    <div className="space32" />
                                    <div className="btn-area1">
                                        <Link href="/my-property" className="vl-btn1">
                                            {t('About_btn')}
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
