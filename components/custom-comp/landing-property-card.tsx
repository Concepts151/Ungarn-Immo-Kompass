import Link from "next/link";
import React, { useState } from "react";
import { User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  Property,
  PropertyBasic,
  PropertyMedia,
  SellerDatails,
} from "@/types/api";

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
    return value.toLocaleString(); // adds commas
  }
}

const LandingPropertyCard = ({
  basic,
  media,
  seller,
}: {
  basic: PropertyBasic;
  media: PropertyMedia[];
  seller: SellerDatails[];
}) => {
  const [imgError, setImgError] = useState(false);
  const sellerAvatar = seller[0]?.avatarUrl;
  const sellerAvatarUrl = sellerAvatar
    ? (sellerAvatar.startsWith("http") || sellerAvatar.startsWith("blob:")
        ? sellerAvatar
        : `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${sellerAvatar}`)
    : "/assets/img/all-images/user.png";
  const photos = media.filter(
    (mediaItem: any) => mediaItem.mediaType === "PHOTO"
  );

  console.log("photos:", photos);
  
  return (
    <div className="col-lg-4 col-md-6">
      <div className="property-single-boxarea">
        <Swiper
          {...swiperOptions}
          className="property-list-img-area owl-carousel"
        >
          {photos.length > 0 ? (
            photos.map((m) => (
              <SwiperSlide key={m.id}>
                <Link href="/property-details-v1">
                  <div className="img1 image-anime">
                    <img src={m.url} alt="housa" style={{ height: "300px" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/assets/img/logo/Ungarn-Immo-Full.png"; e.currentTarget.style.objectFit = "contain"; e.currentTarget.style.padding = "40px"; e.currentTarget.style.backgroundColor = "#f3f4f6"; }} />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Link href="/property-details-v1">
                <div className="img1 image-anime">
                  <img
                    src="/assets/img/all-images/properties/property-img2.png"
                    alt="housa"
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
            <Link href={`/property/${basic.exposeId}`} className="title">
              {basic.address}
            </Link>
            <div className="space16" />
            <p>
              {basic.address}, {basic.city}{" "}
            </p>
          </div>
          <Link href={`/property/${basic.exposeId}`} className="price">
            {basic.currency} {formatCurrency(basic.price)}
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
              {basic.livingArea} sqft
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
              {basic.bedrooms} Beds
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
              {basic.bathrooms} Baths
            </li>
          </ul>
          <div className="space24" />
          <div className="btn-area">
            <div className="name-area">
              <div className="img" style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", borderRadius: "50%", width: "40px", height: "40px", overflow: "hidden" }}>
                {!imgError && sellerAvatarUrl && sellerAvatarUrl !== "/assets/img/all-images/user.png" ? (
                  <img
                    src={sellerAvatarUrl}
                    alt="seller avatar"
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <User size={20} color="#9ca3af" />
                )}
              </div>
              <div className="text">
                <Link href="#">{seller[0].firstName + " " + seller[0].lastName}</Link>
              </div>
            </div>
            <div className="love-share">
              <Link href="javascript:void(0)" className="heart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={18}
                  viewBox="0 0 20 18"
                  fill="none"
                  stroke="#436f4d"
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <path
                    d="M10 17.5C9.74418 17.5 9.4977 17.4149 9.30214 17.2593C8.49173 16.6139 7.71036 16.0112 7.02114 15.4821L7.01772 15.4795C4.98128 13.9212 3.22017 12.5732 1.98894 11.2523C0.610338 9.77273 0 8.37813 0 6.8493C0 5.36474 0.540242 3.99593 1.52178 2.99026C2.51536 1.97219 3.86314 1.41669 5.32709 1.41669C6.42612 1.41669 7.43203 1.75171 8.3189 2.41231C8.76643 2.74566 9.16614 3.15329 9.50535 3.62734C9.84471 3.15329 10.2443 2.74566 10.6921 2.41231C11.579 1.75171 12.5848 1.41669 13.6839 1.41669C15.1477 1.41669 16.4956 1.97219 17.4893 2.99026C18.4708 3.99593 19.0109 5.36474 19.0109 6.8493C19.0109 8.37813 18.4007 9.77273 17.0221 11.2522C15.7909 12.5732 14.0299 13.9211 11.9937 15.4793C11.3033 16.0094 10.5207 16.6131 9.70885 17.2597C9.51344 17.4149 9.26668 17.5 9.01086 17.5H10Z"
                    className="heart1"
                  />
                  <path
                    d="M10 17.5C9.74418 17.5 9.4977 17.4149 9.30214 17.2593C8.49173 16.6139 7.71036 16.0112 7.02114 15.4821L7.01772 15.4795C4.98128 13.9212 3.22017 12.5732 1.98894 11.2523C0.610338 9.77273 0 8.37813 0 6.8493C0 5.36474 0.540242 3.99593 1.52178 2.99026C2.51536 1.97219 3.86314 1.41669 5.32709 1.41669C6.42612 1.41669 7.43203 1.75171 8.3189 2.41231C8.76643 2.74566 9.16614 3.15329 9.50535 3.62734C9.84471 3.15329 10.2443 2.74566 10.6921 2.41231C11.579 1.75171 12.5848 1.41669 13.6839 1.41669C15.1477 1.41669 16.4956 1.97219 17.4893 2.99026C18.4708 3.99593 19.0109 5.36474 19.0109 6.8493C19.0109 8.37813 18.4007 9.77273 17.0221 11.2522C15.7909 12.5732 14.0299 13.9211 11.9937 15.4793C11.3033 16.0094 10.5207 16.6131 9.70885 17.2597C9.51344 17.4149 9.26668 17.5 9.01086 17.5H10Z"
                    fill="#436f4d"
                    className="heart2"
                  />
                </svg>
              </Link>
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
                    fill="#436f4d"
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
              <Link href="#">New</Link>
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
            {media.length}
          </Link>
        </div>
        <div className="btn-area1 text-center">
          <Link href={`/property/${basic.exposeId}`} className="vl-btn1">
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
};

export default LandingPropertyCard;
