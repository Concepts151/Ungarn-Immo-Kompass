import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Pricing1 from "@/components/sections/Pricing1";
import Faq1 from "@/components/sections/Faq1";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Pricing Plan" currentpage="Pricing Plan" />
                <Pricing1 />
                <div className="space30"></div>
                <Faq1 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
