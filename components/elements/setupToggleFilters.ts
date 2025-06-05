export function setupToggleFilters(): void {
	// Check if we're in a browser environment
	if (typeof window === "undefined") return

	// Search filter toggle
	const openSearchButton = document.querySelector(".open-search-filter-form")
	const searchFilterForm = document.querySelector(".search-filter-form")

	// Check if both elements exist before adding event listeners
	if (openSearchButton && searchFilterForm) {
		// Add click event listener to the button
		openSearchButton.addEventListener("click", () => {
			// Toggle 'active' class on both the button and the search form
			openSearchButton.classList.toggle("active")
			searchFilterForm.classList.toggle("active")
		})
	}

	// Select the toggle button and the filter options form
	const toggleFilterButton = document.querySelector(".open-filter-form")
	const filterOptionsForm = document.querySelector(".filter-options-form")

	// Check if both elements exist before adding event listeners
	if (toggleFilterButton && filterOptionsForm) {
		// Add click event listener to the button
		toggleFilterButton.addEventListener("click", () => {
			// Toggle 'active' class on the button
			toggleFilterButton.classList.toggle("active")
			// Toggle 'active' class on the filter form
			filterOptionsForm.classList.toggle("active")
		})
	}
}

