"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

export function useRevealAnimation() {
	useEffect(() => {
		// Register ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger)

		// Query select all elements with class "reveal"
		const revealContainers = document.querySelectorAll(".reveal")

		// Apply animations to each container
		revealContainers.forEach((container) => {
			// Find the image inside the container
			const image = container.querySelector("img")

			if (image) {
				// Create timeline with ScrollTrigger
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: container,
						toggleActions: "play none none none",
					},
				})

				// Set initial visibility
				tl.set(container, { autoAlpha: 1 })

				// Animate container from left
				tl.from(container, {
					xPercent: -100,
					duration: 1.5,
					ease: "power2.out",
				})

				// Animate image from right with scale
				tl.from(
					image,
					{
						xPercent: 100,
						scale: 1.3,
						duration: 1.5,
						ease: "power2.out",
					},
					"-=1.5",
				) // Start at the same time as container animation
			}
		})

		// Cleanup function
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill()
			})
		}
	}, []) // Empty dependency array means this runs once on mount
}

