import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties4Details from "@/components/sections/Properties4Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Cozy Cottage" currentpage="Cozy Cottage (Seattle - Washington)" />
                <Properties4Details />
                <PropertyInner block_extend="d-block" />
                <div className="space30"></div>
                <PropertyBottom />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
