"use client"

import { useEffect } from "react"

export function useSearchFormToggle() {
	useEffect(() => {
		const showFormButton = document.querySelector(".show-form")

		if (!showFormButton) return

		const handleClick = (e: Event) => {
			e.preventDefault()

			// Cast to HTMLElement and toggle the class
			const button = e.currentTarget as HTMLElement
			button.classList.toggle("click")

			// Find and toggle the search form
			const searchForm = document.querySelector(".wd-search-form")
			if (searchForm) {
				searchForm.classList.toggle("show-box")
			}
		}

		// Add the event listener
		showFormButton.addEventListener("click", handleClick)

		// Return cleanup function directly from useEffect
		return () => {
			showFormButton.removeEventListener("click", handleClick)
		}
	}, []) // Empty dependency array means this effect runs once on mount
}