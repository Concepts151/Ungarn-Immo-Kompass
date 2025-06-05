import Link from "next/link";
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
    {
        image: "/assets/img/all-images/blog/blog-img7.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "5 Things to Consider Before Buying a Home",
        link: "/blog-detail",
        date: "19",
        month: "AUG",
    },
    {
        image: "/assets/img/all-images/blog/blog-img8.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "Top Real Estate Investment Strategies for 2025",
        link: "/blog-detail",
        date: "22",
        month: "AUG",
    },
    {
        image: "/assets/img/all-images/blog/blog-img9.png",
        author: "Leigh Harris",
        label: "Deluxe",
        title: "How to Sell Your Property Fast & Get the Best Price",
        link: "/blog-detail",
        date: "24",
        month: "AUG",
    },
];

// Component for rendering main blog posts
const BlogPost = ({ image, author, title, link, label, date, month }: (typeof mainBlogPosts)[0]) => (
    <div className="col-lg-6 col-md-6">
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
export default function Blog() {
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
                            <div className="bg-area">
                                <div className="row">
                                    {mainBlogPosts.map((post, index) => (
                                        <BlogPost key={index} {...post} />
                                    ))}
                                    {/* Pagination */}
                                    <div className="col-lg-12">
                                        <div className="space30" />
                                        <div className="pagination-area">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#" aria-label="Previous">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                                                            </svg>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link active" href="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            ....
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#">
                                                            12
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" href="#" aria-label="Next">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                                                            </svg>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== BLOG AREA ENDS =======*/}
        </>
    );
}
