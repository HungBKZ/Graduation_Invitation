"use client";

import React, { forwardRef } from "react";
import { EventSettings } from "@/types";

interface GiaYenInvitationExportCardProps {
  guestName: string;
  settings: EventSettings;
  resolvedMemoryPhotos?: string[];
  resolvedGraduatePhoto?: string;
}

export const GiaYenInvitationExportCard = forwardRef<
  HTMLDivElement,
  GiaYenInvitationExportCardProps
>(({ guestName, settings, resolvedMemoryPhotos, resolvedGraduatePhoto }, ref) => {
  const memoryPhotos =
    resolvedMemoryPhotos && resolvedMemoryPhotos.length > 0
      ? resolvedMemoryPhotos
      : settings.memory_photo_urls && settings.memory_photo_urls.length > 0
      ? settings.memory_photo_urls
      : [];

  const graduatePhoto =
    resolvedGraduatePhoto ||
    settings.graduate_photo_url ||
    "https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg";

  return (
    <div
      ref={ref}
      style={{
        width: "1080px",
        height: "1920px",
        backgroundColor: "#24050B",
      }}
      className="relative w-[1080px] h-[1920px] overflow-hidden select-none font-serif flex flex-col justify-between p-12 text-[#FAF5EE]"
    >
      {/* Background Burgundy Textured Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B0A13] via-[#540F1B] to-[#24050B]" />
      
      {/* Subtle French Linen Texture Simulation */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D1BBA2_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Outer Golden Baroque Frame */}
      <div className="absolute inset-8 rounded-[48px] border-2 border-[#D1BBA2]/50 pointer-events-none" />
      <div className="absolute inset-10 rounded-[40px] border border-[#D1BBA2]/30 pointer-events-none" />

      {/* Decorative Corner Stars */}
      <div className="absolute top-12 left-12 text-[#D1BBA2] text-2xl">✦</div>
      <div className="absolute top-12 right-12 text-[#D1BBA2] text-2xl">✦</div>
      <div className="absolute bottom-12 left-12 text-[#D1BBA2] text-2xl">✦</div>
      <div className="absolute bottom-12 right-12 text-[#D1BBA2] text-2xl">✦</div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full pt-6 pb-4">
        
        {/* HEADER SECTION */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FAF5EE]/10 border border-[#D1BBA2]/40 text-[#D1BBA2] text-sm uppercase tracking-[0.3em]">
            <span>Trường Đại Học Cần Thơ</span>
            <span>•</span>
            <span>Khóa 48</span>
          </div>

          <h1 className="mt-6 text-5xl font-serif text-[#FAF5EE] tracking-wide font-normal">
            Lễ Tốt Nghiệp Cử Nhân
          </h1>

          <p className="mt-2 text-2xl italic text-[#D1BBA2] font-serif">
            Tài chính - Ngân hàng
          </p>
        </div>

        {/* CENTER SECTION: BAROQUE PORTRAIT & POLAROID SATELLITES */}
        <div className="relative flex items-center justify-center my-6">
          
          {/* Polaroid Satellite 1 (Left Tilt) */}
          {memoryPhotos[0] && (
            <div className="absolute -left-20 top-8 w-56 p-3 pb-6 rounded-2xl bg-[#FFFDF9] shadow-2xl -rotate-12 border border-[#D1BBA2]/60 z-10">
              <div className="w-full h-56 rounded-xl overflow-hidden bg-[#FAF5EE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={memoryPhotos[0]}
                  alt="Kỷ niệm 1"
                  crossOrigin="anonymous"
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-xs text-[#540F1B] italic font-handwriting">
                Thanh xuân rực rỡ
              </p>
            </div>
          )}

          {/* Polaroid Satellite 2 (Right Tilt) */}
          {memoryPhotos[1] && (
            <div className="absolute -right-20 top-16 w-56 p-3 pb-6 rounded-2xl bg-[#FFFDF9] shadow-2xl rotate-12 border border-[#D1BBA2]/60 z-10">
              <div className="w-full h-56 rounded-xl overflow-hidden bg-[#FAF5EE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={memoryPhotos[1]}
                  alt="Kỷ niệm 2"
                  crossOrigin="anonymous"
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-xs text-[#540F1B] italic font-handwriting">
                Nụ cười rạng ngời
              </p>
            </div>
          )}

          {/* Main Baroque Oval Mirror Frame */}
          <div className="relative w-[480px] p-5 rounded-[60px] bg-[#FAF5EE] border-4 border-[#D1BBA2] shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-20">
            <div className="relative w-full aspect-[3/4] rounded-[50px] overflow-hidden bg-[#3B0A13] border-2 border-[#D1BBA2]/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={graduatePhoto}
                alt="Lê Gia Yến"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24050B]/80 via-transparent to-transparent" />
              
              {/* Name Tag on Frame */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <h2 className="text-4xl font-serif italic text-white drop-shadow-md">
                  Lê Gia Yến
                </h2>
                <p className="text-sm uppercase tracking-[0.25em] text-[#D1BBA2] mt-1 font-serif">
                  Tân Cử Nhân
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: INVITATION CARD FOR GUEST */}
        <div className="w-full max-w-[800px] rounded-3xl bg-[#FAF5EE] p-8 text-[#3B0A13] border-2 border-[#D1BBA2] shadow-2xl relative">
          {/* Inner gold line */}
          <div className="absolute inset-2.5 rounded-2xl border border-[#D1BBA2]/60 pointer-events-none" />

          <div className="relative z-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7D1A2A] font-semibold">
              Trân trọng kính mời
            </p>
            <h3 className="text-4xl font-serif font-bold text-[#540F1B] mt-2 mb-4">
              {guestName}
            </h3>

            {/* Time & Venue Block */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#D1BBA2]/60 my-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#7D1A2A]">Thời gian</p>
                <p className="text-xl font-bold text-[#3B0A13] mt-1">11:00 AM</p>
                <p className="text-sm text-[#540F1B]">Thứ Hai, 02/11/2026</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#7D1A2A]">Địa điểm</p>
                <p className="text-xl font-bold text-[#3B0A13] mt-1">Hội trường Rùa</p>
                <p className="text-sm text-[#540F1B]">Đại học Cần Thơ (Khu II)</p>
              </div>
            </div>

            <p className="text-xs text-[#540F1B]/80 italic mt-3 font-serif">
              &ldquo;Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </div>
  );
});

GiaYenInvitationExportCard.displayName = "GiaYenInvitationExportCard";
