import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Contact1 from "@/components/sections/Contact1";
import Faq1 from "@/components/sections/Faq1";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Contact Us" currentpage="Contact Us" />
                <Contact1 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
