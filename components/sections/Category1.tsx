"use client";
import { useGetPropertyTypesQuery } from "@/state/api";
import Link from "next/link";
import { useTranslations } from "next-intl";

function wordFormat(propertyType: string): string {
  return propertyType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function Category1() {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Common");
  const { data: PropertyTypes } = useGetPropertyTypesQuery();
  
  return (
    <>
      <div className="space30"></div>
      <div className="category1">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 m-auto">
              <div className="heading1 text-center space-margin60">
                <h5>{t('Category_subtitle')}</h5>
                <div className="space16" />
                <h2 className="text-anime-style-3">
                  {t('Category_title')}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {
              /* Dynamically render property types if available */

              PropertyTypes &&
                PropertyTypes.data.byPropertyType.map(
                  (type: any, index: number) => {
                    const duration = 800 + index * 100;
                    const typeKey = type.propertyType.toLowerCase();
                    return (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6"
                        data-aos="zoom-in-up"
                        data-aos-duration={duration}
                      >
                        <div className="category-boxarea">
                          <div className="img1">
                            <img
                              src={`/assets/img/all-images/category/ca-img${
                                index + 1
                              }.png`}
                              alt="housa"
                            />
                          </div>
                          <div className="text">
                            <Link href={`/search?propertyType=${type.propertyType}`}>
                              {tc.has(typeKey) 
                                ? tc(typeKey) 
                                : wordFormat(type.propertyType)}
                            </Link>
                            <div className="space16" />
                            <p>{tc('properties_count', { count: type.count })}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
            }
          </div>
        </div>
      </div>
    </>
  );
}
