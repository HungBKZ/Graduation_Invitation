"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Sparkles, X, Heart, Star, Camera, GraduationCap } from "lucide-react";
import { EventSettings } from "@/types";

interface GraduationHeroProps {
  settings: EventSettings;
  guestName?: string;
}

const MEMORY_LABELS = [
  "Hội bạn thân K18",
  "Chuyến đi thanh xuân",
  "Những ngày bên nhau",
  "Giảng đường FPTU",
  "Nụ cười rạng rỡ",
  "Hành trình trưởng thành",
];

export function GraduationHero({ settings, guestName }: GraduationHeroProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const memoryPhotos =
    settings.memory_photo_urls && settings.memory_photo_urls.length > 0
      ? settings.memory_photo_urls
      : [];

  const graduatePhoto =
    settings.graduate_photo_url ||
    "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png";

  return (
    <section className="relative w-full py-6 md:py-14 px-3 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Bright, radiant ambient sunny glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#FFF5EB] via-[#FFF9F2] to-transparent rounded-full blur-[140px] opacity-80" />
      </div>

      {/* Main Invitation Poster Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[560px] sm:max-w-[660px] md:max-w-[760px] lg:max-w-[820px] bg-[#FFFFFF] rounded-[32px] shadow-[0_20px_50px_rgba(158,27,50,0.08),0_2px_12px_rgba(0,0,0,0.03)] border border-[#EADBCE] overflow-hidden select-none"
      >
        {/* Top Decorative Header */}
        <div className="relative pt-8 pb-4 px-6 text-center z-10 bg-gradient-to-b from-[#FAF5EE]/80 to-transparent">
          {/* Hand-drawn Flower & Star Doodles (Top Corners) */}
          <div className="absolute top-5 left-6 text-[#9E1B32]/80">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 5 C22 12, 28 18, 35 20 C28 22, 22 28, 20 35 C18 28, 12 22, 5 20 C12 18, 18 12, 20 5 Z" />
              <circle cx="20" cy="20" r="2.5" fill="#C5A059" stroke="none" />
            </svg>
          </div>

          <div className="absolute top-5 right-6 text-[#9E1B32]/80">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 6 L23 15 L32 15 L25 21 L28 30 L20 24 L12 30 L15 21 L8 15 L17 15 Z" />
            </svg>
          </div>

          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#718096] font-semibold">
            Thư Mời Tham Dự
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#9E1B32] mt-1 uppercase drop-shadow-sm leading-tight">
            Lễ Tốt Nghiệp
          </h1>

          <p className="text-xs sm:text-sm font-serif italic text-[#C5A059] font-medium tracking-wide">
            Graduation Ceremony 2026 · Trường Đại Học FPT Phân Hiệu Cần Thơ
          </p>
        </div>

        {/* SECTION A: Graduate Cutout Spotlight (Side-by-side on desktop/tablet, stacked cleanly on mobile) */}
        <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#FAF5EE]/60 to-[#FFFFFF] border-b border-[#EADBCE]/80">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-4">
            
            {/* Cutout Graduate Photo with Sticker Outline */}
            <div className="relative w-full sm:w-[48%] h-[360px] sm:h-[420px] md:h-[460px] flex items-end justify-center overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#F5E6D3_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-40 rounded-2xl" />
              <div className="relative w-full h-full transform sm:scale-105 origin-bottom">
                <Image
                  src={graduatePhoto}
                  alt={settings.graduate_name}
                  fill
                  sizes="(max-width: 640px) 95vw, 450px"
                  className="object-contain object-bottom sticker-cutout drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Soft bottom edge blend */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FFFFFF] to-transparent pointer-events-none" />
            </div>

            {/* Right Information Cards (Guest name tag + Event Schedule) */}
            <div className="w-full sm:w-[50%] flex flex-col gap-4">
              
              {/* Pinned Personalized Name Tag */}
              <motion.div
                initial={{ rotate: -2, opacity: 0, scale: 0.95 }}
                animate={{ rotate: -1, opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative bg-[#FFFDF9] border border-[#EADBCE] rounded-2xl p-5 shadow-[0_8px_25px_rgba(158,27,50,0.06)]"
              >
                {/* Red Star Pin */}
                <div className="absolute -top-3.5 left-5 w-7 h-7 flex items-center justify-center text-[#9E1B32] drop-shadow-sm">
                  <Star className="w-6 h-6 fill-[#9E1B32] stroke-[#FFFDF9] stroke-2" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-sans text-[#7A1022] font-bold tracking-wider uppercase mt-1">
                  <span>Thương mời</span>
                  <span className="text-[10px] text-[#C5A059] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Khách quý
                  </span>
                </div>

                <h2 className="font-handwriting text-3xl sm:text-4xl text-[#9E1B32] font-bold tracking-wide mt-1 leading-tight">
                  {guestName || "Bạn thân mến"}
                </h2>

                <p className="text-xs font-sans text-[#718096] italic mt-1 leading-relaxed">
                  Đến chung vui và lưu lại những khoảnh khắc đáng nhớ trong ngày tốt nghiệp của Hưng ✨
                </p>
              </motion.div>

              {/* Ceremony Time & Venue Badge */}
              <div className="bg-[#FAF5EE] border border-[#EADBCE] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
                <div className="flex items-center justify-between gap-2 border-b border-[#EADBCE] pb-2 mb-2">
                  <div className="text-xs font-sans font-bold text-[#9E1B32] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#9E1B32]" />
                    <span>25 / 10 / 2026</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C5A059] bg-white px-2.5 py-0.5 rounded-full border border-[#EADBCE]">
                    06:30 - 11:15
                  </span>
                </div>

                <div className="text-xs font-sans font-bold text-[#1E2530] uppercase">
                  Sân Vận Động · ĐH FPT Phân Hiệu Cần Thơ
                </div>
                <div className="text-[11px] font-sans text-[#718096] mt-0.5">
                  Số 600 Nguyễn Văn Cừ, Phường An Bình, TP. Cần Thơ
                </div>
                <div className="text-[10px] text-[#C5A059] font-medium mt-2 flex items-center gap-1">
                  <span>✦ Đón khách & chụp ảnh check-in từ 06:30 sáng</span>
                </div>
              </div>

              {/* Graduate info summary */}
              <div className="flex items-center justify-between text-xs px-2 text-[#718096]">
                <span className="font-semibold text-[#9E1B32]">
                  Tân Cử Nhân: {settings.graduate_name}
                </span>
                <span className="text-[11px]">
                  {settings.cohort} · {settings.major}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Dedicated Unblocked Memory Photo Wall (Scrapbook Grid) */}
        <div className="p-4 sm:p-6 md:p-8 bg-[#FAF6F0]/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#9E1B32]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#7D1124]">
                Khoảnh Khắc Kỷ Niệm Thanh Xuân (2022 - 2026)
              </h3>
            </div>
            <span className="text-[11px] text-[#718096] italic hidden sm:inline">
              Nhấn vào ảnh để xem chi tiết
            </span>
          </div>

          {/* 6 Memory Photos Grid - 100% UNBLOCKED, FULLY VISIBLE, VIBRANT COLOR! */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {memoryPhotos.slice(0, 6).map((url, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPhoto(url)}
                className="group relative bg-[#FFFFFF] rounded-2xl p-2 sm:p-2.5 pb-3 sm:pb-3.5 border border-[#EADBCE] shadow-sm hover:shadow-md cursor-pointer transition-all overflow-hidden"
              >
                {/* Photo container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF5EE]">
                  <Image
                    src={url}
                    alt={MEMORY_LABELS[idx] || `Kỷ niệm ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  {/* Hover icon */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-[#9E1B32] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Phóng to
                    </span>
                  </div>
                </div>

                {/* Caption below photo */}
                <div className="mt-2 px-1 flex items-center justify-between text-[11px] sm:text-xs text-[#5A6474]">
                  <span className="font-medium truncate group-hover:text-[#9E1B32] transition-colors">
                    {MEMORY_LABELS[idx] || `Kỷ niệm ${idx + 1}`}
                  </span>
                  <Heart className="w-3 h-3 text-[#C5A059] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="py-3 px-6 bg-[#FAF5EE] border-t border-[#EADBCE] text-center text-xs text-[#718096]">
          <span>Mỗi người bạn là một mảnh ghép ý nghĩa trong hành trình đại học của Hưng</span>
        </div>
      </motion.div>

      {/* Memory Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#FFFFFF] rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden border border-[#EADBCE]"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/5">
                <Image
                  src={selectedPhoto}
                  alt="Ảnh kỷ niệm thanh xuân"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#5A6474]">
                <span className="font-serif italic text-sm text-[#9E1B32] font-semibold">
                  Khoảnh khắc thanh xuân cùng bạn bè & thầy cô FPTU
                </span>
                <span className="text-[11px] text-[#C5A059] font-medium flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#C5A059]" /> Kỷ niệm 2022 - 2026
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
