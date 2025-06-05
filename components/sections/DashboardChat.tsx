import LineChart from "../elements/line-chart";

export default function DashboardChat() {
    return (
        <>
            <div className="dash-chat-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboardboxarea">
                                <h3>Page Inside</h3>
                                <div className="space28" />
                                <div className="wd-filter-date">
                                    <div className="left">
                                        <div className="dates active">Day</div>
                                        <div className="dates">Week</div>
                                        <div className="dates">Month</div>
                                        <div className="dates">Year</div>
                                    </div>
                                    <div className="right">
                                        <div className="ip-group icon">
                                            <input type="date" />
                                        </div>
                                        <div className="ip-group icon">
                                            <input type="date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space32" />
                                <div className="chart-box">
                                    <LineChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
