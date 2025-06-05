"use client"

import { Collapse, Tab } from "bootstrap"
import { useEffect, useState } from "react"

function BootstrapComponents() {
	// Add a state to track if we're in the browser
	const [isBrowser, setIsBrowser] = useState(false)

	useEffect(() => {
		// Set isBrowser to true once the component mounts
		setIsBrowser(true)

		// Remove specific inline styles from body
		document.body.style.removeProperty("overflow")
		document.body.style.removeProperty("padding-right")

		// Initialize all tooltips
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
		tooltipTriggerList.forEach((tooltipTriggerEl) => new Tab(tooltipTriggerEl))

		// Initialize all popovers
		const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
		popoverTriggerList.forEach((popoverTriggerEl) => new Tab(popoverTriggerEl))

		// Initialize tabs and pills
		const tabTriggerList = document.querySelectorAll('[data-bs-toggle="tab"], [data-bs-toggle="pill"]')
		tabTriggerList.forEach((tabTriggerEl) => new Tab(tabTriggerEl))

		// Initialize accordions
		const accordionHeaders = document.querySelectorAll<HTMLElement>('[data-bs-toggle="collapse"]')
		accordionHeaders.forEach((header) => {
			const handleClick = () => {
				const target = header.getAttribute("data-bs-target")
				if (target) {
					const collapseElement = document.querySelector(target)
					if (collapseElement) {
						const collapseInstance = Collapse.getOrCreateInstance(collapseElement)
						collapseInstance.toggle()
					}
				}
			}

			header.addEventListener("click", handleClick)

			// Store the handleClick function for cleanup
			header.dataset.handleClick = handleClick.toString()
		})

		// Cleanup function
		return () => {
			accordionHeaders.forEach((header) => {
				const handleClick = new Function("return " + header.dataset.handleClick)()
				header.removeEventListener("click", handleClick)
				delete header.dataset.handleClick
			})
		}
	}, [])

	// Return null as we're not rendering any JSX
	return null
}

export default BootstrapComponents

