"use client"

import { useCallback, useEffect } from "react"

export function useNiceSelect() {
	const initializeNiceSelect = useCallback(() => {
		const selects = document.querySelectorAll<HTMLSelectElement>("select")

		selects.forEach((select) => {
			// Skip if already initialized
			if (select.nextElementSibling?.classList.contains("nice-select")) return

			// Hide native select
			select.style.display = "none"

			// Create custom markup
			createNiceSelect(select)
		})
	}, [])

	useEffect(() => {
		initializeNiceSelect()

		// Cleanup on unmount
		return () => {
			document.querySelectorAll<HTMLElement>(".nice-select").forEach((el) => el.remove())
			document.querySelectorAll<HTMLSelectElement>("select").forEach((el) => (el.style.display = ""))
		}
	}, [initializeNiceSelect])

	function createNiceSelect(select: HTMLSelectElement) {
		// Create wrapper element
		const dropdown = document.createElement("div")
		dropdown.className = "nice-select"

		// Add original select's classes
		if (select.className) {
			select.className.split(" ").forEach((className) => {
				if (className) dropdown.classList.add(className)
			})
		}

		// Handle disabled state
		if (select.disabled) {
			dropdown.classList.add("disabled")
			dropdown.removeAttribute("tabindex")
		} else {
			dropdown.setAttribute("tabindex", "0")
		}

		// Create current display and dropdown list
		dropdown.innerHTML = '<span class="current"></span><ul class="list"></ul>'

		// Get selected option
		const selectedOption = select.options[select.selectedIndex]
		const current = dropdown.querySelector<HTMLElement>(".current")
		if (current) {
			current.innerHTML = selectedOption.dataset.display || selectedOption.textContent || ""
		}

		// Create list of options
		const list = dropdown.querySelector<HTMLUListElement>(".list")
		if (list) {
			Array.from(select.options).forEach((option) => {
				const item = document.createElement("li")
				item.setAttribute("data-value", option.value)

				if (option.dataset.display) {
					item.setAttribute("data-display", option.dataset.display)
				}

				item.className = "option"
				if (option.selected) item.classList.add("selected")
				if (option.disabled) item.classList.add("disabled")

				item.innerHTML = option.textContent || ""
				list.appendChild(item)
			})
		}

		// Insert the custom dropdown after the original select
		select.parentNode?.insertBefore(dropdown, select.nextSibling)

		// Add event listeners
		setupEventListeners(dropdown, select)
	}

	function setupEventListeners(dropdown: HTMLElement, select: HTMLSelectElement) {
		// Toggle dropdown on click
		dropdown.addEventListener("click", (e) => {
			e.stopPropagation()

			// Close all other dropdowns
			document.querySelectorAll<HTMLElement>(".nice-select").forEach((el) => {
				if (el !== dropdown) el.classList.remove("open")
			})

			dropdown.classList.toggle("open")

			if (dropdown.classList.contains("open")) {
				const selected = dropdown.querySelector<HTMLElement>(".selected")
				if (selected) {
					selected.classList.add("focus")
				}
			}
		})

		// Option click
		dropdown.querySelectorAll<HTMLElement>(".option:not(.disabled)").forEach((option) => {
			option.addEventListener("click", function (this: HTMLElement, e) {
				e.stopPropagation()

				dropdown.querySelector<HTMLElement>(".selected")?.classList.remove("selected")
				this.classList.add("selected")

				const text = this.dataset.display || this.textContent
				const currentElement = dropdown.querySelector<HTMLElement>(".current")
				if (currentElement) {
					currentElement.textContent = text || ""
				}

				// Update the original select
				const value = this.dataset.value
				if (value !== undefined) {
					for (let i = 0; i < select.options.length; i++) {
						if (select.options[i].value === value) {
							select.selectedIndex = i
							break
						}
					}
				}

				// Trigger change event
				const event = new Event("change", { bubbles: true })
				select.dispatchEvent(event)

				dropdown.classList.remove("open")
			})
		})

		// Close when clicking outside
		document.addEventListener("click", (e) => {
			if (e.target instanceof Node && !dropdown.contains(e.target)) {
				dropdown.classList.remove("open")
			}
		})

		// Keyboard navigation
		dropdown.addEventListener("keydown", (e) => {
			const focused = dropdown.querySelector<HTMLElement>(".focus") || dropdown.querySelector<HTMLElement>(".selected")

			// Space or Enter
			if (e.keyCode === 32 || e.keyCode === 13) {
				if (dropdown.classList.contains("open")) {
					focused?.click()
				} else {
					dropdown.click()
				}
				return false
			}

			// Down
			else if (e.keyCode === 40) {
				if (!dropdown.classList.contains("open")) {
					dropdown.click()
				} else {
					const next = getNextFocusableOption(focused)
					if (next) {
						dropdown.querySelector<HTMLElement>(".focus")?.classList.remove("focus")
						next.classList.add("focus")
					}
				}
				e.preventDefault()
				return false
			}

			// Up
			else if (e.keyCode === 38) {
				if (!dropdown.classList.contains("open")) {
					dropdown.click()
				} else {
					const prev = getPrevFocusableOption(focused)
					if (prev) {
						dropdown.querySelector<HTMLElement>(".focus")?.classList.remove("focus")
						prev.classList.add("focus")
					}
				}
				e.preventDefault()
				return false
			}

			// Esc
			else if (e.keyCode === 27) {
				if (dropdown.classList.contains("open")) {
					dropdown.click()
				}
			}

			// Tab
			else if (e.keyCode === 9) {
				if (dropdown.classList.contains("open")) {
					e.preventDefault()
				}
			}
		})
	}

	function getNextFocusableOption(element: HTMLElement | null): HTMLElement | null {
		let next = element?.nextElementSibling as HTMLElement | null
		while (next && next.classList.contains("disabled")) {
			next = next.nextElementSibling as HTMLElement | null
		}
		return next
	}

	function getPrevFocusableOption(element: HTMLElement | null): HTMLElement | null {
		let prev = element?.previousElementSibling as HTMLElement | null
		while (prev && prev.classList.contains("disabled")) {
			prev = prev.previousElementSibling as HTMLElement | null
		}
		return prev
	}

	return { initializeNiceSelect }
}

export default useNiceSelect

