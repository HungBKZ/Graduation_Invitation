"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { MonogramSeal } from "./MonogramSeal";
import { recordEnvelopeOpenAction } from "@/app/actions";

interface EnvelopeExperienceProps {
  guestName: string;
  token: string;
  onOpenComplete: () => void;
  onStartAudio?: () => void;
}

export function EnvelopeExperience({
  guestName,
  token,
  onOpenComplete,
  onStartAudio,
}: EnvelopeExperienceProps) {
  const [stage, setStage] = useState<"sealed" | "opening" | "cardOut" | "revealed">("sealed");
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger opening animation sequence
  const handleOpen = async () => {
    if (isAnimating || stage !== "sealed") return;
    setIsAnimating(true);
    setStage("opening");

    if (onStartAudio) {
      try {
        onStartAudio();
      } catch {}
    }

    recordEnvelopeOpenAction(token).catch(() => {});

    // Flap opens
    setTimeout(() => {
      setStage("cardOut");
    }, 550);

    // Card slides out and transitions to invitation page
    setTimeout(() => {
      setStage("revealed");
      onOpenComplete();
    }, 1500);
  };

  const handleSkip = () => {
    recordEnvelopeOpenAction(token).catch(() => {});
    if (onStartAudio) {
      try {
        onStartAudio();
      } catch {}
    }
    setStage("revealed");
    onOpenComplete();
  };

  if (stage === "revealed") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6F0] px-4 overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FCEEE2] blur-3xl opacity-70" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F7E7CE] blur-3xl opacity-70" />
        </div>

        {/* Top Monogram and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center mb-6 text-center select-none z-10"
        >
          <MonogramSeal size={64} className="mb-3 drop-shadow-md" />
          <p className="text-xs tracking-[0.35em] text-[#C5A059] uppercase font-sans font-bold">
            Lễ Tốt Nghiệp · 25.10.2026
          </p>
          <h2 className="text-sm font-serif italic text-[#718096] mt-1">
            The Graduation of Phan Thành Hưng
          </h2>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/3] flex items-center justify-center z-10">
          {/* Card that slides out */}
          <motion.div
            animate={
              stage === "cardOut"
                ? { y: -160, scale: 1.05, opacity: 1 }
                : { y: 0, scale: 0.95, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[90%] h-[85%] rounded-2xl bg-[#FFFDF9] text-[#1E2530] p-6 shadow-2xl border-2 border-[#EADBCE] flex flex-col items-center justify-between pointer-events-none"
          >
            <div className="text-center">
              <span className="text-[10px] tracking-widest uppercase text-[#9E1B32] font-bold">
                Thư Mời Tham Dự Lễ Tốt Nghiệp
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7D1124] mt-1">
                Phan Thành Hưng
              </h3>
            </div>
            <div className="my-auto text-center">
              <p className="text-xs uppercase tracking-wider text-[#718096] font-semibold">
                Thương gửi
              </p>
              <p className="font-handwriting text-3xl font-bold text-[#9E1B32] mt-0.5">
                {guestName}
              </p>
            </div>
            <div className="text-[10px] text-[#C5A059] tracking-wider font-semibold uppercase">
              25.10.2026 · ĐẠI HỌC FPT CẦN THƠ
            </div>
          </motion.div>

          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-2xl bg-[#FFFDF9] border-2 border-[#EADBCE] shadow-[0_20px_50px_rgba(158,27,50,0.12)] overflow-hidden flex flex-col justify-end">
            {/* Top Flap (Triangular Folding) */}
            <motion.div
              style={{ transformOrigin: "top center" }}
              animate={
                stage !== "sealed"
                  ? { rotateX: 180, zIndex: 10 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-0 inset-x-0 h-[52%] bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE] border-b border-[#EADBCE] shadow-md [clip-path:polygon(0_0,100%_0,50%_100%)] flex items-start justify-center pt-2"
            >
              {/* Wax Seal in Ruby Red on flap tip */}
              <div className="relative -bottom-16 w-12 h-12 rounded-full bg-gradient-to-br from-[#C0394B] via-[#9E1B32] to-[#7D1124] p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#9E1B32] flex items-center justify-center border border-[#FAF5EE]/40">
                  <span className="font-serif text-xs font-bold text-[#FAF5EE]">
                    PTH
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Envelope Pocket Front */}
            <div className="absolute inset-0 z-25 pointer-events-none">
              <div className="absolute bottom-0 inset-x-0 h-[60%] bg-[#FAF5EE] [clip-path:polygon(0_100%,100%_100%,50%_35%)] border-t border-[#EADBCE]" />
              <div className="absolute inset-y-0 left-0 w-[50%] bg-[#F3EDE2]/60 [clip-path:polygon(0_0,0_100%,100%_50%)]" />
              <div className="absolute inset-y-0 right-0 w-[50%] bg-[#EEDBCE]/40 [clip-path:polygon(100%_0,100%_100%,0_50%)]" />
            </div>

            {/* Front Card Center Label */}
            <div className="relative z-30 flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-sans font-bold">
                Thư Mời Dành Cho
              </span>
              <h1 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#9E1B32] mt-1 tracking-wide">
                {guestName}
              </h1>
              <p className="text-xs text-[#718096] mt-1 italic font-serif">
                Một khoảnh khắc ý nghĩa chỉ trọn vẹn khi có bạn
              </p>
            </div>
          </div>
        </div>

        {/* Primary Open Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-3 z-30"
        >
          <button
            onClick={handleOpen}
            disabled={isAnimating}
            className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_6px_25px_rgba(158,27,50,0.3)] hover:shadow-[0_8px_30px_rgba(158,27,50,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#F3E5C8] transition-transform group-hover:rotate-12" />
            <span>Mở thư mời của bạn</span>
          </button>

          <button
            onClick={handleSkip}
            className="text-xs text-[#718096] hover:text-[#9E1B32] transition-colors py-1 px-3 underline-offset-4 hover:underline cursor-pointer"
          >
            Bỏ qua hiệu ứng mở thư
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
