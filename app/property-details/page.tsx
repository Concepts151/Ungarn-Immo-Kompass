import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties1Details from "@/components/sections/Properties1Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Properties Details" currentpage="Properties Details" />
                <Properties1Details />
                <PropertyInner block_extend="d-none" />
                <div className="space30"></div>
                <PropertyBottom />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
