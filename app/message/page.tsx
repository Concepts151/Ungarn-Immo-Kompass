import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import DashboardMessage from "@/components/sections/DashboardMessage";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="All Message" currentpage="All Message" />
                <DashboardMessage />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
