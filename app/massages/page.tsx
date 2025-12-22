"use client";
import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import StandaloneMatrixChat from "./components/StandaloneMatrixChat";
import { useTranslations } from "next-intl";

export default function MassagesPage() {
    const t = useTranslations("navbar");

    return (
        <Layout headerStyle={1}>
            <InnerHeader title={t("Message")} currentpage={t("Message")} />
            <section className="massages-page-wrapper py-10 bg-gray-50/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <StandaloneMatrixChat />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
