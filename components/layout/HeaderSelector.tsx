"use client";

import Header1 from "./header/Header1";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";
import Header4 from "./header/Header4";
import Header5 from "./header/Header5";

interface HeaderSelectorProps {
    headerStyle?: Number;
    scroll: boolean;
}

export default function HeaderSelector({ headerStyle, scroll }: HeaderSelectorProps) {
    if (headerStyle === 2) return <Header2 scroll={scroll} />;
    if (headerStyle === 3) return <Header3 scroll={scroll} />;
    if (headerStyle === 4) return <Header4 scroll={scroll} />;
    if (headerStyle === 5) return <Header5 scroll={scroll} />;
    return <Header1 scroll={scroll} />;
} 