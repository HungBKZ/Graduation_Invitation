"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { EventSettings } from "@/types";

interface InvitationExportCardProps {
  guestName: string;
  settings: EventSettings;
  resolvedMemoryPhotos?: string[];
  resolvedGraduatePhoto?: string;
}

export const InvitationExportCard = forwardRef<HTMLDivElement, InvitationExportCardProps>(
  ({ guestName, settings, resolvedMemoryPhotos, resolvedGraduatePhoto }, ref) => {
    const memoryPhotos =
      resolvedMemoryPhotos && resolvedMemoryPhotos.length > 0
        ? resolvedMemoryPhotos
        : settings.memory_photo_urls && settings.memory_photo_urls.length > 0
        ? settings.memory_photo_urls
        : [];

    const graduatePhoto =
      resolvedGraduatePhoto ||
      settings.graduate_photo_url ||
      "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          backgroundColor: "#FAF6F0",
        }}
        className="relative w-[1080px] h-[1920px] overflow-hidden select-none font-sans flex flex-col justify-between"
      >
        {/* ========================================================
            LAYER 1: FULL-BLEED BACKGROUND COLLAGE (Scrapbook Grid)
            ======================================================== */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-3 p-3 bg-[#EADBCE]">
          
          {/* PHOTO 1: Top-Left (Col 1-6, Row 1-4) - Friends Selfie in Forest */}
          <div className="relative col-span-6 row-span-4 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[1] && (
              <img
                src={memoryPhotos[1]}
                alt="Kỷ niệm 1"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* PHOTO 2: Top-Right (Col 7-12, Row 1-4) - Friends on Rock with Blue Sky */}
          <div className="relative col-span-6 row-span-4 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[2] && (
              <img
                src={memoryPhotos[2]}
                alt="Kỷ niệm 2"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* PHOTO 0: Middle-Left (Col 1-5, Row 5-9) - 4 Friends in front of Building */}
          <div className="relative col-span-5 row-span-5 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[0] && (
              <img
                src={memoryPhotos[0]}
                alt="Kỷ niệm 0"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-right"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* PHOTO 3: Middle-Right Top (Col 6-12, Row 5-8) - Stage Awards Ceremony */}
          <div className="relative col-span-7 row-span-4 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[3] && (
              <img
                src={memoryPhotos[3]}
                alt="Kỷ niệm 3"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* PHOTO 4: Middle-Right Bottom Left (Col 6-8, Row 9-12) - Studio Pose */}
          <div className="relative col-span-3 row-span-4 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[4] && (
              <img
                src={memoryPhotos[4]}
                alt="Kỷ niệm 4"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* PHOTO 5: Middle-Right Bottom Right (Col 9-12, Row 9-12) - Military Uniforms */}
          <div className="relative col-span-4 row-span-4 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[5] && (
              <img
                src={memoryPhotos[5]}
                alt="Kỷ niệm 5"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/10" />
          </div>

          {/* Bottom Left Placeholder behind cutout */}
          <div className="relative col-span-5 row-span-3 rounded-2xl overflow-hidden bg-[#DED1BF] border-2 border-white/80 shadow-sm">
            {memoryPhotos[0] && (
              <img
                src={memoryPhotos[0]}
                alt="Kỷ niệm nền"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#2D1B14]/15" />
          </div>
        </div>

        {/* Vintage Paper Wash & Soft Sunlight Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/85 via-transparent to-[#FAF6F0]/80 pointer-events-none" />

        {/* ========================================================
            LAYER 2: TOP HEADER OVERLAY (Festive Ceremony Title)
            ======================================================== */}
        <div className="relative z-30 pt-12 pb-6 px-12 text-center bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFFDF9]/85 to-transparent">
          {/* Flower Doodle (Top Left) */}
          <div className="absolute top-10 left-10 text-[#9E1B32]">
            <svg width="64" height="64" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 4 C22 12, 28 18, 36 20 C28 22, 22 28, 20 36 C18 28, 12 22, 4 20 C12 18, 18 12, 20 4 Z" />
              <circle cx="20" cy="20" r="3.5" fill="#C5A059" stroke="none" />
            </svg>
          </div>

          {/* Star Doodle (Top Right) */}
          <div className="absolute top-10 right-10 text-[#9E1B32]">
            <svg width="64" height="64" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 5 L23.5 15 L34 15 L25.5 21.5 L29 32 L20 25.5 L11 32 L14.5 21.5 L6 15 L16.5 15 Z" />
            </svg>
          </div>

          <span className="text-xl font-sans tracking-[0.45em] uppercase text-[#4A5568] font-extrabold">
            THƯ MỜI THAM DỰ
          </span>

          <h1 className="font-serif text-7xl font-black tracking-tight text-[#9E1B32] uppercase mt-1 drop-shadow-sm leading-none">
            LỄ TỐT NGHIỆP
          </h1>

          <p className="font-serif italic text-2xl text-[#C5A059] font-bold tracking-wide mt-2">
            Graduation Ceremony 2026 · Trường Đại Học FPT Phân Hiệu Cần Thơ
          </p>
        </div>

        {/* ========================================================
            LAYER 3: FOREGROUND CUTOUT OF HƯNG (Big, Sharp, Sticker)
            ======================================================== */}
        <div className="absolute left-[-20px] bottom-[140px] w-[620px] h-[1060px] pointer-events-none z-20 flex items-end justify-center">
          <div className="relative w-full h-full flex items-end">
            <img
              src={graduatePhoto}
              alt={settings.graduate_name}
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-contain object-bottom sticker-cutout drop-shadow-2xl"
            />
          </div>
        </div>

        {/* ========================================================
            LAYER 4: PINNED MEMO CARD (Guest Name Calligraphy)
            ======================================================== */}
        <div className="absolute left-8 bottom-16 z-30 bg-[#FFFDF9] border-2 border-[#EADBCE] rounded-3xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.22)] max-w-[430px] rotate-[-2deg]">
          {/* Red Star Pin */}
          <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center text-[#9E1B32] drop-shadow-md">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#9E1B32" stroke="#FFFDF9" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <div className="text-sm font-sans text-[#7A1022] font-bold tracking-widest uppercase mt-1">
            Thương mời
          </div>
          <h2 className="font-handwriting text-5xl font-bold text-[#9E1B32] tracking-wide mt-1 leading-tight truncate">
            {guestName}
          </h2>
          <p className="text-sm font-sans text-[#718096] italic mt-1 leading-snug">
            đến chung vui ngày nhận bằng cùng Hưng ✨
          </p>
        </div>

        {/* ========================================================
            LAYER 5: TORN PAPER SCHEDULE TICKET (Bottom-Right Banner)
            ======================================================== */}
        <div className="absolute right-0 bottom-0 z-25 w-[560px] rounded-tl-[40px] bg-[#FFFDF9] border-t-2 border-l-2 border-[#EADBCE] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)] text-right">
          {/* Jagged Torn Paper Decorative Top Accent */}
          <div className="absolute -top-5 inset-x-0 h-5 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 560 20" preserveAspectRatio="none" className="w-full h-full fill-[#FFFDF9]">
              <path d="M 0 20 L 0 10 Q 20 0 40 10 T 80 10 T 120 5 T 160 12 T 200 4 T 240 12 T 280 6 T 320 14 T 360 4 T 400 12 T 440 5 T 480 12 T 520 6 T 560 10 L 560 20 Z" />
            </svg>
          </div>

          <div className="text-base font-sans font-extrabold tracking-wider text-[#9E1B32] uppercase">
            THỜI GIAN: 06:30 - 11:15
          </div>

          <div className="font-serif text-6xl font-black text-[#7D1124] my-2 leading-none tracking-tight">
            25 / 10 / 2026
          </div>

          <div className="text-xl font-sans font-black text-[#1E2530] uppercase mt-2">
            SÂN VẬN ĐỘNG
          </div>
          <div className="text-lg font-sans font-bold text-[#5A6474]">
            TRƯỜNG ĐẠI HỌC FPT CẦN THƠ
          </div>
          <div className="text-sm font-sans text-[#8C9BAE] mt-1">
            Số 600 Nguyễn Văn Cừ, Phường An Bình, TP. Cần Thơ
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#EADBCE] flex items-center justify-end gap-2 text-sm font-bold text-[#C5A059] uppercase tracking-wider">
            <span>✦ Đón khách & chụp ảnh check-in từ 06:30</span>
          </div>

          <div className="mt-2 text-xs text-[#718096]">
            SĐT: 0867-009-847 · Tân Cử Nhân Phan Thành Hưng
          </div>
        </div>

        {/* ========================================================
            LAYER 6: BOTTOM SLIM SIGNATURE FOOTER
            ======================================================== */}
        <div className="relative z-30 pb-3 text-center pointer-events-none">
          <span className="text-xs text-[#718096]/70 uppercase tracking-[0.25em] font-semibold">
            THE GRADUATION OF PHAN THÀNH HƯNG · FPT UNIVERSITY CAN THO
          </span>
        </div>
      </div>
    );
  }
);

InvitationExportCard.displayName = "InvitationExportCard";
