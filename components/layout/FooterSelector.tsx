"use client";

import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Footer3 from "./footer/Footer3";
import Footer4 from "./footer/Footer4";

interface FooterSelectorProps {
    footerStyle?: Number;
}

export default function FooterSelector({ footerStyle }: FooterSelectorProps) {
    if (footerStyle === 2) return <Footer2 />;
    if (footerStyle === 3) return <Footer3 />;
    if (footerStyle === 4) return <Footer4 />;
    return <Footer1 />;
} 