import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Blog from "@/components/sections/Blog";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Our Blog" currentpage="Our Blog" />
                <Blog />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
