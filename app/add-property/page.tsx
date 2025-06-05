import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import AddProperty from "@/components/sections/AddProperty";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="Add New Property" currentpage="Add New Property" />
                <AddProperty />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
