import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import BlogGrid from "@/components/sections/BlogGrid";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Our BlogGrid" currentpage="Our BlogGrid" />
                <BlogGrid />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
