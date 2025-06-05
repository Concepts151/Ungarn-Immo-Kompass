import InnerHeader from "@/components/layout/InnerHeader";
import PropertyList2 from "@/components/elements/property-list2";
import Layout from "@/components/layout/Layout";
export default function PropertyHalfmapGrid() {
    return (
        <>
            <Layout>
                <InnerHeader title="Property Half Map Grid" currentpage="Property Half Map Grid" />
                {/*===== PROPERTY AREA STARTS =======*/}
                <div className="property-half-grid-area sp1">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8">
                                <PropertyList2 />
                            </div>
                            <div className="col-lg-4">
                                <div className="grid-maps-area">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===== PROPERTY AREA ENDS =======*/}
            </Layout>
        </>
    );
}
