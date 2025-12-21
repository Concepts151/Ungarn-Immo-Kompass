"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGetVillagesQuery } from "@/state/api";

export default function PropertyLocation1() {
    const t = useTranslations("HomePage");
    const tc = useTranslations("Common");
    
    const { data: villagesData, isLoading } = useGetVillagesQuery({ limit: 6 });
    const villages = villagesData?.villages || [];

    const getColClass = (index: number) => {
        // Pattern: 3, 3, 6, 6, 3, 3
        const pattern = [3, 3, 6, 6, 3, 3];
        const size = pattern[index % pattern.length];
        return `col-lg-${size} col-md-6`;
    };

    return (
        <>
            <div className="space30"></div>

            <div className="p-location1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>{t('Location_subtitle')}</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">{t('Location_title')}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {isLoading ? (
                            <div className="col-12 text-center">Loading villages...</div>
                        ) : villages.length === 0 ? (
                            <div className="col-12 text-center">No villages found.</div>
                        ) : (
                            villages.map((village, index) => (
                                <div 
                                    key={village.id} 
                                    className={getColClass(index)} 
                                    data-aos="fade-up" 
                                    data-aos-duration={800 + (index * 100)}
                                >
                                    <div className="p-location-boxarea">
                                        <div className="img1">
                                            <img 
                                                src={village.thumbnailUrl || `/assets/img/all-images/p-location/p-loaction-img${(index % 6) + 1}.png`} 
                                                alt={village.name} 
                                            />
                                        </div>
                                        <div className="content-area">
                                            <Link href={`/search?location=${village.name}`}>{village.name}</Link>
                                            <div className="space12" />
                                            <p>{tc('properties_count', { count: village._count?.exposes || 0 })}</p>
                                        </div>
                                        <div className="arrow">
                                            <Link href={`/search?location=${village.name}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                    <path d="M6.52264 22.168L20.5226 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.14764 8.16797H20.5226V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
