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
        className={`relative rounded-full flex items-center justify-center border-2 border-[#C5A059] bg-[#9E1B32] shadow-[0_4px_16px_rgba(158,27,50,0.3)] ${className}`}
      >
        <span className="font-serif font-bold text-[#FAF5EE] tracking-widest text-sm select-none">
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
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(158,27,50,0.25)]"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0D0" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#F5E2B8" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <linearGradient id="rubyInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B22234" />
            <stop offset="100%" stopColor="#7D1124" />
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
          opacity="0.85"
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

        {/* Inner circle in deep graduation ruby */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="url(#rubyInner)"
          stroke="url(#goldGrad)"
          strokeWidth="1"
        />

        {/* Subtle decorative laurels */}
        <path
          d="M 22 50 C 22 36, 32 25, 45 23 C 35 29, 28 39, 28 50 C 28 61, 35 71, 45 77 C 32 75, 22 64, 22 50 Z"
          fill="url(#goldGrad)"
          opacity="0.35"
        />
        <path
          d="M 78 50 C 78 36, 68 25, 55 23 C 65 29, 72 39, 72 50 C 72 61, 65 71, 55 77 C 68 75, 78 64, 78 50 Z"
          fill="url(#goldGrad)"
          opacity="0.35"
        />

        {/* Central Monogram */}
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fill="#FFFDF9"
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="23"
          fontWeight="bold"
          letterSpacing="2"
        >
          PTH
        </text>

        {/* Graduation Year */}
        <text
          x="50"
          y="71"
          textAnchor="middle"
          fill="#F5E2B8"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="2"
          opacity="0.9"
        >
          2026
        </text>
      </svg>
    </div>
  );
}
