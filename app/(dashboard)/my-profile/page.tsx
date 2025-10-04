import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Profile1 from "@/components/sections/Profile1";
export default function Home() {
    return (
        <>
            <Layout headerStyle={1}>
                {/* <InnerHeader title="My Profile" currentpage="My Profile" /> */}
                <div className="space30"></div>
                <div className="space30"></div>
                <div className="space30"></div>
                <div className="space30"></div>
                <div className="space30"></div>
                <Profile1 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
