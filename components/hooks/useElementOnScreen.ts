"use client";

import { useEffect, useRef, useState } from 'react';

interface UseElementOnScreenProps {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export function useElementOnScreen({
    root = null,
    rootMargin = '0px',
    threshold = 0,
}: UseElementOnScreenProps = {}) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root,
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [root, rootMargin, threshold]);

    return { elementRef, isIntersecting };
} 