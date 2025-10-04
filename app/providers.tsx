"use client";
import StoreProvider from "@/state/redux";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

// component not in use

const Providers = ({ children }: { children: React.ReactNode }) => {
    <StoreProvider>
        {children}
    </StoreProvider>
};

export default Providers
