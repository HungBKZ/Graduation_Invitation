"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GIA_YEN_MEMORY_PHOTOS, GIA_YEN_MILESTONE_PHOTOS } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Heart } from "lucide-react";

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
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#540F1B]/10 text-[#540F1B] border border-[#540F1B]/20 text-xs font-serif uppercase tracking-[0.2em]">
          <Camera className="w-3.5 h-3.5 text-[#7D1A2A]" />
          Scrapbook Memories
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#3B0A13] font-medium tracking-tight">
          Hành Trình Thanh Xuân Của Én
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#7D1A2A] max-w-lg mx-auto">
          Mỗi bức ảnh là một mảnh ghép kỷ niệm trong suốt 4 năm đại học dưới mái trường Đại học Cần Thơ thân yêu.
        </p>
      </div>

      {/* Natural Aspect-Ratio Masonry Grid (columns-1 on mobile, columns-2 on tablet, columns-3 on desktop) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {photos.map((url, idx) => {
          const rotationClass = ROTATIONS[idx % ROTATIONS.length];
          const title = getMilestoneTitle(url, idx);

          return (
            <div
              key={url + idx}
              className="break-inside-avoid mb-6"
            >
              <div
                onClick={() => handleOpenLightbox(idx)}
                className={`group relative rounded-2xl bg-[#FFFDF9] p-3.5 pb-4 border border-[#D1BBA2]/60 shadow-[0_8px_20px_rgba(84,15,27,0.06)] hover:shadow-[0_16px_32px_rgba(84,15,27,0.16)] transition-all duration-300 cursor-pointer select-none ${rotationClass} hover:rotate-0 hover:scale-[1.02]`}
              >
                {/* Vintage Washi Tape Ornament at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#D1BBA2]/50 border-x border-[#FAF5EE] backdrop-blur-[1px] rotate-[-2deg] rounded-sm shadow-xs z-10 opacity-75 group-hover:opacity-100 transition-opacity" />

                {/* Natural Image Container - native proportions (w-full h-auto) */}
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
