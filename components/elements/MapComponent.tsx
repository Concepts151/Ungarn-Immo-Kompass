"use client";

import { useEffect, useRef } from 'react';

interface MapComponentProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function MapComponent({ width = 600, height = 450, className = '' }: MapComponentProps) {
    const mapRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && mapRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                mapRef.current.style.width = `${containerWidth}px`;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className={`grid-maps-area ${className}`}>
            <iframe
                ref={mapRef}
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd"
                width={width}
                height={height}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
} 