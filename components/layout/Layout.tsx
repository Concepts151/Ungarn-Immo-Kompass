"use client";

import dynamic from "next/dynamic";
import AddClassBody from "../elements/AddClassBody";
import AnimatedText from "../elements/animateText";
import BackToTop from "../elements/BackToTop";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import HeaderSelector from "./HeaderSelector";
import FooterSelector from "./FooterSelector";
import { useLayoutEffects } from "../hooks/useLayoutEffects";
import Header1 from "./header/Header1";
import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Footer3 from "./footer/Footer3";
import Footer4 from "./footer/Footer4";

const BootstrapComponents = dynamic(
  () => import("../elements/BootstrapComponents"),
  { ssr: false }
);

interface LayoutProps {
  headerStyle?: Number;
  footerStyle?: Number;
  children?: React.ReactNode;
  breadcrumbTitle?: string;
}

export default function Layout({
  headerStyle,
  footerStyle,
  children,
}: LayoutProps) {
  const { scroll, isMobileMenu, handleMobileMenu } = useLayoutEffects();

  return (
    <div>
      <div id="top" />
      <AddClassBody />
      <AnimatedText />
      <BootstrapComponents />

      {/* <HeaderSelector headerStyle={headerStyle} scroll={scroll} /> */}
      <Header1 scroll={scroll} />
      <Search />
      <MobileMenu
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
      />

      {children}

      {/* <FooterSelector footerStyle={footerStyle} /> */}
      <Footer4 />
      <BackToTop target="#top" />
    </div>
  );
}
