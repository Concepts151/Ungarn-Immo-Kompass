import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties3Details from "@/components/sections/Properties3Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
export default function Home() {
    return (
        <>
            <Layout>
                <InnerHeader title="Beachfront Condo" currentpage="Beachfront Condo (Miami - Florida)" />
                <Properties3Details />
                <PropertyInner block_extend="d-none" />
                <div className="space30"></div>
                <PropertyBottom />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
