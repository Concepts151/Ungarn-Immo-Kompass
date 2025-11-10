"use client";

import Header1 from "./header/Header1";

interface HeaderSelectorProps {
    headerStyle?: Number;
    scroll: boolean;
}

export default function HeaderSelector({ headerStyle, scroll }: HeaderSelectorProps) {
  
    return <Header1 scroll={scroll} />;
} 