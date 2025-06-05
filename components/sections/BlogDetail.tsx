"use client";
import Link from "next/link";
import VideoPopup from "../elements/VideoPopup";
import BlogSidebar from "../elements/BlogSidebar";

// Reusable SVG Components

// LabelIcon icon for label
const LabelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <path
            d="M10.238 4.827C10.632 4.82682 11.0222 4.90427 11.3863 5.05492C11.7504 5.20557 12.0813 5.42647 12.36 5.705L18.845 12.191C19.4074 12.7536 19.7233 13.5165 19.7233 14.312C19.7233 15.1075 19.4074 15.8704 18.845 16.433L14.602 20.676C14.0394 21.2384 13.2765 21.5544 12.481 21.5544C11.6855 21.5544 10.9226 21.2384 10.36 20.676L3.87397 14.191C3.59544 13.9123 3.37454 13.5814 3.22389 13.2173C3.07324 12.8532 2.99579 12.463 2.99597 12.069V7.327C2.99597 6.66396 3.25936 6.02807 3.72821 5.55923C4.19705 5.09039 4.83293 4.827 5.49597 4.827H10.238ZM10.238 6.827H5.49597C5.36336 6.827 5.23619 6.87968 5.14242 6.97345C5.04865 7.06722 4.99597 7.19439 4.99597 7.327V12.069C4.99576 12.3341 5.10079 12.5883 5.28797 12.776L11.774 19.262C11.9615 19.4495 12.2158 19.5548 12.481 19.5548C12.7461 19.5548 13.0004 19.4495 13.188 19.262L17.431 15.019C17.6184 14.8315 17.7238 14.5772 17.7238 14.312C17.7238 14.0468 17.6184 13.7925 17.431 13.605L10.945 7.12C10.7575 6.93245 10.5032 6.82706 10.238 6.827ZM7.53097 9.362C7.81237 9.08074 8.19397 8.92278 8.59183 8.92287C8.78882 8.92292 8.98389 8.96177 9.16587 9.0372C9.34786 9.11263 9.51321 9.22317 9.65247 9.3625C9.79174 9.50183 9.9022 9.66723 9.97754 9.84925C10.0529 10.0313 10.0916 10.2264 10.0916 10.4234C10.0916 10.6204 10.0527 10.8154 9.97727 10.9974C9.90184 11.1794 9.7913 11.3447 9.65197 11.484C9.37058 11.7653 8.98898 11.9232 8.59112 11.9231C8.19326 11.923 7.81173 11.7649 7.53047 11.4835C7.24921 11.2021 7.09125 10.8205 7.09134 10.4226C7.09139 10.2256 7.13024 10.0306 7.20567 9.8486C7.2811 9.66661 7.39164 9.50127 7.53097 9.362ZM11.652 2C12.046 1.99982 12.4362 2.07727 12.8003 2.22792C13.1644 2.37857 13.4953 2.59947 13.774 2.878L20.966 10.071C21.1481 10.2596 21.2489 10.5122 21.2466 10.7744C21.2444 11.0366 21.1392 11.2874 20.9538 11.4728C20.7684 11.6582 20.5176 11.7634 20.2554 11.7657C19.9932 11.768 19.7406 11.6672 19.552 11.485L12.36 4.29C12.1717 4.10331 11.9171 3.999 11.652 4H6.99997C6.73476 4 6.4804 3.89464 6.29287 3.70711C6.10533 3.51957 5.99997 3.26522 5.99997 3C5.99997 2.73478 6.10533 2.48043 6.29287 2.29289C6.4804 2.10536 6.73476 2 6.99997 2H11.652Z"
            fill="#1B1B1B"
        />
    </svg>
);

// Author icon
const AuthorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C17.523 2 22 6.477 22 12C22.0035 14.3079 21.2054 16.5454 19.742 18.33L19.762 18.352L19.63 18.464C18.6922 19.5732 17.5236 20.4643 16.2057 21.0751C14.8879 21.6858 13.4525 22.0015 12 22C9.05001 22 6.40001 20.723 4.57001 18.693L4.37001 18.463L4.23801 18.353L4.25801 18.329C2.79477 16.5447 1.99663 14.3076 2.00001 12C2.00001 6.477 6.47701 2 12 2ZM12 17C10.14 17 8.45901 17.592 7.20701 18.405C8.5893 19.4426 10.2716 20.0025 12 20C13.7284 20.0025 15.4107 19.4426 16.793 18.405C15.3623 17.4886 13.6991 17.0011 12 17ZM12 4C10.4945 3.99996 9.0196 4.42471 7.74473 5.22545C6.46987 6.02619 5.44682 7.1704 4.79317 8.52657C4.13953 9.88274 3.88181 11.3958 4.04966 12.8919C4.21751 14.388 4.8041 15.8064 5.74201 16.984C7.36301 15.821 9.57501 15 12 15C14.425 15 16.637 15.821 18.258 16.984C19.1959 15.8064 19.7825 14.388 19.9504 12.8919C20.1182 11.3958 19.8605 9.88274 19.2069 8.52657C18.5532 7.1704 17.5302 6.02619 16.2553 5.22545C14.9804 4.42471 13.5055 3.99996 12 4ZM12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92173 13.5786 9.17158 12.8284C8.42144 12.0783 8.00001 11.0609 8.00001 10C8.00001 8.93913 8.42144 7.92172 9.17158 7.17157C9.92173 6.42143 10.9391 6 12 6ZM12 8C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10C10 10.5304 10.2107 11.0391 10.5858 11.4142C10.9609 11.7893 11.4696 12 12 12C12.5304 12 13.0392 11.7893 13.4142 11.4142C13.7893 11.0391 14 10.5304 14 10C14 9.46957 13.7893 8.96086 13.4142 8.58579C13.0392 8.21071 12.5304 8 12 8Z"
            fill="#1B1B1B"
        />
    </svg>
);

// Read more arrow icon
const ReadMoreIcon = () => <i className="fa-solid fa-arrow-right" />;

// Data for main blog posts
const mainBlogPosts = [
    {
        image: "/assets/img/all-images/blog/blog-img1.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "5 Tips For First-Time Homebuyers Housa",
        link: "/blog-detail",
        date: "12",
        month: "AUG",
    },
    {
        image: "/assets/img/all-images/blog/blog-img2.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "Understanding the Latest Real Estate Market Trends",
        link: "/blog-detail",
        date: "14",
        month: "AUG",
    },
    {
        image: "/assets/img/all-images/blog/blog-img3.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "How to Stage Your Home for a Quick Sale",
        link: "/blog-detail",
        date: "17",
        month: "AUG",
    },
];
// Component for rendering main blog posts
const BlogPost = ({ image, author, title, link, label, date, month }: (typeof mainBlogPosts)[0]) => (
    <div className="col-lg-4 col-md-6">
        <div className="vl-blog-1-item">
            <div className="vl-blog-1-thumb image-anime">
                <img src={image} alt="housa" />
            </div>
            <div className="vl-blog-1-content">
                <div className="date">
                    <p>{date}</p>
                    <span>{month}</span>
                </div>
                <div className="vl-blog-meta">
                    <ul>
                        <li>
                            <Link href="#">
                                <AuthorIcon /> {author}
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <LabelIcon />
                                {label}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space24" />
                <h4 className="vl-blog-1-title">
                    <Link className="lh-sm" href={link}>
                        {title}
                    </Link>
                </h4>
                <div className="space24" />
                <div className="vl-blog-1-icon">
                    <Link href={link} className="readmore">
                        Read More <ReadMoreIcon />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default function BlogDetail() {
    return (
        <>
            {/*===== BLOG AREA STARTS =======*/}
            <div className="blog-inner-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            <BlogSidebar />
                        </div>
                        <div className="col-lg-8">
                            <div className="space40 d-lg-none d-block" />
                            <div className="bg-area">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="blog-post-details-area heading1">
                                            <div className="img1">
                                                <img src="/assets/img/all-images/blog/blog-img16.png" alt="housa" />
                                            </div>
                                            <div className="space32" />
                                            <ul className="list-author">
                                                <li>
                                                    <Link href="#">#BestTechSolution</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={22} viewBox="0 0 21 22" fill="none">
                                                            <g clipPath="url(#clip0_6063_80620)">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10.5 2.25C15.3326 2.25 19.25 6.16738 19.25 11C19.2531 13.0194 18.5547 14.9772 17.2743 16.5388L17.2918 16.558L17.1763 16.656C16.3557 17.6266 15.3331 18.4063 14.18 18.9407C13.0269 19.4751 11.771 19.7513 10.5 19.75C7.91876 19.75 5.60001 18.6326 3.99876 16.8564L3.82376 16.6551L3.70826 16.5589L3.72576 16.5379C2.44542 14.9766 1.74705 13.0191 1.75001 11C1.75001 6.16738 5.66738 2.25 10.5 2.25ZM10.5 15.375C8.87251 15.375 7.40163 15.893 6.30613 16.6044C7.51564 17.5123 8.98765 18.0022 10.5 18C12.0124 18.0022 13.4844 17.5123 14.6939 16.6044C13.442 15.8025 11.9867 15.3759 10.5 15.375ZM10.5 4C9.18272 3.99996 7.89215 4.37163 6.77664 5.07227C5.66113 5.77291 4.76596 6.7741 4.19402 7.96075C3.62208 9.1474 3.39659 10.4714 3.54345 11.7804C3.69032 13.0895 4.20359 14.3306 5.02426 15.361C6.44263 14.3434 8.37813 13.625 10.5 13.625C12.6219 13.625 14.5574 14.3434 15.9758 15.361C16.7964 14.3306 17.3097 13.0895 17.4566 11.7804C17.6034 10.4714 17.3779 9.1474 16.806 7.96075C16.2341 6.7741 15.3389 5.77291 14.2234 5.07227C13.1079 4.37163 11.8173 3.99996 10.5 4ZM10.5 5.75C11.4283 5.75 12.3185 6.11875 12.9749 6.77513C13.6313 7.4315 14 8.32174 14 9.25C14 10.1783 13.6313 11.0685 12.9749 11.7249C12.3185 12.3813 11.4283 12.75 10.5 12.75C9.57175 12.75 8.68151 12.3813 8.02514 11.7249C7.36876 11.0685 7.00001 10.1783 7.00001 9.25C7.00001 8.32174 7.36876 7.4315 8.02514 6.77513C8.68151 6.11875 9.57175 5.75 10.5 5.75ZM10.5 7.5C10.0359 7.5 9.59076 7.68438 9.26257 8.01256C8.93438 8.34075 8.75001 8.78587 8.75001 9.25C8.75001 9.71413 8.93438 10.1592 9.26257 10.4874C9.59076 10.8156 10.0359 11 10.5 11C10.9641 11 11.4093 10.8156 11.7374 10.4874C12.0656 10.1592 12.25 9.71413 12.25 9.25C12.25 8.78587 12.0656 8.34075 11.7374 8.01256C11.4093 7.68438 10.9641 7.5 10.5 7.5Z"
                                                                    fill="#1B1B1B"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_6063_80620">
                                                                    <rect width={21} height={21} fill="white" transform="translate(0 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        By Alex Roy <span> | </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={22} viewBox="0 0 21 22" fill="none">
                                                            <g clipPath="url(#clip0_6059_80076)">
                                                                <path
                                                                    d="M8.95784 4.72363C9.30262 4.72347 9.64405 4.79124 9.96264 4.92305C10.2812 5.05487 10.5707 5.24816 10.8146 5.49188L16.489 11.1671C16.9811 11.6594 17.2575 12.3269 17.2575 13.023C17.2575 13.7191 16.9811 14.3866 16.489 14.8789L12.7763 18.5915C12.2841 19.0836 11.6165 19.3601 10.9205 19.3601C10.2244 19.3601 9.55685 19.0836 9.06459 18.5915L3.38934 12.9171C3.14563 12.6733 2.95234 12.3838 2.82052 12.0652C2.6887 11.7466 2.62094 11.4052 2.62109 11.0604V6.91113C2.62109 6.33096 2.85156 5.77457 3.2618 5.36433C3.67203 4.95409 4.22843 4.72363 4.80859 4.72363H8.95784ZM8.95784 6.47363H4.80859C4.69256 6.47363 4.58128 6.51972 4.49923 6.60177C4.41719 6.68381 4.37109 6.79509 4.37109 6.91113V11.0604C4.37091 11.2923 4.46281 11.5148 4.62659 11.679L10.3018 17.3542C10.4659 17.5183 10.6885 17.6104 10.9205 17.6104C11.1525 17.6104 11.375 17.5183 11.5391 17.3542L15.2517 13.6416C15.4158 13.4775 15.5079 13.255 15.5079 13.023C15.5079 12.791 15.4158 12.5685 15.2517 12.4044L9.57647 6.73C9.41241 6.5659 9.18989 6.47368 8.95784 6.47363ZM6.58922 8.69175C6.83544 8.44565 7.16934 8.30743 7.51747 8.30751C7.68984 8.30755 7.86052 8.34155 8.01976 8.40755C8.17899 8.47355 8.32367 8.57027 8.44553 8.69219C8.56739 8.8141 8.66404 8.95883 8.72997 9.1181C8.7959 9.27737 8.82981 9.44806 8.82977 9.62043C8.82973 9.79281 8.79574 9.96349 8.72973 10.1227C8.66373 10.282 8.56701 10.4266 8.44509 10.5485C8.19887 10.7946 7.86497 10.9328 7.51685 10.9327C7.16872 10.9327 6.83489 10.7943 6.58878 10.5481C6.34268 10.3018 6.20446 9.96794 6.20455 9.61982C6.20459 9.44744 6.23858 9.27676 6.30458 9.11753C6.37058 8.95829 6.4673 8.81361 6.58922 8.69175ZM10.1951 2.25C10.5399 2.24984 10.8813 2.31761 11.1999 2.44943C11.5185 2.58125 11.808 2.77453 12.0518 3.01825L18.3448 9.31213C18.5042 9.47715 18.5924 9.69818 18.5904 9.9276C18.5884 10.157 18.4964 10.3765 18.3342 10.5387C18.172 10.7009 17.9525 10.793 17.7231 10.795C17.4936 10.797 17.2726 10.7088 17.1076 10.5494L10.8146 4.25375C10.6499 4.09039 10.4271 3.99912 10.1951 4H6.12459C5.89253 4 5.66997 3.90781 5.50588 3.74372C5.34178 3.57962 5.24959 3.35706 5.24959 3.125C5.24959 2.89294 5.34178 2.67038 5.50588 2.50628C5.66997 2.34219 5.89253 2.25 6.12459 2.25H10.1951Z"
                                                                    fill="#1B1B1B"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_6059_80076">
                                                                    <rect width={21} height={21} fill="white" transform="translate(0 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        Deluxe
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div className="space20" />
                                            <h2>How to Sell Your Property Fast &amp; Get the Best Price</h2>
                                            <div className="space18" />
                                            <p>Selling your property quickly while securing the best price requires the right strategy. Start by enhancing your home's curb appeal—first impressions matter! A well-maintained exterior, fresh paint, and a tidy landscape can attract more buyers. Next, stage your home to highlight its best features, keeping it clean, decluttered, well-lit. Pricing your property competitively is crucial research the market and set a realistic price that attracts buyers.</p>
                                            <div className="space16" />
                                            <p>Property quickly while maximizing value requires a strategic approach. Start by making a great first impression- boost your home's curb appeal with fresh paint, well-maintained landscaping, and a clean, inviting entrance. An Inside, declutter and stage each room to make it look spacious, bright, and appealing to potential buyers.</p>
                                            <div className="space30" />
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="space30" />
                                                    <div className="img1 image-anime">
                                                        <img src="/assets/img/all-images/blog/blog-img17.png" alt="housa" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="space30" />
                                                    <div className="img1 image-anime">
                                                        <img src="/assets/img/all-images/blog/blog-img18.png" alt="housa" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space28" />
                                            <h3>Proven Strategies To Sell Your Home Quickly</h3>
                                            <div className="space18" />
                                            <p>Selling your home quickly requires well-planned approach attract the right buyers. First, enhance your curb appeal by ensuring your home looks inviting—fresh paint, a tidy lawn, an welcoming entrance can make a big difference. Inside, declutter stage your home highlight best features, making it feel spacious move ready.</p>
                                            <div className="space16" />
                                            <p>Pricing your property competitively is crucial. Research the local market and set an price that attracts buyers while maximizing your profit. Professional photography and virtual tours can make your listing stand out best online, reaching a wider audience. Additionally, leverage multiple platforms, including real estate websites.</p>
                                            <div className="space30" />
                                            <div className="vide-images">
                                                <div className="img1">
                                                    <img src="/assets/img/all-images/blog/blog-img19.png" alt="housa" />
                                                </div>
                                                <VideoPopup />
                                            </div>
                                            <div className="space28" />
                                            <h3>Explore Our Properties Through Virtual Tours</h3>
                                            <div className="space18" />
                                            <p>Take a closer look at our stunning properties through immersive video tours. Whether you're searching for modern apartment, a luxurious villa, or a cozy family home, our high-quality videos bring each property to life. Explore every detail, from spacious interiors to breathtaking views, all from the comfort your screen.</p>
                                            <div className="space16" />
                                            <p>Why wait for visit when you can explore stunning properties right now? Our immersive video tours take you inside finest homes, showcasing every detail—from elegant interiors to scenic surroundings you're looking.</p>
                                            <div className="space32" />
                                            <div className="tags-social">
                                                <div className="tags">
                                                    <ul>
                                                        <li>Tags:</li>
                                                        <li>
                                                            <Link href="#">#RealEstateTips</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#" className="m-0">
                                                                #DreamHome
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="social">
                                                    <ul>
                                                        <li>Social:</li>
                                                        <li>
                                                            <Link href="#">
                                                                <i className="fa-brands fa-facebook-f" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">
                                                                <i className="fa-brands fa-instagram" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">
                                                                <i className="fa-brands fa-linkedin-in" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#" className="m-0">
                                                                <i className="fa-brands fa-youtube" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="space30" />
                                            <h3>Comments (2)</h3>
                                            <div className="space30" />
                                            <div className="comments-boxarea">
                                                <div className="comments-boxes">
                                                    <div className="comments-auhtor-box">
                                                        <div className="img3">
                                                            <img src="/assets/img/all-images/blog/blog-img17.png" alt="housa" />
                                                        </div>
                                                        <div className="content">
                                                            <Link href="#" className="date">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z" />
                                                                </svg>
                                                                8 December 2024
                                                            </Link>
                                                            <Link href="/about-us" className="name">
                                                                Alex Robertson
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <Link href="#" className="reply">
                                                        <i className="fa-solid fa-reply" /> Reply
                                                    </Link>
                                                </div>
                                                <div className="space16" />
                                                <p>Thank you for exploring our properties! We value your feedback questions about our listings. Whether you're interested in scheduling a tour, learning more about our locations, or discovering the amenities we offer, this is the.</p>
                                            </div>
                                            <div className="space30" />
                                            <div className="comments-boxarea box2">
                                                <div className="comments-boxes">
                                                    <div className="comments-auhtor-box">
                                                        <div className="img3">
                                                            <img src="/assets/img/all-images/blog/blog-img18.png" alt="housa" />
                                                        </div>
                                                        <div className="content">
                                                            <Link href="#" className="date">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z" />
                                                                </svg>
                                                                12 May 2024
                                                            </Link>
                                                            <Link href="/about-us" className="name">
                                                                Theo Hernandez
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <Link href="#" className="reply">
                                                        <i className="fa-solid fa-reply" /> Reply
                                                    </Link>
                                                </div>
                                                <div className="space16" />
                                                <p>Thank you so much for your interest and thoughtful comment! We're the thrilled to hear you're considering our properties and would love to best assist you further. If you're interested in a specific listing, we'd be happy.</p>
                                            </div>
                                            <div className="space30" />
                                            <h3>Leave A Reply Now</h3>
                                            <div className="space32" />
                                            <div className="contact-boxarea">
                                                <h3>Send Us A Message</h3>
                                                <div className="space8" />
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-area">
                                                            <input type="text" placeholder="Your Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-area">
                                                            <input type="email" placeholder="Email Address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-area">
                                                            <textarea placeholder="Your Message" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="space4" />
                                                        <div className="input-area">
                                                            <button type="submit" className="vl-btn1">
                                                                Leave A Reply Now
                                                                <span className="arrow1 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                                <span className="arrow2 ms-2">
                                                                    <i className="fa-solid fa-arrow-right" />
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== BLOG AREA ENDS =======*/}
            <div className="space30"></div>
            {/*===== BLOG AREA STARTS =======*/}
            <div className="vl-blog-1-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="vl-blog-1-section-box heading1 text-center space-margin60">
                                <h2 className="vl-section-title text-anime-style-3">Read More Latest Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {mainBlogPosts.map((post, index) => (
                            <BlogPost key={index} {...post} />
                        ))}
                    </div>
                </div>
            </div>
            {/*===== BLOG AREA ENDS =======*/}
        </>
    );
}
