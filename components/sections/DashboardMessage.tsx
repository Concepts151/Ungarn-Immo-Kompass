import Link from "next/link";

interface MessageBoxProps {
    avatar: string;
    name: string;
    message: string;
    daysAgo: number;
    isLast?: boolean;
}

const MessageBox = ({ avatar, name, message, daysAgo, isLast = false }: MessageBoxProps) => {
    return (
        <div className="col-lg-6">
            <div className="message-boxarea px-2" style={isLast ? { borderBottom: "none", paddingBottom: 0 } : {}}>
                <div className="space32"></div>
                <div className="img1">
                    <img src={avatar} alt="housa" />
                </div>
                <div className="conatent-area">
                    <div className="content">
                        <Link href="#">{name}</Link>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.8046 13.12C14.8046 14.1128 14.0034 14.914 13.0106 14.914H4.0792C3.0864 14.914 2.28516 14.1128 2.28516 13.12V4.18857C2.28516 3.19577 3.0864 2.39453 4.0792 2.39453H6.041V1.77481C6.04201 1.62752 6.09392 1.4851 6.18792 1.3717C6.28193 1.2583 6.41225 1.18089 6.5568 1.15259L6.66697 1.14258C7.01251 1.14258 7.29295 1.4105 7.29295 1.77481V2.39453H9.79684V1.77481C9.79785 1.62752 9.84976 1.4851 9.94377 1.3717C10.0378 1.2583 10.1681 1.18089 10.3126 1.15259L10.4228 1.14258C10.7684 1.14258 11.0488 1.4105 11.0488 1.77481V2.39453H13.0106C14.0034 2.39453 14.8046 3.19577 14.8046 4.18857V13.12ZM3.5371 6.15037V12.8233C3.5371 13.2865 3.91269 13.6621 4.37591 13.6621H12.7139C13.1771 13.6621 13.5527 13.2865 13.5527 12.8233V6.15037H3.5371Z"
                                    fill="#424242"
                                />
                            </svg>
                            {daysAgo} Days Ago
                        </p>
                    </div>
                    <div className="space14" />
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

const messageData = [
    {
        id: 1,
        avatar: "/assets/img/all-images/others/others-img1.png",
        name: "Henry Nicolas",
        message: "We're excited to help you find your dream home! Our team has carefully curated a selection of properties that match your preferences for location, style, and budget. We understand that choosing a home is one of life's biggest decisions, and we're here to guide you through every step of the process. Would you like to schedule a viewing of any properties you're interested in?",
        daysAgo: 3
    },
    {
        id: 2,
        avatar: "/assets/img/all-images/others/others-img2.png",
        name: "Kane Williamson",
        message: "Thank you for your interest in our properties! I've reviewed your requirements and found several excellent matches in your preferred neighborhoods. These properties feature modern amenities, spacious layouts, and are within your budget range. I'd be happy to arrange private viewings at your convenience and discuss the unique features of each property in detail.",
        daysAgo: 3
    },
    {
        id: 3,
        avatar: "/assets/img/all-images/others/others-img3.png",
        name: "Marting Guptil",
        message: "I noticed you're interested in properties in the downtown area. As a local real estate expert, I can tell you this neighborhood has seen significant development recently, with new parks, restaurants, and improved public transport links. The property you inquired about is particularly well-positioned to benefit from these improvements. Would you like more specific information about the area's amenities?",
        daysAgo: 3
    },
    {
        id: 4,
        avatar: "/assets/img/all-images/others/others-img5.png",
        name: "Gleen Philips",
        message: "Based on your recent property viewing, I've compiled some additional options that match your criteria. Each of these homes offers the open-concept layout you preferred, along with the modern kitchen features you mentioned were important. I've also included detailed information about the local schools and community facilities, as requested. Let me know when you'd like to explore these options further.",
        daysAgo: 3
    },
    {
        id: 5,
        avatar: "/assets/img/all-images/others/others-img5.png",
        name: "Trent Boult",
        message: "Following up on our discussion about investment properties, I've analyzed the rental market in your target areas. The properties I've selected show strong potential for rental yield and capital appreciation. I've prepared a detailed report comparing historical price trends, current market conditions, and future growth projections. Would you like to schedule a call to discuss these opportunities in detail?",
        daysAgo: 3
    },
    {
        id: 6,
        avatar: "/assets/img/all-images/others/others-img5.png",
        name: "Gleen Philips",
        message: "Based on your recent property viewing, I've compiled some additional options that match your criteria. Each of these homes offers the open-concept layout you preferred, along with the modern kitchen features you mentioned were important. I've also included detailed information about the local schools and community facilities, as requested. Let me know when you'd like to explore these options further.",
        daysAgo: 3
    }
];

export default function DashboardMessage() {
    return (
        <>
            <div className="dashboard-message">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>All Messages</h3>
                            <div className="space40" />
                            <div className="dashboard-info-sider-deatils">
                                <div className="dashboard-info-sider bg-white">
                                    <div className="row">
                                        {messageData.map((message, index) => (
                                            <MessageBox
                                                key={message.id}
                                                avatar={message.avatar}
                                                name={message.name}
                                                message={message.message}
                                                daysAgo={message.daysAgo}
                                                isLast={index === messageData.length - 1}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
