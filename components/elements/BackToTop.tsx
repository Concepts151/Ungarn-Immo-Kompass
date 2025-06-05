'use client'
import { useEffect, useState } from "react"

export default function BackToTop({ target }:any) {
	const [hasScrolled, setHasScrolled] = useState(false)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			const scrollTop = window.scrollY
			const docHeight = document.documentElement.scrollHeight - window.innerHeight
			const progress = (scrollTop / docHeight) * 100
			setProgress(progress)
			setHasScrolled(scrollTop > 100)
		}

		window.addEventListener("scroll", onScroll)
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const handleClick = () => {
		window.scrollTo({
			top: document.querySelector(target).offsetTop,
			behavior: 'smooth'
		})
	}

	return (
		<>
			{hasScrolled && (
				<div className="paginacontainer" onClick={handleClick}>
					<div className="progress-wrap active-progress">
						<svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
							<path
								d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
								style={{
									transition: 'stroke-dashoffset 10ms linear',
									strokeDasharray: '307.919',
									strokeDashoffset: `${307.919 - (progress / 100) * 307.919}`,
								}}
							/>
						</svg>
					</div>
				</div>
			)}
		</>
	)
}
