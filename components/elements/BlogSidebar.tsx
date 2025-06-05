"use client";
import Link from "next/link";

// Reusable SVG Components (assumed to be imported or defined elsewhere)
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
        <path
            d="M19.25 19.25L13.75 13.75M2.75 9.16667C2.75 10.0093 2.91597 10.8437 3.23844 11.6222C3.56091 12.4007 4.03356 13.1081 4.6294 13.7039C5.22524 14.2998 5.93261 14.7724 6.71111 15.0949C7.48962 15.4174 8.32402 15.5833 9.16667 15.5833C10.0093 15.5833 10.8437 15.4174 11.6222 15.0949C12.4007 14.7724 13.1081 14.2998 13.7039 13.7039C14.2998 13.1081 14.7724 12.4007 15.0949 11.6222C15.4174 10.8437 15.5833 10.0093 15.5833 9.16667C15.5833 8.32402 15.4174 7.48962 15.0949 6.71111C14.7724 5.93261 14.2998 5.22524 13.7039 4.6294C13.1081 4.03356 12.4007 3.56091 11.6222 3.23844C10.8437 2.91597 10.0093 2.75 9.16667 2.75C8.32402 2.75 7.48962 2.91597 6.71111 3.23844C5.93261 3.56091 5.22524 4.03356 4.6294 4.6294C4.03356 5.22524 3.56091 5.93261 3.23844 6.71111C2.91597 7.48962 2.75 8.32402 2.75 9.16667Z"
            stroke="#1B1B1B"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const BreadcrumbArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <path d="M13.1724 12.0013L8.22266 7.05153L9.63687 5.63733L16.0009 12.0013L9.63687 18.3652L8.22266 16.951L13.1724 12.0013Z" fill="#1B1B1B" />
    </svg>
);

// Data for blog categories
const blogCategories = [
    { name: "Home Buying Tips", count: 12 },
    { name: "Home Selling Advice", count: 34 },
    { name: "Interior Design Décor", count: 12 },
    { name: "Lifestyle And Living", count: 34 },
    { name: "Property Investment", count: 16 },
    { name: "Neighborhood Guides", count: 12 },
];

// Data for featured posts
const featuredPosts = [
    {
        image: "/assets/img/all-images/blog/blog-img13.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "5 Tips Find Your Dream Home Without An Stress Know Budget",
        link: "/blog-detail",
    },
    {
        image: "/assets/img/all-images/blog/blog-img14.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "The Power of Content Marketing How to Drive...",
        link: "/blog-detail",
    },
    {
        image: "/assets/img/all-images/blog/blog-img15.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "The Power of Social Media Marketing: How to Build Your...",
        link: "/blog-detail",
    },
];

// Component for rendering featured posts (assumed to be imported or defined here)
const FeaturedPost = ({ image, title, link, author, label }: (typeof featuredPosts)[0]) => (
    <div className="post-auhtor-area">
        <div className="img1">
            <img src={image} alt="housa" />
        </div>
        <div className="content">
            <ul>
                <li>
                    <Link href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C17.523 2 22 6.477 22 12C22.0035 14.3079 21.2054 16.5454 19.742 18.33L19.762 18.352L19.63 18.464C18.6922 19.5732 17.5236 20.4643 16.2057 21.0751C14.8879 21.6858 13.4525 22.0015 12 22C9.05001 22 6.40001 20.723 4.57001 18.693L4.37001 18.463L4.23801 18.353L4.25801 18.329C2.79477 16.5447 1.99663 14.3076 2.00001 12C2.00001 6.477 6.47701 2 12 2ZM12 17C10.14 17 8.45901 17.592 7.20701 18.405C8.5893 19.4426 10.2716 20.0025 12 20C13.7284 20.0025 15.4107 19.4426 16.793 18.405C15.3623 17.4886 13.6991 17.0011 12 17ZM12 4C10.4945 3.99996 9.0196 4.42471 7.74473 5.22545C6.46987 6.02619 5.44682 7.1704 4.79317 8.52657C4.13953 9.88274 3.88181 11.3958 4.04966 12.8919C4.21751 14.388 4.8041 15.8064 5.74201 16.984C7.36301 15.821 9.57501 15 12 15C14.425 15 16.637 15.821 18.258 16.984C19.1959 15.8064 19.7825 14.388 19.9504 12.8919C20.1182 11.3958 19.8605 9.88274 19.2069 8.52657C18.5532 7.1704 17.5302 6.02619 16.2553 5.22545C14.9804 4.42471 13.5055 3.99996 12 4ZM12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92173 13.5786 9.17158 12.8284C8.42144 12.0783 8.00001 11.0609 8.00001 10C8.00001 8.93913 8.42144 7.92172 9.17158 7.17157C9.92173 6.42143 10.9391 6 12 6ZM12 8C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10C10 10.5304 10.2107 11.0391 10.5858 11.4142C10.9609 11.7893 11.4696 12 12 12C12.5304 12 13.0392 11.7893 13.4142 11.4142C13.7893 11.0391 14 10.5304 14 10C14 9.46957 13.7893 8.96086 13.4142 8.58579C13.0392 8.21071 12.5304 8 12 8Z"
                                fill="#1B1B1B"
                            />
                        </svg>
                        {author}
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M10.238 4.827C10.632 4.82682 11.0222 4.90427 11.3863 5.05492C11.7504 5.20557 12.0813 5.42647 12.36 5.705L18.845 12.191C19.4074 12.7536 19.7233 13.5165 19.7233 14.312C19.7233 15.1075 19.4074 15.8704 18.845 16.433L14.602 20.676C14.0394 21.2384 13.2765 21.5544 12.481 21.5544C11.6855 21.5544 10.9226 21.2384 10.36 20.676L3.87397 14.191C3.59544 13.9123 3.37454 13.5814 3.22389 13.2173C3.07324 12.8532 2.99579 12.463 2.99597 12.069V7.327C2.99597 6.66396 3.25936 6.02807 3.72821 5.55923C4.19705 5.09039 4.83293 4.827 5.49597 4.827H10.238ZM10.238 6.827H5.49597C5.36336 6.827 5.23619 6.87968 5.14242 6.97345C5.04865 7.06722 4.99597 7.19439 4.99597 7.327V12.069C4.99576 12.3341 5.10079 12.5883 5.28797 12.776L11.774 19.262C11.9615 19.4495 12.2158 19.5548 12.481 19.5548C12.7461 19.5548 13.0004 19.4495 13.188 19.262L17.431 15.019C17.6184 14.8315 17.7238 14.5772 17.7238 14.312C17.7238 14.0468 17.6184 13.7925 17.431 13.605L10.945 7.12C10.7575 6.93245 10.5032 6.82706 10.238 6.827ZM7.53097 9.362C7.81237 9.08074 8.19397 8.92278 8.59183 8.92287C8.78882 8.92292 8.98389 8.96177 9.16587 9.0372C9.34786 9.11263 9.51321 9.22317 9.65247 9.3625C9.79174 9.50183 9.9022 9.66723 9.97754 9.84925C10.0529 10.0313 10.0916 10.2264 10.0916 10.4234C10.0916 10.6204 10.0527 10.8154 9.97727 10.9974C9.90184 11.1794 9.7913 11.3447 9.65197 11.484C9.37058 11.7653 8.98898 11.9232 8.59112 11.9231C8.19326 11.923 7.81173 11.7649 7.53047 11.4835C7.24921 11.2021 7.09125 10.8205 7.09134 10.4226C7.09139 10.2256 7.13024 10.0306 7.20567 9.8486C7.2811 9.66661 7.39164 9.50127 7.53097 9.362ZM11.652 2C12.046 1.99982 12.4362 2.07727 12.8003 2.22792C13.1644 2.37857 13.4953 2.59947 13.774 2.878L20.966 10.071C21.1481 10.2596 21.2489 10.5122 21.2466 10.7744C21.2444 11.0366 21.1392 11.2874 20.9538 11.4728C20.7684 11.6582 20.5176 11.7634 20.2554 11.7657C19.9932 11.768 19.7406 11.6672 19.552 11.485L12.36 4.29C12.1717 4.10331 11.9171 3.999 11.652 4H6.99997C6.73476 4 6.4804 3.89464 6.29287 3.70711C6.10533 3.51957 5.99997 3.26522 5.99997 3C5.99997 2.73478 6.10533 2.48043 6.29287 2.29289C6.4804 2.10536 6.73476 2 6.99997 2H11.652Z"
                                fill="#1B1B1B"
                            />
                        </svg>
                        {label}
                    </Link>
                </li>
            </ul>
            <Link href={link} className="head">
                {title}
            </Link>
            <Link href={link} className="readmore">
                Read More <i className="fa-solid fa-arrow-right" />
            </Link>
        </div>
    </div>
);

// BlogSidebar Component
export default function BlogSidebar() {
    return (
        <div className="blog-siderbar">
            <div className="all-category">
                {/* Search Area */}
                <div className="search-area">
                    <h3>Search Blog</h3>
                    <div className="space24" />
                    <form>
                        <input type="text" placeholder="Search..." />
                        <button>
                            <SearchIcon />
                        </button>
                    </form>
                </div>
                <div className="space30" />

                {/* Blog Categories */}
                <div className="categories-area">
                    <h3>Blog Category</h3>
                    <ul className="ps-0">
                        {blogCategories.map((category, index) => (
                            <li key={index}>
                                <Link href="/#">
                                    {category.name} ({category.count}) <BreadcrumbArrow />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space30" />

                {/* Featured Posts */}
                <div className="posts-area">
                    <h3>Featured Post</h3>
                    {featuredPosts.map((post, index) => (
                        <FeaturedPost key={index} {...post} />
                    ))}
                </div>
                <div className="space30" />

                {/* Popular Tags */}
                <div className="tags-area">
                    <h3>Popular Tags</h3>
                    <div className="space12" />
                    <ul>
                        <li>
                            <Link href="#">#RealEstateTips</Link>
                        </li>
                        <li>
                            <Link href="#">#SustainableLiving</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="#">#NeighborhoodGuide</Link>
                        </li>
                        <li>
                            <Link href="#">#DreamHome</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="#">#CommunityLiving</Link>
                        </li>
                        <li>
                            <Link href="#">#UrbanHomes</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="#">#HomeOwnership</Link>
                        </li>
                        <li>
                            <Link href="#">#FutureHomes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
