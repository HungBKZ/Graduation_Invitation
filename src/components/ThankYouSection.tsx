"use client";

import React from "react";
import { motion } from "motion/react";
import { Download, MapPin, Volume2, VolumeX, Heart } from "lucide-react";
import { MonogramSeal } from "./MonogramSeal";
import { EventSettings } from "@/types";

interface ThankYouSectionProps {
  settings: EventSettings;
  onDownloadClick: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  hasAudio: boolean;
}

export function ThankYouSection({
  settings,
  onDownloadClick,
  isPlayingAudio,
  onToggleAudio,
  hasAudio,
}: ThankYouSectionProps) {
  return (
    <footer className="relative w-full py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#D6B675]/15 bg-gradient-to-b from-transparent via-[#081324]/80 to-[#060D1A]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <MonogramSeal size={68} className="mb-6 drop-shadow-xl" />

        <span className="text-[11px] tracking-[0.35em] text-[#D6B675] uppercase font-sans font-semibold">
          Lời Cảm Ơn
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F6F1E8] mt-2 mb-4 leading-snug">
          Thank you for being part of my journey
        </h2>

        <div className="max-w-lg mx-auto text-sm sm:text-base text-[#F6F1E8]/80 font-serif italic leading-relaxed whitespace-pre-line mb-6">
          {settings.thank_you_message}
        </div>

        <div className="flex flex-col items-center mb-10">
          <p className="text-xs tracking-widest text-[#9DAABD] uppercase font-sans">
            With gratitude,
          </p>
          <p className="font-serif text-2xl font-bold text-[#D6B675] mt-1">
            {settings.graduate_name}
          </p>
        </div>

        {/* External Quick Action Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 py-4 px-6 rounded-2xl bg-[#172A46]/70 border border-[#D6B675]/30 backdrop-blur-md shadow-2xl">
          <button
            onClick={onDownloadClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D6B675] text-[#0B1930] hover:bg-[#F3E5C8] transition-all font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải ảnh thư mời</span>
          </button>

          {settings.maps_url && (
            <a
              href={settings.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F1E33] border border-[#D6B675]/40 text-[#D6B675] hover:bg-[#1C3354] transition-all font-sans text-xs font-medium tracking-wider uppercase"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Xem địa điểm</span>
            </a>
          )}

          {hasAudio && (
            <button
              onClick={onToggleAudio}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F1E33] border border-[#D6B675]/40 text-[#D6B675] hover:bg-[#1C3354] transition-all font-sans text-xs font-medium tracking-wider uppercase cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#D6B675]" />
                  <span>Tắt nhạc</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Bật nhạc</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="mt-8 text-[11px] text-[#9DAABD]/60 tracking-wider font-sans">
          © 2026 The Graduation of {settings.graduate_name} · FPT University Can Tho
        </p>
      </motion.div>
    </footer>
  );
}
