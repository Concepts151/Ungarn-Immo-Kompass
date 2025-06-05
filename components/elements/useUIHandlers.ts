"use client";

import { useEffect } from "react";

/**
 * UI interaction handlers for Next.js
 * Converted from jQuery to pure JavaScript functions
 */

// Custom hook for UI handlers
export function useUIHandlers(): void {
    useEffect(() => {
        // Only run these functions on the client side
        setupHeaderSearch();
        setupMobileMenu();
        setupHamburgerMenu();
        setupMobileSidebar(); // New function added here
    }, []);
}

// Header search functionality
function setupHeaderSearch(): void {
    // Search open
    const searchBtn = document.querySelector(".header-search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const searchForm = document.querySelector(".header-search-form-wrapper");
            const searchInput = document.querySelector('.header-search-form-wrapper input[type="search"]');
            const bodyOverlay = document.querySelector(".body-overlay");

            searchForm?.classList.add("open");
            (searchInput as HTMLInputElement)?.focus();
            bodyOverlay?.classList.add("active");
        });
    }

    // Search close
    const searchClose = document.querySelector(".tx-search-close");
    if (searchClose) {
        searchClose.addEventListener("click", (e) => {
            e.preventDefault();
            const searchForm = document.querySelector(".header-search-form-wrapper");
            const bodyOverlay = document.querySelector(".body-overlay");

            searchForm?.classList.remove("open");
            document.body.classList.remove("active");
            bodyOverlay?.classList.remove("active");
        });
    }
}

// Mobile menu functionality
function setupMobileMenu(): void {
    // Simple implementation of dropdown toggle functionality
    const mobileMenu = document.querySelector("#mobile-menu-active");

    if (mobileMenu) {
        // Handle dropdown toggles
        const dropdowns = mobileMenu.querySelectorAll(".dropdown > a");
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("click", (e) => {
                e.preventDefault();
                const parent = (e.currentTarget as HTMLElement).parentElement;

                // Toggle the submenu visibility
                const submenu = parent?.querySelector("ul");
                if (submenu) {
                    const isExpanded = submenu.classList.contains("show");
                    if (isExpanded) {
                        submenu.classList.remove("show");
                        parent?.classList.remove("active");
                    } else {
                        submenu.classList.add("show");
                        parent?.classList.add("active");
                    }
                }
            });
        });
    }
}
// Hamburger menu functionality
function setupHamburgerMenu(): void {
    // Hamburger menu open
    const hamburgerBtn = document.querySelector(".hamburger_menu");
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const slideBar = document.querySelector(".slide-bar");
            const bodyOverlay = document.querySelector(".body-overlay");

            slideBar?.classList.toggle("show");
            document.body.classList.add("on-side");
            bodyOverlay?.classList.add("active");
            (e.currentTarget as HTMLElement).classList.add("active");
        });
    }

    // Mobile menu close
    const closeBtn = document.querySelector(".close-mobile-menu > a");
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const slideBar = document.querySelector(".slide-bar");
            const bodyOverlay = document.querySelector(".body-overlay");
            const hamburgerBtn = document.querySelector(".hamburger_menu");

            slideBar?.classList.remove("show");
            document.body.classList.remove("on-side");
            bodyOverlay?.classList.remove("active");
            hamburgerBtn?.classList.remove("active");
        });
    }
}

// New function: Mobile sidebar functionality
function setupMobileSidebar(): void {
    const mobileNavOpen = document.querySelector(".vl-offcanvas-toggle");
    const mobileSidebar = document.querySelector(".vl-offcanvas");
    const mobileNavClose = document.querySelector(".vl-offcanvas-close-toggle");

    if (mobileNavOpen && mobileSidebar && mobileNavClose) {
        mobileNavOpen.addEventListener("click", () => {
            mobileSidebar.classList.add("vl-offcanvas-open");
        });

        mobileNavClose.addEventListener("click", () => {
            mobileSidebar.classList.remove("vl-offcanvas-open");
        });
    }
}

// Initialize all UI handlers
export function initUIHandlers(): void {
    setupHeaderSearch();
    setupMobileMenu();
    setupHamburgerMenu();
    setupMobileSidebar(); // New function added here
}
