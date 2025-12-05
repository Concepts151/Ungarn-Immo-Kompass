"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  useGetAuthUserQuery,
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from "@/state/api";
import { Property, PropertyMedia } from "@/types/api";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  spaceBetween: 30,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 3500,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return value.toLocaleString();
  }
}

const FavouritePropertyList = () => {
  // Get authenticated user
  const { data: authData, isLoading: authLoading } = useGetAuthUserQuery();
  const userId = authData?.user?.id;
  const userRole = authData?.userRole;

  // Get user's favorite properties
  const {
    data: favorites,
    isLoading: favoritesLoading,
    error,
    refetch,
  } = useGetFavoritesQuery(userId!, {
    skip: !userId || userRole !== "BUYER",
  });

  // Toggle favorite mutation
  const [toggleFavorite, { isLoading: isToggling }] = useToggleFavoriteMutation();

  const handleRemoveFavorite = async (
    e: React.MouseEvent,
    propertyId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;

    try {
      await toggleFavorite({ userId, propertyId }).unwrap();
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  // Loading state
  if (authLoading || favoritesLoading) {
    return (
      <div className="property-grid-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your favorites...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!userId) {
    return (
      <div className="property-grid-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="space40" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth={1}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="space24" />
              <h3>Please Log In</h3>
              <div className="space16" />
              <p className="text-muted">
                You need to be logged in to view your favorite properties.
              </p>
              <div className="space32" />
              <Link href="/login" className="vl-btn1">
                Log In
                <span className="arrow1">
                  <i className="fa-solid fa-arrow-right" />
                </span>
                <span className="arrow2">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not a buyer
  if (userRole !== "BUYER") {
    return (
      <div className="property-grid-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="space40" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth={1}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="space24" />
              <h3>Buyer Access Only</h3>
              <div className="space16" />
              <p className="text-muted">
                Only buyers can save and view favorite properties.
              </p>
              <div className="space32" />
              <Link href="/search" className="vl-btn1">
                Browse Properties
                <span className="arrow1">
                  <i className="fa-solid fa-arrow-right" />
                </span>
                <span className="arrow2">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="property-grid-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="space40" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc3545"
                strokeWidth={1}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <div className="space24" />
              <h3>Something Went Wrong</h3>
              <div className="space16" />
              <p className="text-muted">
                We couldn't load your favorites. Please try again.
              </p>
              <div className="space32" />
              <button onClick={() => refetch()} className="vl-btn1">
                Try Again
                <span className="arrow1">
                  <i className="fa-solid fa-refresh" />
                </span>
                <span className="arrow2">
                  <i className="fa-solid fa-refresh" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!favorites || favorites.length === 0) {
    return (
      <div className="property-grid-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="space40" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth={1}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <div className="space24" />
              <h3>No Favorites Yet</h3>
              <div className="space16" />
              <p className="text-muted">
                Start exploring properties and click the heart icon to save your
                favorites.
              </p>
              <div className="space32" />
              <Link href="/search" className="vl-btn1">
                Browse Properties
                <span className="arrow1">
                  <i className="fa-solid fa-arrow-right" />
                </span>
                <span className="arrow2">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display favorites
  return (
    <div className="property-grid-area sp1">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">
                You have {favorites.length} saved{" "}
                {favorites.length === 1 ? "property" : "properties"}
              </p>
              <Link href="/search" className="text-primary">
                <i className="fa-solid fa-plus me-2" />
                Add More
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {favorites.map((property: Property) => {
            const photos = property.media?.filter(
              (m: PropertyMedia) => m.mediaType === "PHOTO"
            ) || [];
            const seller = property.seller?.[0];
            const sellerAvatarUrl = seller?.avatarUrl
              ? `https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${seller.avatarUrl}`
              : "/assets/img/icons/user-placeholder.png";

            return (
              <div key={property.id} className="col-lg-4 col-md-6 mb-4">
                <div className="property-single-boxarea">
                  <Swiper
                    {...swiperOptions}
                    className="property-list-img-area owl-carousel"
                  >
                    {photos.length > 0 ? (
                      photos.map((m: PropertyMedia) => (
                        <SwiperSlide key={m.id}>
                          <Link href={`/property/${property.basic?.exposeId}`}>
                            <div className="img1 image-anime">
                              <img
                                src={m.url}
                                alt="property"
                                style={{
                                  height: "250px",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <Link href={`/property/${property.basic?.exposeId}`}>
                          <div className="img1 image-anime">
                            <img
                              src="/assets/img/all-images/properties/property-img2.png"
                              alt="property placeholder"
                              style={{
                                height: "250px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </Link>
                      </SwiperSlide>
                    )}
                    <div className="swiper-pagination" />
                  </Swiper>

                  <div className="space20" />

                  <div className="property-price">
                    <div className="text">
                      <Link
                        href={`/property/${property.basic?.exposeId}`}
                        className="title"
                      >
                        {property.basic?.address || "Property"}
                      </Link>
                      <div className="space16" />
                      <p>
                        {property.basic?.address}, {property.basic?.city}
                      </p>
                    </div>
                    <Link
                      href={`/property/${property.basic?.exposeId}`}
                      className="price"
                    >
                      {property.basic?.currency}{" "}
                      {formatCurrency(property.basic?.price || 0)}
                    </Link>
                  </div>

                  <div className="space20" />

                  <div className="property-other-widget">
                    <ul>
                      <li>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8 9H16M8 15H16"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 21H21V3.00046L3 3V21Z"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {property.basic?.livingArea || 0} sqft
                      </li>
                      <li>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22 17.5H2"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        {property.basic?.bedrooms || 0} Beds
                      </li>
                      <li>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 20L5 21M18 20L19 21"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12H22"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 6L10.5 4"
                              stroke="#1B1B1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        {property.basic?.bathrooms || 0} Baths
                      </li>
                    </ul>

                    <div className="space24" />

                    <div className="btn-area">
                      <div className="name-area">
                        {seller && (
                          <>
                            <div className="img">
                              <img
                                src={sellerAvatarUrl}
                                alt="seller"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="text">
                              <Link href="#">
                                {seller.firstName} {seller.lastName}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="love-share">
                        <button
                          onClick={(e) => handleRemoveFavorite(e, property.id)}
                          disabled={isToggling}
                          className="heart"
                          style={{
                            background: "#fbe6d7",
                            border: "none",
                            cursor: "pointer",
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: isToggling ? 0.5 : 1,
                            transition: "opacity 0.2s ease",
                          }}
                          title="Remove from favorites"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={18}
                            viewBox="0 0 20 18"
                            fill="#ED8438"
                          >
                            <path
                              d="M10 18C9.74418 18 9.4977 17.9149 9.30214 17.7593C8.49173 17.1139 7.71036 16.5112 7.02114 15.9821L7.01772 15.9795C4.98128 14.4212 3.22017 13.0732 1.98894 11.7523C0.610338 10.2727 0 8.87813 0 7.3493C0 5.86474 0.540242 4.49593 1.52178 3.49026C2.51536 2.47219 3.86314 1.91669 5.32709 1.91669C6.42612 1.91669 7.43203 2.25171 8.3189 2.91231C8.76643 3.24566 9.16614 3.65329 9.50535 4.12734C9.84471 3.65329 10.2443 3.24566 10.6921 2.91231C11.579 2.25171 12.5848 1.91669 13.6839 1.91669C15.1477 1.91669 16.4956 2.47219 17.4893 3.49026C18.4708 4.49593 19.0109 5.86474 19.0109 7.3493C19.0109 8.87813 18.4007 10.2727 17.0221 11.7522C15.7909 13.0732 14.0299 14.4211 11.9937 15.9793C11.3033 16.5094 10.5207 17.1131 9.70885 17.7597C9.51344 17.9149 9.26668 18 9.01086 18H10Z"
                              fill="#ED8438"
                            />
                          </svg>
                        </button>
                        <Link href="#" className="share">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={19}
                            height={20}
                            viewBox="0 0 19 20"
                            fill="none"
                          >
                            <path
                              d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                              fill="#ED8438"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="rent-sale-area">
                    <ul>
                      <li>
                        <Link href="#">For Sale</Link>
                      </li>
                      <li>
                        <Link href="#">{property.basic?.propertyType}</Link>
                      </li>
                    </ul>
                    <Link href="#" className="camera">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={14}
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z"
                          fill="#1B1B1B"
                        />
                      </svg>{" "}
                      {property.media?.length || 0}
                    </Link>
                  </div>

                  <div className="btn-area1 text-center">
                    <Link
                      href={`/property/${property.basic?.exposeId}`}
                      className="vl-btn1"
                    >
                      View Property Details
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavouritePropertyList;