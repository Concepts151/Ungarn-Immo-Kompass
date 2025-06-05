import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import BlogDetail2 from "@/components/sections/BlogDetail2";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Blog Details" currentpage="Blog Details" />
                <BlogDetail2 />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
