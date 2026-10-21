"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { recordEnvelopeOpenAction } from "@/app/actions";
import { Sparkles, Heart } from "lucide-react";

interface GiaYenEnvelopeExperienceProps {
  guestName: string;
  token: string;
  onOpenComplete: () => void;
  onStartAudio: () => void;
}

export function GiaYenEnvelopeExperience({
  guestName,
  token,
  onOpenComplete,
  onStartAudio,
}: GiaYenEnvelopeExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = async () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Audio cue callback
    onStartAudio();

    // Trigger burgundy rose & champagne gold confetti
    try {
      const colors = ["#540F1B", "#7D1A2A", "#D1BBA2", "#FAF5EE", "#C25E6E"];
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0.2, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 0.8, y: 0.7 },
          colors,
        });
      }, 250);
    } catch {
      // ignore confetti errors if blocked
    }

    // Record open state to server
    try {
      await recordEnvelopeOpenAction(token);
    } catch {
      // silently ignore
    }

    // Smooth transition
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpenComplete();
      }, 700);
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ${
        isOpen
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 backdrop-blur-md bg-[#24050B]/85"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#7D1A2A]/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#D1BBA2]/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md sm:max-w-lg flex flex-col items-center">
        {/* Subtle romantic label above envelope */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-serif uppercase tracking-[0.25em] text-[#D1BBA2] bg-[#3B0A13]/80 border border-[#D1BBA2]/30 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D1BBA2]" />
            A Special Invitation From Én
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif italic text-[#FAF5EE] tracking-wide drop-shadow-sm">
            Thư Mời Tốt Nghiệp
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#FAF5EE]/80 font-light">
            Trân trọng gửi đến <span className="font-semibold text-[#D1BBA2]">{guestName}</span>
          </p>
        </div>

        {/* The Burgundy Envelope Body */}
        <div
          onClick={handleOpenEnvelope}
          className={`group relative w-full aspect-[4/3] max-w-[420px] rounded-2xl cursor-pointer select-none transition-transform duration-500 hover:scale-[1.02] shadow-[0_25px_60px_-15px_rgba(36,5,11,0.9),0_0_0_1px_rgba(209,187,162,0.25)] ${
            isOpening ? "scale-[1.02]" : ""
          }`}
          style={{ perspective: "1200px" }}
        >
          {/* Envelope Pocket Base */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#6B1724] to-[#420A14] overflow-hidden border border-[#D1BBA2]/30">
            {/* Fine grain noise and linen texture simulation */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D1BBA2_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Inner envelope lining (Cream stationery peek) */}
            <div
              className={`absolute left-4 right-4 top-4 bottom-4 rounded-xl bg-[#FAF5EE] p-5 shadow-inner transition-transform duration-700 ease-out flex flex-col justify-between ${
                isOpening ? "-translate-y-24" : "translate-y-0"
              }`}
            >
              <div className="border border-[#D1BBA2]/40 rounded-lg h-full p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#7D1A2A] font-semibold">
                  Trường Đại Học Cần Thơ
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#3B0A13] mt-1 font-bold">
                  Lê Gia Yến
                </h3>
                <p className="text-xs text-[#540F1B]/80 italic mt-0.5 font-serif">
                  Tài chính - Ngân hàng
                </p>
                <div className="w-12 h-px bg-[#D1BBA2] my-2" />
                <p className="text-[11px] text-[#420A14]/70">
                  02 Tháng 11 Năm 2026 • 11:00 AM
                </p>
              </div>
            </div>

            {/* Envelope pocket fold diagonals */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Bottom fold triangle */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#3B0A13] to-[#540F1B] [clip-path:polygon(0_100%,50%_25%,100%_100%)] opacity-95 border-t border-[#D1BBA2]/20" />
              {/* Left fold triangle */}
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#4A0D17] to-[#540F1B] [clip-path:polygon(0_0,100%_50%,0_100%)] opacity-90" />
              {/* Right fold triangle */}
              <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#4A0D17] to-[#540F1B] [clip-path:polygon(100%_0,0_50%,100%_100%)] opacity-90" />
            </div>
          </div>

          {/* Envelope Top Flap with 3D Rotate */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 ease-in-out z-20 pointer-events-none ${
              isOpening
                ? "[transform:rotateX(-145deg)]"
                : "[transform:rotateX(0deg)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The Top Triangle Flap */}
            <div className="w-full h-full bg-gradient-to-b from-[#7A1929] to-[#540F1B] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md border-t border-[#D1BBA2]/40 relative">
              {/* Flap edge scalloped lace accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-[#FAF5EE]/20 blur-[0.5px] rounded-full" />
            </div>
          </div>

          {/* Oval Ivory Wax Seal with Calla Lily & "LGY" */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isOpening
                ? "opacity-0 scale-75 -translate-y-16"
                : "opacity-100 scale-100 group-hover:scale-105"
            }`}
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Wax Seal Body */}
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-[50%] bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EE] to-[#E8DFD5] shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(180,160,140,0.5)] border-2 border-[#D1BBA2]/70 flex flex-col items-center justify-center relative p-2">
                {/* Outer delicate ring */}
                <div className="absolute inset-1.5 rounded-[50%] border border-[#D1BBA2]/60" />
                
                {/* Calla Lily SVG motif */}
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#7D1A2A] mb-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8 2 7 6 7 9c0 4 5 11 5 13s5-9 5-13c0-3-1-7-5-7z" fill="#FAF5EE" />
                  <path d="M12 6c-1 2-1 4 0 6" stroke="#C25E6E" />
                  <path d="M12 22c-2-3-5-6-5-10" />
                </svg>

                {/* Monogram Initials */}
                <span className="text-xs sm:text-sm font-serif font-bold text-[#540F1B] tracking-widest mt-[-2px]">
                  LGY
                </span>
                <span className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#8C2434] opacity-80">
                  CTU • 2026
                </span>
              </div>

              {/* Pulsing subtle hint ring */}
              <div className="absolute -inset-1 rounded-full border border-[#D1BBA2]/40 animate-ping pointer-events-none opacity-40" />
            </div>
          </div>

          {/* Interactive Tap Prompt Badge at the bottom */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#6B1724] to-[#420A14] text-[#FAF5EE] text-xs sm:text-sm font-serif tracking-wider shadow-lg border border-[#D1BBA2]/40 group-hover:border-[#D1BBA2] transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-[#E8DFD5] fill-[#E8DFD5]/40 animate-pulse" />
              <span>Chạm vào để mở thư mời</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
