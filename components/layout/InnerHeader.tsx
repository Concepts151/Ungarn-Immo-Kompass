import Link from "next/link";
export default function InnerHeader({ title, currentpage }: any) {
    return (
        <>
            <div className="space30" />
            {/*===== HERO AREA STARTS =======*/}
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>{title}</h2>
                                <div className="space28" />
                                <p>
                                    <Link href="/">Home</Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={16} viewBox="0 0 9 16" fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {currentpage}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="inner-images">
                                <img src="/assets/img/all-images/hero/hero-img9.png" alt="housa" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
            <div className="space30" />
        </>
    );
}
