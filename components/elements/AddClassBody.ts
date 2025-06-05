"use client";
import { usePathname } from "next/navigation"; // Corrected import path
import { useEffect } from "react";

export default function AddClassBody() {
    const pathname = usePathname();

    useEffect(() => {
        const bodyElement = document.querySelector("body");

        if (bodyElement) {
            // Remove all classes
            bodyElement.classList.remove("homepage2-body", "homepage4-body", "homepage3-body", "homepage1-body");

            // Add class based on pathname
            // Add class based on pathname
            if (pathname === "/index2") {
                bodyElement.classList.add("homepage2-body");
            } else if (pathname === "/index3") {
                bodyElement.classList.add("homepage3-body");
            } else if (pathname === "/index4") {
                bodyElement.classList.add("homepage4-body");
            } else {
                bodyElement.classList.add("homepage1-body", "b-bg1");
            }
        }
    }, [pathname]);

    return null;
}
