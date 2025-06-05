"use client"

import { useCallback, useEffect } from "react"

/**
 * Hook for using tab switcher in React components with display style
 * @param tabButtonSelector - CSS selector for tab buttons
 * @param tabContentSelector - CSS selector for tab content elements
 * @param activeClass - CSS class to apply to active tab button (default: "active")
 */
export function useTabSwitcher(
  tabButtonSelector = ".tab-btn",
  tabContentSelector = ".tab-content1",
  activeClass = "active"
) {
  const setupTabSwitcher = useCallback(() => {
    const tabButtons = document.querySelectorAll<HTMLElement>(tabButtonSelector)
    const tabContents = document.querySelectorAll<HTMLElement>(tabContentSelector)

    const handleTabClick = (button: HTMLElement) => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove(activeClass))

      // Add active class to clicked button
      button.classList.add(activeClass)

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none"
      })

      // Show the selected tab content
      const tabId = button.getAttribute("data-tab")
      if (tabId) {
        const targetContent = document.getElementById(tabId)
        if (targetContent) {
          targetContent.style.display = "block"
        }
      }
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => handleTabClick(button))
    })

    // Initialize first tab as active if none are active
    if (tabButtons.length > 0 && !Array.from(tabButtons).some((btn) => btn.classList.contains(activeClass))) {
      handleTabClick(tabButtons[0])
    }

    // Return cleanup function
    return () => {
      tabButtons.forEach((button) => {
        button.removeEventListener("click", () => handleTabClick(button))
      })
    }
  }, [tabButtonSelector, tabContentSelector, activeClass])

  useEffect(() => {
    // Setup tabs when component mounts
    const cleanup = setupTabSwitcher()

    // Clean up when component unmounts
    return cleanup
  }, [setupTabSwitcher])
}