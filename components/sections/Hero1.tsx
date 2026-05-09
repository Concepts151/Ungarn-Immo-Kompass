import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Hero1() {
  const t = await getTranslations("HomePage");
  return (
    <>
      {/* <style jsx>
        {`
          .no-word-break {
            word-break: keep-all !important;
            overflow-wrap: normal !important;
            white-space: normal !important;
          }
        `}
      </style> */}
      <div className="hero1-section-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-heading-content heading1 no-word-break">
                <h1 className="fw-bold" data-aos="fade-right" data-aos-duration={1000}>
                  {t("Hero_h1")}
                </h1>
                <div className="space20" />
                <p className="mb-0" data-aos="fade-right" data-aos-duration={1200}>
                  {t("Hero_p")}
                  
                </p>
                <div className="space32" />
                <div
                  className="btn-area1"
                  data-aos="fade-left"
                  data-aos-duration={1000}
                >
                  <Link href="/search" className="vl-btn1">
                    {t("add-listing-btn")}
                    <span className="arrow1 ms-2">
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                    <span className="arrow2 ms-2">
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                </div>
                <div className="space80 d-lg-block d-none" />
                <div className="space40 d-lg-none d-block" />
                <div className="counter-boxarea">
                  <div className="row">
                    <div
                      className="col-lg-4 col-md-4 col-6"
                      data-aos="fade-up"
                      data-aos-duration={300}
                    >
                      <div className="counter-box">
                        <h1>
                          <span
                            className="odometer text-nowrap"
                            data-count={180}
                          />
                          +
                        </h1>
                        <div className="space10" />
                        <p>{t("Hero_bp")}</p>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-4 col-6"
                      data-aos="fade-up"
                      data-aos-duration={500}
                    >
                      <div className="counter-box">
                        <h1>
                          <span
                            className="odometer text-nowrap"
                            data-count={120}
                          />
                          +
                        </h1>
                        <div className="space10" />
                        <p>{t("Hero_sp")}</p>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-4 col-12"
                      data-aos="fade-up"
                      data-aos-duration={700}
                    >
                      <div className="space30 d-md-none d-block" />
                      <div className="counter-box">
                        <h1>
                          <span
                            className="odometer text-nowrap"
                            data-count={150}
                          />
                          +
                        </h1>
                        <div className="space10" />
                        <p>{t("Hero_pa")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-images-area image-anime">
                {/* <img
                  src="/assets/img/all-images/hero/hero-img1.png"
                  alt="housa"
                /> */}
                <img
                  src="https://images.pexels.com/photos/2350351/pexels-photo-2350351.jpeg"
                  alt="Hungary"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space20" />
    </>
  );
}
