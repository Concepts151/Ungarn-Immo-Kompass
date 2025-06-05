import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import DashboardArea from "@/components/sections/DashboardArea";
import DashboardMessage from "@/components/sections/DashboardMessage";
import DashboardChat from "@/components/sections/DashboardChat";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="Dashboard" currentpage="Dashboard" />
                <DashboardArea />
                <div className="space30"></div>
                <DashboardMessage />
                <div className="space30"></div>
                <DashboardChat />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
