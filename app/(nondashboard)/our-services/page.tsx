import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import OurServicesHero from "@/components/sections/OurServicesHero";
import ServicesFeatures from "@/components/sections/ServicesFeatures";
import { getTranslations } from "next-intl/server";

export default async function OurServicesPage() {
    const t = await getTranslations("ServicesPage");

    return (
        <>
            <Layout>
                <InnerHeader title={t("title")} currentpage={t("title")} />
                <OurServicesHero />
                <ServicesFeatures />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
