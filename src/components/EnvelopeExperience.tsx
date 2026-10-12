"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Sparkles, ChevronDown } from "lucide-react";
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

    // Optional audio play on explicit user click
    if (onStartAudio) {
      try {
        onStartAudio();
      } catch {
        // Audio policy ignore
      }
    }

    // Record open in database asynchronously
    recordEnvelopeOpenAction(token).catch(() => {});

    // Phase 1: Flap opens (0ms -> 500ms)
    setTimeout(() => {
      setStage("cardOut");
    }, 550);

    // Phase 2: Card slides out (550ms -> 1300ms)
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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1930] px-4 overflow-hidden"
      >
        {/* Subtle decorative background stars / ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D6B675]/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#172A46]/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#D6B675_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
        </div>

        {/* Top Monogram and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center mb-6 text-center select-none"
        >
          <MonogramSeal size={64} className="mb-3" />
          <p className="text-xs tracking-[0.35em] text-[#D6B675] uppercase font-sans font-medium">
            Lễ Tốt Nghiệp · 25.10.2026
          </p>
          <h2 className="text-sm font-serif italic text-[#F6F1E8]/70 mt-1">
            The Graduation of Phan Thành Hưng
          </h2>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/3] flex items-center justify-center">
          {/* Card that slides out */}
          <motion.div
            animate={
              stage === "cardOut"
                ? { y: -160, scale: 1.05, opacity: 1 }
                : { y: 0, scale: 0.95, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[90%] h-[85%] rounded-lg bg-gradient-to-b from-[#F6F1E8] to-[#EAE3D2] text-[#0B1930] p-6 shadow-2xl border border-[#D6B675]/40 flex flex-col items-center justify-between pointer-events-none"
          >
            <div className="text-center">
              <span className="text-[10px] tracking-widest uppercase text-[#A68A4E] font-semibold">
                Official Graduation Invitation
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1930] mt-1">
                Phan Thành Hưng
              </h3>
            </div>
            <div className="my-auto text-center">
              <p className="text-xs uppercase tracking-wider text-[#172A46]/70">
                Kính gửi
              </p>
              <p className="font-serif text-lg font-bold text-[#A68A4E] mt-0.5">
                {guestName}
              </p>
            </div>
            <div className="text-[10px] text-[#172A46]/60 tracking-wider">
              25.10.2026 · FPT UNIVERSITY CAN THO
            </div>
          </motion.div>

          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#172A46] to-[#0E1F36] border border-[#D6B675]/35 envelope-shadow overflow-hidden flex flex-col justify-end">
            {/* Elegant Inner Lining Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#D6B675_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

            {/* Top Flap (Triangular Folding) */}
            <motion.div
              style={{ transformOrigin: "top center" }}
              animate={
                stage !== "sealed"
                  ? { rotateX: 180, zIndex: 10 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-0 inset-x-0 h-[52%] bg-gradient-to-b from-[#1C3354] to-[#142640] border-b border-[#D6B675]/40 shadow-md [clip-path:polygon(0_0,100%_0,50%_100%)] flex items-start justify-center pt-2"
            >
              {/* Wax Seal / Monogram button on flap tip */}
              <div className="relative -bottom-16 w-11 h-11 rounded-full bg-gradient-to-br from-[#E8D19F] via-[#D6B675] to-[#997938] p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#172A46] flex items-center justify-center border border-[#D6B675]/50">
                  <span className="font-serif text-xs font-bold text-[#D6B675]">
                    PTH
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Envelope Pocket Front (Triangles left, right, bottom) */}
            <div className="absolute inset-0 z-25 pointer-events-none">
              {/* Bottom flap triangle */}
              <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-[#11233B] to-[#172A46]/95 [clip-path:polygon(0_100%,100%_100%,50%_35%)] border-t border-[#D6B675]/25" />
              {/* Left flap triangle */}
              <div className="absolute inset-y-0 left-0 w-[50%] bg-[#152742]/70 [clip-path:polygon(0_0,0_100%,100%_50%)]" />
              {/* Right flap triangle */}
              <div className="absolute inset-y-0 right-0 w-[50%] bg-[#12233C]/70 [clip-path:polygon(100%_0,100%_100%,0_50%)]" />
            </div>

            {/* Front Card Center Label */}
            <div className="relative z-30 flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="text-[11px] tracking-[0.25em] text-[#D6B675] uppercase font-sans font-medium">
                An Invitation For
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F1E8] mt-1 gold-gradient-text tracking-wide">
                {guestName}
              </h1>
              <p className="text-xs text-[#9DAABD] mt-1.5 italic font-serif">
                A special moment deserves a special invitation
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
            className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(214,182,117,0.35)] hover:shadow-[0_6px_35px_rgba(214,182,117,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#0B1930] transition-transform group-hover:rotate-12" />
            <span>Mở thư mời của bạn</span>
          </button>

          <button
            onClick={handleSkip}
            className="text-xs text-[#9DAABD]/70 hover:text-[#D6B675] transition-colors py-1 px-3 underline-offset-4 hover:underline cursor-pointer"
          >
            Bỏ qua hiệu ứng mở thư
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
