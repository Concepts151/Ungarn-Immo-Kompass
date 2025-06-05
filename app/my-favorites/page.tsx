import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import DashboardArea from "@/components/sections/DashboardArea";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="My Favourite" currentpage="My Favourite" />
                <DashboardArea />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
