import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Faq2 from "@/components/sections/Faq2";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Frequently Asked Question" currentpage="Frequently Asked Question" />
                <Faq2 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
