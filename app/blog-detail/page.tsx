import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import BlogDetail from "@/components/sections/BlogDetail";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Blog Details" currentpage="Blog Details" />
                <BlogDetail />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
