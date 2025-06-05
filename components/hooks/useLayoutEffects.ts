"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { useScrollHeader } from '../elements/useScrollHeader';
import { useSearchFormToggle } from '../elements/useSearchFormToggle';
import { useTabSwitcher } from '../elements/setupTabSwitcher';
import { useUIHandlers } from '../elements/useUIHandlers';
import { useOdometerCounter } from '@/utils/useOdometerCounter';
import useNiceSelect from '../elements/useNiceSelect';
import { setupToggleFilters } from '../elements/setupToggleFilters';

export function useLayoutEffects() {
    const [scroll, setScroll] = useState<boolean>(false);
    const [isMobileMenu, setMobileMenu] = useState<boolean>(false);

    // Initialize AOS
    useEffect(() => {
        AOS.init();
    }, []);

    // Initialize all custom hooks
    useScrollHeader();
    useSearchFormToggle();
    useTabSwitcher();
    useUIHandlers();
    useOdometerCounter();
    useNiceSelect();

    // Handle scroll events
    useEffect(() => {
        setupToggleFilters();

        const handleScroll = (): void => {
            const scrollCheck: boolean = window.scrollY > 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [scroll]);

    const handleMobileMenu = (): void => setMobileMenu(!isMobileMenu);

    return {
        scroll,
        isMobileMenu,
        handleMobileMenu
    };
} 