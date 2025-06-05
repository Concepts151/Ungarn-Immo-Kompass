"use client";

import { useReducer, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPropertyById } from "@/services/propertyService";
import { PropertyDetail } from "@/types/property";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Define reducer state and actions
interface Properties1DetailsState {
    thumbsSwiper: SwiperCore | null;
    property: PropertyDetail | null;
    loading: boolean;
    error: string | null;
}
type Properties1DetailsAction =
    | { type: 'SET_THUMBS_SWIPER'; payload: SwiperCore | null }
    | { type: 'SET_PROPERTY'; payload: PropertyDetail | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: Properties1DetailsState = {
    thumbsSwiper: null,
    property: null,
    loading: true,
    error: null,
};

function properties1DetailsReducer(state: Properties1DetailsState, action: Properties1DetailsAction): Properties1DetailsState {
    switch (action.type) {
        case 'SET_THUMBS_SWIPER':
            return { ...state, thumbsSwiper: action.payload };
        case 'SET_PROPERTY':
            return { ...state, property: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default function Properties1Details() {
    const [state, dispatch] = useReducer(properties1DetailsReducer, initialState);
    const { thumbsSwiper, property, loading, error } = state;

    const params = useParams();
    const propertyId = params.id as string;

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const response = await getPropertyById(propertyId);
                dispatch({ type: 'SET_PROPERTY', payload: response.data });
                dispatch({ type: 'SET_ERROR', payload: null });
            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to load property details' });
                console.error(err);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        if (propertyId) {
            fetchPropertyData();
        }
    }, [propertyId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!property) {
        return <div>Property not found</div>;
    }

    // Convert images object to array
    const imageArray = Object.values(property.images);

    return (
        <>
            {/*===== PROPERTIES AREA STARTS =======*/}
            <div className="properties2-details">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7">
                            <Swiper
                                modules={[Autoplay, Pagination, Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                                spaceBetween={0}
                                autoplay={{ delay: 2500 }}
                                freeMode={true}
                                slidesPerView={1}
                                data-aos="fade-left"
                                data-aos-duration={1000}
                                className="all-galler-images2"
                            >
                                {imageArray.map((image, index) => (
                                    <SwiperSlide key={index} className="big-img">
                                        <img src={image} alt={property.keyword} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={(swiper) => dispatch({ type: 'SET_THUMBS_SWIPER', payload: swiper })}
                                modules={[Pagination, Thumbs]}
                                spaceBetween={10}
                                pagination={{ el: ".swiper-pagination", clickable: true }}
                                freeMode={true}
                                slidesPerView={3}
                                watchSlidesProgress={true}
                                data-aos="fade-right"
                                data-aos-duration={1100}
                                className="bottom-galler-images2"
                            >
                                {imageArray.map((image, index) => (
                                    <SwiperSlide key={index} className="small-img">
                                        <img src={image} alt={property.keyword} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </div>
                        <div className="col-lg-5">
                            <div className="heading1">
                                <div className="content-area">
                                    <h2 className="title">
                                        {property.keyword}
                                    </h2>
                                    <div className="space32" />
                                    <p>
                                        <span className="s-tiltle2">Location:</span>
                                        {`${property.address}, ${property.city}, ${property.state}`}
                                    </p>
                                    <div className="space24" />
                                    <div className="property-other-widget">
                                        <ul>
                                            <li>
                                                <span className="s-tiltle">Features:</span>
                                            </li>
                                            <li>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                {property.minSize}-{property.maxSize} sqft
                                            </li>
                                            <li>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                {property.bedrooms} Beds
                                            </li>
                                            <li>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                {property.bathrooms} Baths
                                            </li>
                                        </ul>
                                        <div className="space32" />
                                        <div className="btn-area">
                                            <div className="nm-btn">
                                                <p>
                                                    <Link href="#">${property.minPrice.toLocaleString()}</Link> - For {property.status}
                                                </p>
                                            </div>
                                            <div className="love-share">
                                                <Link href="javascript:void(0)" className="heart">
                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" />
                                                    <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTIES AREA ENDS =======*/}
        </>
    );
}
