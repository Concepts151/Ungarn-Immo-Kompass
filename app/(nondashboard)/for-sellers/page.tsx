import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ForSellersHero from "@/components/sections/ForSellersHero";
import SellingFeatures from "@/components/sections/SellingFeatures";
import { getTranslations } from "next-intl/server";

export default async function ForSellersPage() {
    const t = await getTranslations("ForSellersPage");

    return (
        <>
            <Layout>
                <InnerHeader title={t("title")} currentpage={t("title")} />
                <ForSellersHero />
                <SellingFeatures />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
