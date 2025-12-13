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
import LoginModal from "./pg/components/LoginModal";
import RegisterModal from "./pg/components/RegisterModal";
import { Toaster } from "react-hot-toast";

export default function Home() {
  console.log(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <>
      <Layout>
        <Toaster position="top-center" />
        <Hero1 />
        <SearchBox />
        <About1 />
        <Property1 />
        <Category1 />
        {/* <Properties1 /> */}
        <PropertyLocation1 />
        {/* <Team1 /> */}
        <Testimonial1 />
        <div className="space30"></div>
        {/* <Blog1 /> */}
      </Layout>
    </>
  );
}
