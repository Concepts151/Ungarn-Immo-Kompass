import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ForBuyersHero from "@/components/sections/ForBuyersHero";
import BuyingSteps from "@/components/sections/BuyingSteps";
import { getTranslations } from "next-intl/server";

export default async function ForBuyersPage() {
    const t = await getTranslations("ForBuyersPage");

    return (
        <>
            <Layout>
                <InnerHeader title={t("title")} currentpage={t("title")} />
                <ForBuyersHero />
                <BuyingSteps />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
