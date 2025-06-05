import Layout from "@/components/layout/Layout";
import About1 from "@/components/sections/About1";
import Hero1 from "@/components/sections/Hero1";
import SearchBox from "@/components/sections/SearchBox";
import Category1 from "@/components/sections/Category1";
import Properties1 from "@/components/sections/Properties1";
import PropertyLocation1 from "@/components/sections/PropertyLocation1";
import Team1 from "@/components/sections/Team1";
import Testimonial1 from "@/components/sections/Testimonial1";
import Property1 from "@/components/sections/property1";
import Blog1 from "@/components/sections/Blog1";
export default function Home() {
    return (
        <>
            <Layout>
                <Hero1 />
                <SearchBox />
                <About1 />
                <Property1 />
                <Category1 />
                <Properties1 />
                <PropertyLocation1 />
                <Team1 />
                <Testimonial1 />
                <Blog1 />
            </Layout>
        </>
    );
}
