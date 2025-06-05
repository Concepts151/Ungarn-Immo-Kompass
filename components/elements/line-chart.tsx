"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function LineChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d");

            if (ctx) {
                // Create gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(7, 59, 58, 0.6)");
                gradient.addColorStop(1, "rgba(7, 59, 58, 0)");

                // Create new chart
                chartInstance.current = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                data: [42, 45, 70, 65, 140, 130, 145, 145, 160, 135, 140, 130, 135, 140, 250],
                                backgroundColor: "transparent",
                                borderColor: "#ED8438",
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <canvas ref={chartRef} id="lineChart"></canvas>
        </>
    );
}
