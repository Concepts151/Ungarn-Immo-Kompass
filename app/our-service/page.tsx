import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Service1 from "@/components/sections/Service1";
import Testimonial1 from "@/components/sections/Testimonial1";
import Faq1 from "@/components/sections/Faq1";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Our Service" currentpage="Our Service" />
                <Service1 />
                <Testimonial1 />
                <div className="space30"></div>
                <Faq1 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
