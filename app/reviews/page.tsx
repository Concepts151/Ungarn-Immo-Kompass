import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import DashboardReviews from "@/components/sections/DashboardReviews";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="Reviews" currentpage="Reviews" />
                <DashboardReviews />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
