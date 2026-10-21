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

    // Trigger burgundy rose petals & champagne gold confetti
    try {
      const colors = ["#580B17", "#7D1A2A", "#D1BBA2", "#FFFDF9", "#C25E6E", "#E5C378"];
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 65,
          origin: { x: 0.2, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 65,
          origin: { x: 0.8, y: 0.65 },
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
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 select-none ${
        isOpen
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 backdrop-blur-2xl bg-[#140205]/92"
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 32%, rgba(105, 17, 31, 0.55) 0%, rgba(20, 2, 5, 0.96) 72%),
          radial-gradient(circle at 10% 90%, rgba(209, 187, 162, 0.1) 0%, transparent 45%),
          radial-gradient(circle at 90% 10%, rgba(138, 22, 40, 0.18) 0%, transparent 45%)
        `,
      }}
    >
      {/* Ambient floating golden dust & romantic glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-[#7D1A2A]/20 blur-[130px] pointer-events-none animate-pulse" />
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#D1BBA2]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#580B17]/30 blur-[100px] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-[540px] flex flex-col items-center">
        
        {/* ========================================================
            HEADER: ROYAL FRENCH MONOGRAM & SALUTATION
            ======================================================== */}
        <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
          
          {/* Royal Filigree Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#35050C]/90 border border-[#D1BBA2]/40 text-[#D1BBA2] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <span className="text-[10px] text-[#E5C378]">✦</span>
            <span className="text-[11px] font-serif uppercase tracking-[0.3em] font-medium">
              Đại Học Cần Thơ • Khóa 48
            </span>
            <span className="text-[10px] text-[#E5C378]">✦</span>
          </div>

          {/* Main Title with Gold Shimmer */}
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#E5C378] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Thư Mời Lễ Tốt Nghiệp
          </h2>

          {/* Personal Salutation Box */}
          <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm font-serif">
            <span className="text-[#D1BBA2]/90 italic">Trân trọng kính gửi đến:</span>
            <span className="font-bold text-[#FAF5EE] border-b border-[#E5C378]/60 pb-0.5 tracking-wider drop-shadow-sm">
              {guestName}
            </span>
          </div>
        </div>

        {/* ========================================================
            THE HAUTE COUTURE BURGUNDY VELVET ENVELOPE
            ======================================================== */}
        <div
          onClick={handleOpenEnvelope}
          className={`group relative w-full aspect-[1.5/1] max-w-[480px] sm:max-w-[510px] rounded-2xl cursor-pointer select-none transition-all duration-500 hover:scale-[1.02] shadow-[0_35px_80px_-15px_rgba(10,1,3,0.98),0_0_0_1px_rgba(209,187,162,0.4),0_15px_30px_rgba(0,0,0,0.7)] ${
            isOpening ? "scale-[1.02]" : ""
          }`}
          style={{ perspective: "1500px" }}
        >
          {/* ENVELOPE BASE / BACK WALL (Rich Velvet) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#4A0A14] via-[#3A060E] to-[#250308] overflow-hidden border border-[#D1BBA2]/40 shadow-inner">
            
            {/* Fine French Linen texture simulation */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D1BBA2_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Gold foil perimeter filigree line with corner stars */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-[#D1BBA2]/30 pointer-events-none">
              <span className="absolute top-1 left-1 text-[9px] text-[#E5C378]/70">✦</span>
              <span className="absolute top-1 right-1 text-[9px] text-[#E5C378]/70">✦</span>
              <span className="absolute bottom-1 left-1 text-[9px] text-[#E5C378]/70">✦</span>
              <span className="absolute bottom-1 right-1 text-[9px] text-[#E5C378]/70">✦</span>
            </div>

            {/* ========================================================
                INNER COTTON PAPER INVITATION CARD (Sliding Reveal)
                ======================================================== */}
            <div
              className={`absolute left-6 right-6 top-6 bottom-6 rounded-xl bg-[#FFFDF9] shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out flex flex-col justify-between p-5 sm:p-6 border border-[#D1BBA2] z-10 ${
                isOpening ? "-translate-y-28 sm:-translate-y-36" : "translate-y-0"
              }`}
            >
              {/* Inner Gold Gilded Double Border */}
              <div className="border border-[#D1BBA2]/60 rounded-lg h-full p-4 flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE]">
                <div className="absolute inset-1 rounded border border-[#D1BBA2]/30 pointer-events-none" />

                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#7D1A2A] font-serif font-bold">
                  Trường Đại Học Cần Thơ
                </span>

                <div className="w-8 h-px bg-[#D1BBA2] my-1.5" />

                <h3 className="text-2xl sm:text-3xl font-serif text-[#3B0A13] font-bold tracking-tight">
                  Lê Gia Yến
                </h3>

                <p className="text-xs sm:text-sm text-[#7D1A2A] italic font-serif mt-0.5">
                  Tân Cử Nhân • Tài chính - Ngân hàng
                </p>

                <div className="mt-3 px-3 py-1 rounded-full bg-[#580B17]/10 border border-[#580B17]/20 text-[11px] text-[#580B17] font-serif font-semibold">
                  11:00 AM • Thứ Hai, 02.11.2026
                </div>

                <p className="text-[10px] text-[#3B0A13]/70 font-serif mt-1.5">
                  Hội trường Rùa • Khu II Đại học Cần Thơ
                </p>
              </div>
            </div>

            {/* ========================================================
                ENVELOPE FOLDED POCKET (Left, Right, Bottom Panels)
                Completely seamless velvet — ZERO exposed gaps!
                ======================================================== */}
            <div className="absolute inset-0 pointer-events-none z-20">
              
              {/* Left Side Flap */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#4E0C15] to-[#3B060E]"
                style={{
                  clipPath: "polygon(0 0, 52% 50%, 0 100%)",
                }}
              >
                <div className="w-full h-full border-r border-[#E5C378]/20" />
              </div>

              {/* Right Side Flap */}
              <div
                className="absolute inset-0 bg-gradient-to-l from-[#4E0C15] to-[#3B060E]"
                style={{
                  clipPath: "polygon(100% 0, 48% 50%, 100% 100%)",
                }}
              >
                <div className="w-full h-full border-l border-[#E5C378]/20" />
              </div>

              {/* Bottom Triangular Flap (Overlaps Left & Right) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#2E040B] via-[#450912] to-[#540B16] shadow-[0_-5px_15px_rgba(0,0,0,0.3)]"
                style={{
                  clipPath: "polygon(0 100%, 50% 44%, 100% 100%)",
                }}
              >
                {/* Gold Piping along the bottom flap edge */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 100%, 50% 44%, 100% 100%, 100% 98.5%, 50% 45.5%, 0 98.5%)",
                    backgroundColor: "#E5C378",
                    opacity: 0.5,
                  }}
                />

                {/* Subtle Monogram Hot-Stamp on Bottom */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-serif uppercase tracking-[0.25em] text-[#D1BBA2]/50">
                  <span>✦</span>
                  <span>LGY • CAN THO UNIVERSITY</span>
                  <span>✦</span>
                </div>
              </div>

              {/* ========================================================
                  BURGUNDY SILK CHIFFON RIBBON (Horizontal Band)
                  ======================================================== */}
              <div className="absolute top-[50%] -translate-y-1/2 left-0 right-0 h-10 bg-gradient-to-r from-[#200307] via-[#520C17] to-[#200307] shadow-[0_4px_14px_rgba(0,0,0,0.6)] border-y border-[#D1BBA2]/30 flex items-center justify-between px-6 z-25">
                <div className="w-full h-px border-b border-dashed border-[#E5C378]/40" />
              </div>

              {/* Silk Ribbon Tails draping downward */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 z-26 pointer-events-none">
                {/* Left Ribbon Tail */}
                <div
                  className="absolute -left-6 top-3 w-5 h-20 bg-gradient-to-b from-[#520C17] to-[#200307] shadow-xl rounded-b-sm border-x border-[#D1BBA2]/25"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                    transform: "rotate(-12deg)",
                  }}
                />
                {/* Right Ribbon Tail */}
                <div
                  className="absolute left-1 top-3 w-5 h-22 bg-gradient-to-b from-[#520C17] to-[#200307] shadow-xl rounded-b-sm border-x border-[#D1BBA2]/25"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                    transform: "rotate(10deg)",
                  }}
                />
              </div>

            </div>
          </div>

          {/* ========================================================
              TOP ENVELOPE TRIANGLE FLAP (3D ROTATION)
              Overlaps downward seamlessly to 56% depth
              ======================================================== */}
          <div
            className={`absolute top-0 left-0 right-0 h-full origin-top transition-transform duration-700 ease-in-out z-30 pointer-events-none ${
              isOpening
                ? "[transform:rotateX(-165deg)]"
                : "[transform:rotateX(0deg)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The Top Triangle Flap */}
            <div
              className="w-full h-full bg-gradient-to-b from-[#6A0E1C] via-[#540B16] to-[#3E060F] shadow-[0_16px_35px_rgba(0,0,0,0.7)] relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 56%)",
              }}
            >
              {/* Fine gold foil border along flap triangle */}
              <div
                className="absolute inset-0 bg-[#E5C378]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 56%, 50% 54.5%, 98.5% 1%, 1.5% 1%)",
                  opacity: 0.8,
                }}
              />

              {/* Romantic French Scalloped Lace Trim along flap edge */}
              <svg
                className="absolute top-0 left-0 w-full h-[58%] text-[#FAF5EE]/50 drop-shadow-sm"
                viewBox="0 0 500 280"
                preserveAspectRatio="none"
              >
                {/* Left diagonal lace scalloped edge */}
                <path
                  d="M0,0 L250,280 L500,0"
                  fill="none"
                  stroke="#E5C378"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  opacity="0.85"
                />
              </svg>
            </div>
          </div>

          {/* ========================================================
              BOTANICAL SPRIG (White Calla Lily & Gold Leaves)
              ======================================================== */}
          <div
            className={`absolute left-[44%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-35 pointer-events-none transition-all duration-500 ${
              isOpening ? "opacity-0 -translate-y-12" : "opacity-100"
            }`}
          >
            <svg
              className="w-16 h-24 sm:w-20 sm:h-28 text-[#FFFDF9] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] -rotate-[28deg]"
              viewBox="0 0 100 140"
              fill="none"
            >
              <path
                d="M50 40 Q45 80 40 130"
                stroke="#4A5D43"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M45 85 Q30 75 25 65 Q35 70 45 80"
                fill="#C5A059"
                opacity="0.9"
              />
              <path
                d="M42 105 Q55 95 60 85 Q50 92 42 100"
                fill="#C5A059"
                opacity="0.9"
              />
              <path
                d="M50 15 C35 25 35 45 50 55 C65 45 65 25 50 15 Z"
                fill="#FFFDF9"
                stroke="#EADBCE"
                strokeWidth="1.5"
              />
              <path
                d="M50 20 C42 26 42 38 50 48"
                stroke="#E5C378"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ========================================================
              3D SCULPTED IVORY & GOLD FOIL ROYAL WAX SEAL
              ======================================================== */}
          <div
            className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
              isOpening
                ? "opacity-0 scale-75 -translate-y-16"
                : "opacity-100 scale-100 group-hover:scale-105"
            }`}
          >
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex items-center justify-center">
              
              {/* Realistic hot-wax melted droplet layers */}
              <div
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-[52%_48%_55%_45%_/_48%_53%_47%_52%] p-2 relative flex flex-col items-center justify-center border-2 border-[#E5C378]"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FAF5EE 45%, #EADBCE 85%, #CBB79F 100%)",
                  boxShadow: `
                    0 18px 40px rgba(15, 1, 4, 0.8),
                    0 6px 14px rgba(0, 0, 0, 0.5),
                    inset 0 3px 6px rgba(255, 255, 255, 0.98),
                    inset 0 -4px 8px rgba(138, 110, 85, 0.5)
                  `,
                }}
              >
                {/* Outer Delicate Gold Beaded Rings */}
                <div className="absolute inset-2 sm:inset-2.5 rounded-[50%] border border-dashed border-[#C5A059] opacity-85" />
                <div className="absolute inset-3 sm:inset-3.5 rounded-[50%] border border-[#E5C378]/70" />

                {/* Debossed Calla Lily & Monogram */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-[#580B17] mb-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M12 2C8 2 7 6 7 9c0 4 5 11 5 13s5-9 5-13c0-3-1-7-5-7z"
                      fill="#FFFDF9"
                    />
                    <path d="M12 5c-1 2-1 4 0 7" stroke="#C5A059" strokeWidth="1.8" />
                    <path d="M12 22c-2-3-5-6-5-10" />
                  </svg>

                  {/* Royal Calligraphy Monogram */}
                  <span
                    className="text-base sm:text-lg font-serif font-black tracking-[0.18em] text-[#580B17] mt-[-3px]"
                    style={{
                      textShadow: "0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  >
                    LGY
                  </span>

                  {/* Subtext CTU */}
                  <span className="text-[8px] sm:text-[9px] font-serif uppercase tracking-[0.25em] text-[#7D1A2A] font-bold mt-[-1px]">
                    CTU • 2026
                  </span>
                </div>

                {/* Pearlescent highlight reflection */}
                <div className="absolute top-2 left-3 w-6 h-3 rounded-full bg-white/70 blur-[1px] -rotate-45 pointer-events-none" />
              </div>

              {/* Pulsing subtle gold hint ring */}
              <div className="absolute -inset-1.5 rounded-full border border-[#E5C378]/60 animate-ping pointer-events-none opacity-40" />
            </div>
          </div>

          {/* ========================================================
              ACTION PROMPT BUTTON (Gilded Velvet Pill)
              ======================================================== */}
          <div className="absolute -bottom-16 sm:-bottom-18 left-1/2 -translate-x-1/2 whitespace-nowrap z-40">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#6A0E1C] via-[#540B16] to-[#35050C] text-[#FAF5EE] text-xs sm:text-sm font-serif font-semibold tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-[#E5C378]/70 hover:border-[#E5C378] group-hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5C378] animate-pulse" />
              <span>Chạm vào để mở thư mời</span>
              <Heart className="w-3.5 h-3.5 text-[#E5C378] fill-[#E5C378]/40" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
