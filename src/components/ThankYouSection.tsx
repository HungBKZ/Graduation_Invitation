"use client";

import React from "react";
import { motion } from "motion/react";
import { Download, MapPin, Volume2, VolumeX, Heart, Sparkles } from "lucide-react";
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
    <footer className="relative w-full py-12 md:py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#EADBCE] bg-[#FAF5EE]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <MonogramSeal size={68} className="mb-4 drop-shadow-md" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EADBCE] text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#9E1B32]" />
          <span>Lời Tri Ân Từ Hưng</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#7D1124] mt-1 mb-4 leading-snug">
          Cảm ơn bạn đã là một phần thanh xuân của Hưng
        </h2>

        <div className="max-w-lg mx-auto text-sm sm:text-base text-[#4A5568] font-normal leading-relaxed mb-6 space-y-3">
          {(settings.thank_you_message || "")
            .replace(/\\r\\n/g, "\n")
            .replace(/\\n/g, "\n")
            .split(/\n\s*\n/)
            .map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph.split("\n").map((line, lIdx, arr) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
        </div>

        <div className="flex flex-col items-center mb-8">
          <p className="text-xs tracking-widest text-[#718096] uppercase font-sans">
            Thương mến,
          </p>
          <p className="font-serif text-2xl font-bold text-[#9E1B32] mt-1">
            {settings.graduate_name}
          </p>
          <p className="text-xs text-[#C5A059] font-sans font-medium mt-0.5">
            Software Engineering K18 · FPT University Can Tho
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-3 px-5 rounded-full bg-white border border-[#EADBCE] shadow-sm">
          <button
            onClick={onDownloadClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9E1B32] text-white hover:bg-[#7D1124] transition-all font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Lưu ảnh thiệp mời</span>
          </button>

          {settings.maps_url && (
            <a
              href={settings.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EE] border border-[#EADBCE] text-[#7D1124] hover:bg-[#F3E7D5] transition-all font-sans text-xs font-semibold tracking-wider uppercase"
            >
              <MapPin className="w-3.5 h-3.5 text-[#9E1B32]" />
              <span>Chỉ đường</span>
            </a>
          )}

          {hasAudio && (
            <button
              onClick={onToggleAudio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EE] border border-[#EADBCE] text-[#7D1124] hover:bg-[#F3E7D5] transition-all font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#9E1B32]" />
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

        <p className="mt-8 text-[11px] text-[#A0AEC0] tracking-wider font-sans">
          © 2026 The Graduation of {settings.graduate_name} · Trường Đại Học FPT Phân Hiệu Cần Thơ
        </p>
      </motion.div>
    </footer>
  );
}
