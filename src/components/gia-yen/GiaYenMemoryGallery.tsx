"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GIA_YEN_MEMORY_PHOTOS, GIA_YEN_MILESTONE_PHOTOS } from "@/lib/constants";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ZoomIn,
  Camera,
  Heart,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface GiaYenMemoryGalleryProps {
  photos?: string[];
}

const TITLE_MAP = new Map<string, string>(
  GIA_YEN_MILESTONE_PHOTOS.map((item) => [item.url, item.title])
);

function getMilestoneTitle(url: string, index: number): string {
  if (TITLE_MAP.has(url)) {
    return TITLE_MAP.get(url)!;
  }
  // Match Cloudinary filename
  const filename = url.split("/").pop()?.split(".")[0];
  if (filename) {
    const matched = GIA_YEN_MILESTONE_PHOTOS.find((item) =>
      item.url.includes(filename)
    );
    if (matched) return matched.title;
  }
  return GIA_YEN_MILESTONE_PHOTOS[index]?.title || `Kỷ niệm ${index + 1}`;
}

const ROTATIONS = [
  "-rotate-1",
  "rotate-1.5",
  "-rotate-0.5",
  "rotate-1",
  "-rotate-1.5",
  "rotate-0.5",
  "-rotate-1",
  "rotate-1.5",
  "-rotate-0.5",
];

export function GiaYenMemoryGallery({
  photos = GIA_YEN_MEMORY_PHOTOS,
}: GiaYenMemoryGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIdx(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
  }, [selectedIdx, photos.length]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
  }, [selectedIdx, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, handleNext, handlePrev]);

  return (
    <section
      id="scrapbook-section"
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-10"
    >
      {/* French Romantic Detail Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE1] p-6 sm:p-10 border border-[#D1BBA2] shadow-[0_15px_40px_rgba(84,15,27,0.08)] overflow-hidden text-center transition-all duration-500">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7D1A2A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E5C378]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#540F1B]/10 text-[#540F1B] border border-[#540F1B]/25 text-xs font-serif uppercase tracking-[0.25em]">
          <Camera className="w-3.5 h-3.5 text-[#7D1A2A]" />
          Scrapbook Memories • 12 Cột Mốc
        </div>

        {/* Section Title */}
        <h2 className="mt-4 text-2xl sm:text-4xl font-serif text-[#3B0A13] font-medium tracking-tight">
          Hành Trình Thanh Xuân Của Én
        </h2>

        <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#7D1A2A] max-w-lg mx-auto leading-relaxed">
          Mỗi bức ảnh là một mảnh ghép kỷ niệm trong suốt 4 năm đại học dưới mái trường Đại học Cần Thơ thân yêu (2022 - 2026).
        </p>

        {/* Fan-Out Sneak Peek Polaroids (Visible when collapsed) */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="relative my-7 py-3 flex items-center justify-center cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            aria-label="Mở xem 12 kỷ niệm thanh xuân của Én"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsExpanded(true);
              }
            }}
          >
            <div className="relative w-64 sm:w-72 h-44 sm:h-52 flex items-center justify-center">
              {/* Card 1: Left (Trúng tuyển) */}
              <div className="absolute left-4 sm:left-6 w-28 sm:w-34 rounded-xl bg-[#FFFDF9] p-2 pb-3 border border-[#D1BBA2] shadow-md -rotate-12 group-hover:-rotate-16 group-hover:-translate-x-3 transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF5EE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photos[0] || GIA_YEN_MEMORY_PHOTOS[0]}
                    alt="Trúng tuyển"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-1.5 text-[10px] sm:text-[11px] font-serif font-semibold text-[#540F1B] truncate text-center">
                  Trúng tuyển
                </p>
              </div>

              {/* Card 3: Right (Khóa luận) */}
              <div className="absolute right-4 sm:right-6 w-28 sm:w-34 rounded-xl bg-[#FFFDF9] p-2 pb-3 border border-[#D1BBA2] shadow-md rotate-12 group-hover:rotate-16 group-hover:translate-x-3 transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF5EE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photos[10] || photos[photos.length - 2] || GIA_YEN_MEMORY_PHOTOS[10]}
                    alt="Khóa luận"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-1.5 text-[10px] sm:text-[11px] font-serif font-semibold text-[#540F1B] truncate text-center">
                  Khóa luận
                </p>
              </div>

              {/* Card 2: Center Highlight (Mùa hè xanh) */}
              <div className="relative z-10 w-32 sm:w-38 rounded-xl bg-[#FFFDF9] p-2.5 pb-3.5 border-2 border-[#D1BBA2] shadow-xl group-hover:scale-105 transition-all duration-300">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[#D1BBA2]/70 border-x border-[#FAF5EE] backdrop-blur-[1px] rotate-[-2deg] rounded-sm" />
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF5EE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photos[7] || photos[3] || GIA_YEN_MEMORY_PHOTOS[7]}
                    alt="Mùa hè xanh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[11px] sm:text-xs font-serif font-bold text-[#3B0A13] truncate">
                    Mùa hè xanh
                  </p>
                  <span className="text-[9px] sm:text-[10px] font-serif text-[#7D1A2A] italic">
                    12 khoảnh khắc • Chạm để mở
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive CTA Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#540F1B] to-[#7D1A2A] hover:from-[#3B0A13] hover:to-[#540F1B] text-[#FAF5EE] text-xs sm:text-sm font-serif font-semibold shadow-[0_8px_25px_rgba(84,15,27,0.25)] hover:shadow-[0_12px_32px_rgba(84,15,27,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#E5C378]" />
            <span>
              {isExpanded
                ? "Thu gọn nhật ký thanh xuân"
                : "Nhấn vào đây để xem thêm về thanh xuân của Én"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => handleOpenLightbox(0)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF5EE] hover:bg-[#F3E5C8]/60 border border-[#D1BBA2] text-[#540F1B] text-xs sm:text-sm font-serif font-semibold transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#7D1A2A]" />
            <span>Trình chiếu 12 ảnh</span>
          </button>
        </div>

        {/* Expandable Masonry Photo Grid */}
        {isExpanded && (
          <div className="mt-8 pt-8 border-t border-[#D1BBA2]/50 animate-in fade-in duration-500 text-left">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {photos.map((url, idx) => {
                const rotationClass = ROTATIONS[idx % ROTATIONS.length];
                const title = getMilestoneTitle(url, idx);

                return (
                  <div key={url + idx} className="break-inside-avoid mb-6">
                    <div
                      onClick={() => handleOpenLightbox(idx)}
                      className={`group relative rounded-2xl bg-[#FFFDF9] p-3.5 pb-4 border border-[#D1BBA2]/60 shadow-[0_8px_20px_rgba(84,15,27,0.06)] hover:shadow-[0_16px_32px_rgba(84,15,27,0.16)] transition-all duration-300 cursor-pointer select-none ${rotationClass} hover:rotate-0 hover:scale-[1.02]`}
                    >
                      {/* Vintage Washi Tape Ornament at top */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#D1BBA2]/50 border-x border-[#FAF5EE] backdrop-blur-[1px] rotate-[-2deg] rounded-sm shadow-xs z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

                      {/* Natural Image Container */}
                      <div className="relative rounded-xl overflow-hidden bg-[#FAF5EE]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={title}
                          loading="lazy"
                          className="w-full h-auto block object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
                        />

                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-[#3B0A13]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EE]/95 text-[#540F1B] font-serif text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <ZoomIn className="w-3.5 h-3.5 text-[#7D1A2A]" />
                            Xem trọn vẹn
                          </span>
                        </div>
                      </div>

                      {/* Milestone Title & Number */}
                      <div className="mt-3 px-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#540F1B]/10 text-[#7D1A2A] text-[10px] font-serif font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-sm font-serif font-semibold text-[#3B0A13] tracking-wide truncate group-hover:text-[#7D1A2A] transition-colors">
                            {title}
                          </p>
                        </div>
                        <Heart className="w-3.5 h-3.5 shrink-0 text-[#D1BBA2] group-hover:text-[#7D1A2A] group-hover:fill-[#7D1A2A] transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Collapse Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  document.getElementById("scrapbook-section")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF5EE] hover:bg-[#F3E5C8]/60 border border-[#D1BBA2] text-[#540F1B] text-xs sm:text-sm font-serif font-semibold shadow-xs transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                <span>Thu gọn nhật ký thanh xuân</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution Full-Screen Lightbox */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#24050B]/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-[#FAF5EE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 font-serif text-xs tracking-wider">
              <span>Cột mốc của Én</span>
              <span className="text-[#D1BBA2]">•</span>
              <span className="text-[#FAF5EE] font-semibold">
                {getMilestoneTitle(photos[selectedIdx], selectedIdx)}
              </span>
              <span className="text-[#D1BBA2]">•</span>
              <span className="text-[#D1BBA2]">
                {selectedIdx + 1} / {photos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white flex items-center justify-center z-50 transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white flex items-center justify-center z-50 transition-colors"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Displayed Image (Preserving 100% natural aspect ratio) */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[selectedIdx]}
              alt={getMilestoneTitle(photos[selectedIdx], selectedIdx)}
              className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-[#D1BBA2]/40"
            />
            <div className="mt-4 text-center">
              <p className="font-serif text-lg sm:text-xl font-semibold text-[#FAF5EE] tracking-wide">
                {getMilestoneTitle(photos[selectedIdx], selectedIdx)}
              </p>
              <p className="mt-1 font-serif italic text-xs sm:text-sm text-[#D1BBA2]">
                Hành trình thanh xuân • Đại học Cần Thơ (2022 - 2026)
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
