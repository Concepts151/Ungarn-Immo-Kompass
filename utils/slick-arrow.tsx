import React from 'react'

// Define types for arrow props
interface ArrowProps {
	currentSlide?: number
	slideCount?: number
	clsProps?: string
	[key: string]: any
}

// Arrow Components
export const SlickArrowLeft: React.FC<ArrowProps> = ({ currentSlide, slideCount, clsProps, ...props }) => (
	<button
		{...props}
		className={`slick-prev slick-arrow ${clsProps} ${currentSlide === 0 ? "slick-disabled" : ""}`}
		aria-hidden="true"
		aria-disabled={currentSlide === 0}
		type="button"
	>
		Previous
	</button>
)

export const SlickArrowRight: React.FC<ArrowProps> = ({ currentSlide, slideCount, clsProps, ...props }) => (
	<button
		{...props}
		className={`slick-next slick-arrow ${clsProps} ${currentSlide === slideCount! - 1 ? "slick-disabled" : ""}`}
		aria-hidden="true"
		aria-disabled={currentSlide === slideCount! - 1}
		type="button"
	>
		Next
	</button>
)