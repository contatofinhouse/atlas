"use client";

import React, { useId } from "react";

export function LukaIcon({
    spin = false,
    variant = "emerald",
    size = 24,
    style,
}: {
    spin?: boolean;
    variant?: "emerald" | "gray";
    size?: number;
    style?: React.CSSProperties;
}) {
    const id = useId().replace(/:/g, "");

    const colors = {
        emerald: {
            outer: "#10b981",
            inner: "#059669",
            core: "#047857"
        },
        gray: {
            outer: "#475569", // Slate 600
            inner: "#64748b", // Slate 500
            core: "#334155"  // Slate 700
        }
    };

    const activeColors = colors[variant];

    // Velocidade Ajustada: 2.72s por volta. 
    // Em 15 segundos ele faz 5.5 voltas e para.
    const outerAnim = spin ? `luka-spin-cw 2.72s linear 5.5 forwards` : "none";
    const innerAnim = spin ? `luka-spin-ccw 2s linear 7.5 forwards` : "none";

    return (
        <span
            className="shrink-0 inline-block"
            style={{
                width: size,
                height: size,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width={size}
                height={size}
            >
                <style>
                    {`
                        @keyframes luka-spin-cw {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes luka-spin-ccw {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(-360deg); }
                        }
                    `}
                </style>
                <defs>
                    <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={activeColors.outer} />
                        <stop offset="100%" stopColor={activeColors.inner} />
                    </linearGradient>
                </defs>
                
                <g transform="translate(50, 50)">
                    {/* Anel Externo */}
                    <path 
                        d="M -35,0 A 35,35 0 0 1 35,0" 
                        fill="none" 
                        stroke={activeColors.outer} 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        style={{ 
                            animation: outerAnim,
                            transformOrigin: "0 0"
                        }}
                    />
                    {/* Anel Interno */}
                    <path 
                        d="M -22,0 A 22,22 0 0 0 22,0" 
                        fill="none" 
                        stroke={activeColors.inner} 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        strokeOpacity="0.7"
                        style={{ 
                            animation: innerAnim,
                            transformOrigin: "0 0"
                        }}
                    />
                    {/* Núcleo Central */}
                    <circle 
                        cx="0" cy="0" r="10" 
                        fill={activeColors.core}
                        style={{
                            animation: spin ? "pulse 2s ease-in-out infinite" : "none"
                        }}
                    />
                </g>
            </svg>
        </span>
    );
}
