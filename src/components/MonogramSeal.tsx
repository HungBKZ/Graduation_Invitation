"use client";

import React from "react";

interface MonogramSealProps {
  size?: number;
  className?: string;
  variant?: "seal" | "flat" | "badge";
}

export function MonogramSeal({
  size = 72,
  className = "",
  variant = "seal",
}: MonogramSealProps) {
  if (variant === "badge") {
    return (
      <div
        style={{ width: size, height: size }}
        className={`relative rounded-full flex items-center justify-center border border-[#D6B675]/50 bg-[#172A46]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(214,182,117,0.2)] ${className}`}
      >
        <span className="font-serif font-bold text-[#D6B675] tracking-widest text-sm select-none">
          PTH
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center select-none ${className}`}
    >
      {/* Outer Golden Ring */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0D0" />
            <stop offset="35%" stopColor="#D6B675" />
            <stop offset="70%" stopColor="#F5E2B8" />
            <stop offset="100%" stopColor="#A68A4E" />
          </linearGradient>
          <linearGradient id="navyInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E385C" />
            <stop offset="100%" stopColor="#0B1930" />
          </linearGradient>
        </defs>

        {/* Outer beaded ring */}
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeDasharray="2,3"
          opacity="0.8"
        />

        {/* Solid gold ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="2"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="url(#navyInner)"
          stroke="url(#goldGrad)"
          strokeWidth="1"
        />

        {/* Subtle decorative laurels */}
        <path
          d="M 22 50 C 22 36, 32 25, 45 23 C 35 29, 28 39, 28 50 C 28 61, 35 71, 45 77 C 32 75, 22 64, 22 50 Z"
          fill="url(#goldGrad)"
          opacity="0.3"
        />
        <path
          d="M 78 50 C 78 36, 68 25, 55 23 C 65 29, 72 39, 72 50 C 72 61, 65 71, 55 77 C 68 75, 78 64, 78 50 Z"
          fill="url(#goldGrad)"
          opacity="0.3"
        />

        {/* Central Monogram */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="url(#goldGrad)"
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="2"
        >
          PTH
        </text>

        {/* Graduation Year */}
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fill="#D6B675"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="8"
          letterSpacing="2"
          opacity="0.85"
        >
          2026
        </text>
      </svg>
    </div>
  );
}
