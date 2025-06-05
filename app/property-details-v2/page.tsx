import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties2Details from "@/components/sections/Properties2Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Modern Apartment" currentpage="Modern Apartment (New York - New York)" />
                <Properties2Details />
                <PropertyInner block_extend="d-none" />
                <div className="space30"></div>
                <PropertyBottom />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
