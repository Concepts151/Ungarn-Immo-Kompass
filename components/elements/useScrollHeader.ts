"use client"

import { useEffect } from "react"

/**
 * Hook to add sticky behavior to header on scroll
 * @param headerSelector - CSS selector for the header element
 * @param stickyClass - Class name to add when header becomes sticky
 */
export function useScrollHeader(headerSelector = ".header-area", stickyClass = "sticky"): void {
  useEffect(() => {
    // Check if header element exists
    const header = document.querySelector(headerSelector)

    if (!header) {
      return
    }

    // Function to handle scroll event
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      if (scrollPosition < 1) {
        header.classList.remove(stickyClass)
      } else {
        header.classList.add(stickyClass)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headerSelector, stickyClass])
}

