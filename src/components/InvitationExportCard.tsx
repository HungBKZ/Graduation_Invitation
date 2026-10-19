"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { EventSettings } from "@/types";

interface InvitationExportCardProps {
  guestName: string;
  settings: EventSettings;
}

const MEMORY_LABELS = [
  "Hội bạn thân K18",
  "Chuyến đi thanh xuân",
  "Những ngày bên nhau",
  "Giảng đường FPTU",
  "Nụ cười rạng rỡ",
  "Hành trình trưởng thành",
];

export const InvitationExportCard = forwardRef<HTMLDivElement, InvitationExportCardProps>(
  ({ guestName, settings }, ref) => {
    const memoryPhotos =
      settings.memory_photo_urls && settings.memory_photo_urls.length > 0
        ? settings.memory_photo_urls
        : [];

    const graduatePhoto =
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
        className="relative flex flex-col justify-between p-12 text-[#1E2530] overflow-hidden select-none font-sans"
      >
        {/* Ambient Warm Sunshine Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#FFF5EB] rounded-full blur-[160px]" />
        </div>

        {/* Outer Double Frame */}
        <div className="absolute inset-8 border-2 border-[#C5A059]/40 pointer-events-none rounded-[40px]">
          <div className="absolute inset-3 border border-[#EADBCE] rounded-[32px]" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 pt-8 text-center flex flex-col items-center">
          {/* Hand-drawn Flower & Star Doodles (Top Corners) */}
          <div className="absolute top-6 left-8 text-[#9E1B32]">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 5 C22 12, 28 18, 35 20 C28 22, 22 28, 20 35 C18 28, 12 22, 5 20 C12 18, 18 12, 20 5 Z" />
              <circle cx="20" cy="20" r="3" fill="#C5A059" stroke="none" />
            </svg>
          </div>

          <div className="absolute top-6 right-8 text-[#9E1B32]">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 6 L23 15 L32 15 L25 21 L28 30 L20 24 L12 30 L15 21 L8 15 L17 15 Z" />
            </svg>
          </div>

          <span className="text-xl font-sans tracking-[0.4em] uppercase text-[#718096] font-semibold">
            Thư Mời Tham Dự
          </span>

          <h1 className="font-serif text-6xl font-black tracking-tight text-[#9E1B32] uppercase mt-2 drop-shadow-sm leading-tight">
            Lễ Tốt Nghiệp
          </h1>

          <p className="font-serif italic text-2xl text-[#C5A059] font-medium tracking-wide mt-2">
            Graduation Ceremony 2026 · Trường Đại Học FPT Phân Hiệu Cần Thơ
          </p>
        </div>

        {/* Central Visual: Cutout Graduate on the Left + Pinned Guest Tag & Info on the Right */}
        <div className="relative z-10 w-full h-[620px] bg-[#FFFFFF] rounded-3xl p-8 border-2 border-[#EADBCE] shadow-lg flex items-center justify-between">
          
          {/* Left: Cutout of Graduate */}
          <div className="relative w-[45%] h-full flex items-end justify-center">
            <Image
              src={graduatePhoto}
              alt={settings.graduate_name}
              fill
              className="object-contain object-bottom sticker-cutout drop-shadow-2xl"
              unoptimized
            />
          </div>

          {/* Right: Personalized Tag + Event Info */}
          <div className="w-[52%] flex flex-col justify-between h-full py-4">
            {/* Pinned Tag */}
            <div className="relative bg-[#FFFDF9] border-2 border-[#EADBCE] rounded-3xl p-6 shadow-md rotate-[-1deg]">
              <div className="text-base font-sans text-[#7A1022] font-bold tracking-wider uppercase">
                Thương mời
              </div>
              <h2 className="font-handwriting text-5xl font-bold text-[#9E1B32] tracking-wide mt-1 leading-tight truncate">
                {guestName}
              </h2>
              <p className="text-base font-sans text-[#718096] italic mt-1">
                đến chung vui ngày nhận bằng cùng Hưng ✨
              </p>
            </div>

            {/* Event schedule badge */}
            <div className="bg-[#FAF5EE] border-2 border-[#EADBCE] rounded-3xl p-6 mt-4">
              <div className="text-lg font-sans font-bold text-[#9E1B32] uppercase tracking-wider mb-2">
                06:30 - 11:15 · Chủ Nhật, 25/10/2026
              </div>
              <div className="text-2xl font-serif font-extrabold text-[#1E2530] uppercase">
                Sân Vận Động
              </div>
              <div className="text-lg font-sans text-[#5A6474]">
                Trường Đại học FPT Phân Hiệu Cần Thơ
              </div>
              <div className="text-base font-sans text-[#8C9BAE] mt-1">
                Số 600 Nguyễn Văn Cừ, Phường An Bình, TP. Cần Thơ
              </div>
            </div>

            <div className="flex items-center justify-between text-base px-2 text-[#718096] mt-2">
              <span className="font-bold text-[#9E1B32]">
                Tân Cử Nhân: {settings.graduate_name}
              </span>
              <span>{settings.cohort} · {settings.major}</span>
            </div>
          </div>
        </div>

        {/* Dedicated Unblocked Memory Photos (6 Photos, 100% VISIBLE!) */}
        <div className="relative z-10 w-full bg-[#FFFFFF] rounded-3xl p-8 border-2 border-[#EADBCE] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-2xl font-bold text-[#7D1124]">
              Khoảnh Khắc Kỷ Niệm Thanh Xuân (2022 - 2026)
            </h3>
            <span className="text-lg text-[#C5A059] font-serif italic">
              FPT University Memories
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {memoryPhotos.slice(0, 6).map((url, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-3 pb-4 border border-[#EADBCE] shadow-sm flex flex-col"
              >
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-[#FAF5EE]">
                  <Image
                    src={url}
                    alt={MEMORY_LABELS[idx] || `Kỷ niệm ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-sm font-sans font-medium text-[#5A6474] mt-2 text-center">
                  {MEMORY_LABELS[idx] || `Kỷ niệm ${idx + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Sub-banner */}
        <div className="relative z-10 pb-6 text-center flex flex-col items-center">
          <p className="text-xl font-serif italic text-[#718096]">
            With love and gratitude,
          </p>
          <p className="text-3xl font-serif font-bold text-[#9E1B32] tracking-wide mt-1">
            {settings.graduate_name}
          </p>
          <span className="text-base text-[#C5A059] uppercase tracking-[0.25em] font-semibold mt-1">
            Software Engineering K18 · FPT UNIVERSITY CAN THO
          </span>
        </div>
      </div>
    );
  }
);

InvitationExportCard.displayName = "InvitationExportCard";
