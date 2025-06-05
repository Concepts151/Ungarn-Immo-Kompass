import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import About1 from "@/components/sections/About1";
import Others4 from "@/components/sections/Others4";
import Others3 from "@/components/sections/Others3";
import Team1 from "@/components/sections/Team1";
import Testimonial1 from "@/components/sections/Testimonial1";
import Property1 from "@/components/sections/property1";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="About Us" currentpage="About Us" />
                <About1 />
                <Others3 />
                <Others4 />
                <Property1 />
                <div className="space30"></div>
                <Team1 />
                <Testimonial1 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
