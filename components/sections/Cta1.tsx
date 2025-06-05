export default function Cta1() {
    return (
        <>
            {/*===== CTA AREA STARTS =======*/}
            <div className="cta3-section-area">
                <div className="container">
                    <div className="row align-items-center cta-row">
                        <div className="col-lg-6">
                            <div className="heading1">
                                <h2>Sell Your Home Faster with Our Expert Help!</h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-area text-end">
                                <form>
                                    <input type="text" placeholder="Enter Category" />
                                    <button type="submit" className="vl-btn1">
                                        Search Now
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== CTA AREA ENDS =======*/}
        </>
    );
}
