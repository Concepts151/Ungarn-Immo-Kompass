"use client"

import React, { useState } from "react"

export default function Heart() {
	const [isActive, setIsActive] = useState(false)

	// Function to handle the click event and toggle the state
	const handleClick = () => {
		setIsActive(!isActive)
	}

	// Using React.createElement instead of JSX
	return React.createElement("div", {
		className: `heart ${isActive ? "active" : ""}`,
		onClick: handleClick,
	})
}

