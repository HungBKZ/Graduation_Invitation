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
        backgroundColor: "#180205",
      }}
      className="relative w-[1080px] h-[1920px] overflow-hidden select-none font-serif flex flex-col justify-between p-10 text-[#FAF5EE]"
    >
      {/* ========================================================
          LAYER 1: FULL-BLEED MOODBOARD & FILM STRIP BACKGROUND
          (Completely eliminates any empty/dead space!)
          ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Top-Left Moodboard Photo (Campus / Friends) */}
        <div className="absolute -top-10 -left-10 w-[580px] h-[480px] overflow-hidden opacity-30 filter saturate-75">
          {memoryPhotos[0] && (
            <img
              src={memoryPhotos[0]}
              alt="Background Moodboard 1"
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Top-Right Moodboard Photo (Laughing in sunlight) */}
        <div className="absolute -top-10 -right-10 w-[580px] h-[480px] overflow-hidden opacity-30 filter saturate-75">
          {memoryPhotos[1] && (
            <img
              src={memoryPhotos[1]}
              alt="Background Moodboard 2"
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Mid-Left Vertical Film Strip (35mm aesthetic) */}
        <div className="absolute top-[380px] -left-16 w-[280px] h-[640px] opacity-25 -rotate-6 overflow-hidden flex flex-col gap-3 p-3 bg-black/60 rounded-xl border border-white/10">
          <div className="h-1/2 w-full overflow-hidden rounded-lg">
            {memoryPhotos[4] && (
              <img
                src={memoryPhotos[4]}
                alt="Film strip 1"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="h-1/2 w-full overflow-hidden rounded-lg">
            {memoryPhotos[5] && (
              <img
                src={memoryPhotos[5]}
                alt="Film strip 2"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Mid-Right Background Photo */}
        <div className="absolute top-[420px] -right-16 w-[300px] h-[600px] opacity-25 rotate-6 overflow-hidden rounded-2xl bg-black/50 border border-white/10">
          {memoryPhotos[6] && (
            <img
              src={memoryPhotos[6]}
              alt="Film strip 3"
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Deep Wine Velvet Ambient Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 48%, rgba(88, 11, 23, 0.72) 0%, rgba(20, 2, 5, 0.94) 82%),
              linear-gradient(180deg, rgba(24, 2, 5, 0.82) 0%, rgba(65, 8, 17, 0.6) 45%, rgba(20, 2, 5, 0.96) 100%)
            `,
          }}
        />

        {/* Subtle French Linen Texture Simulation */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D1BBA2_1.5px,transparent_1.5px)] [background-size:22px_22px]" />

        {/* Giant Ghost Editorial Watermark Typography */}
        <div className="absolute top-[280px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[150px] font-serif font-black tracking-[0.25em] text-[#D1BBA2]/8 uppercase select-none">
          GRADUATION
        </div>
        <div className="absolute top-[820px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[130px] font-serif font-black tracking-[0.3em] text-[#D1BBA2]/6 uppercase select-none">
          CAN THO 2026
        </div>
      </div>

      {/* Outer Golden Baroque Frame Border */}
      <div className="absolute inset-6 rounded-[48px] border-2 border-[#E5C378]/40 pointer-events-none" />
      <div className="absolute inset-8 rounded-[40px] border border-[#E5C378]/20 pointer-events-none" />

      {/* Gilded Corner Stars */}
      <div className="absolute top-10 left-10 text-[#E5C378] text-2xl">✦</div>
      <div className="absolute top-10 right-10 text-[#E5C378] text-2xl">✦</div>
      <div className="absolute bottom-10 left-10 text-[#E5C378] text-2xl">✦</div>
      <div className="absolute bottom-10 right-10 text-[#E5C378] text-2xl">✦</div>

      {/* ========================================================
          LAYER 2: TOP EDITORIAL MASTHEAD & TITLE (Haute-Couture Vibe)
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center text-center pt-2">
        
        {/* French Editorial Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#3B070E] border-2 border-[#E5C378] text-[#E5C378] shadow-[0_6px_25px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <span className="text-sm">✦</span>
          <span className="text-xs font-serif uppercase tracking-[0.35em] font-bold">
            Can Tho University • Graduation Issue • 2026
          </span>
          <span className="text-sm">✦</span>
        </div>

        {/* Category Header */}
        <p className="mt-3 text-sm uppercase tracking-[0.45em] text-[#E5C378] font-serif font-bold">
          LỄ TỐT NGHIỆP CỬ NHÂN
        </p>

        {/* Main Graduate Name in Bright Crisp Cream & Gold Foil */}
        <h1 className="text-7xl font-serif italic tracking-wide mt-1 text-[#FFFDF9] font-normal drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          Lê Gia Yến <span className="text-[#E5C378] font-serif">(Én)</span>
        </h1>

        <p className="mt-1 text-2xl font-serif italic text-[#D1BBA2] tracking-wider font-light">
          Tài chính - Ngân hàng • Khóa 48
        </p>
      </div>

      {/* ========================================================
          LAYER 3: CENTERPIECE COMPOSITION (Arch Frame + Polaroids)
          ======================================================== */}
      <div className="relative z-20 flex items-center justify-center my-3">
        
        {/* SATELLITE POLAROID 1 (Left - Friends & Memories) */}
        {memoryPhotos[2] && (
          <div className="absolute -left-2 top-10 w-[320px] p-4 pb-8 rounded-2xl bg-[#FFFFFF] shadow-[0_25px_50px_rgba(0,0,0,0.8)] -rotate-10 border-2 border-[#D1BBA2] z-10">
            {/* Washi Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#E5C378]/80 rotate-[-3deg] rounded-sm shadow-md border-x-2 border-white" />

            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#EADBCE]">
              <img
                src={memoryPhotos[2]}
                alt="Memory Polaroid 1"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-base text-[#580B17] italic font-handwriting font-bold">
                Thanh xuân rực rỡ bên bạn bè
              </p>
              <span className="text-sm text-[#E5C378]">✦</span>
            </div>
          </div>
        )}

        {/* SATELLITE POLAROID 2 (Right - Campus Smile) */}
        {memoryPhotos[3] && (
          <div className="absolute -right-2 top-16 w-[320px] p-4 pb-8 rounded-2xl bg-[#FFFFFF] shadow-[0_25px_50px_rgba(0,0,0,0.8)] rotate-9 border-2 border-[#D1BBA2] z-10">
            {/* Washi Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#E5C378]/80 rotate-[4deg] rounded-sm shadow-md border-x-2 border-white" />

            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#EADBCE]">
              <img
                src={memoryPhotos[3]}
                alt="Memory Polaroid 2"
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-base text-[#580B17] italic font-handwriting font-bold">
                Nụ cười rạng ngời ngày tựu trường
              </p>
              <span className="text-sm text-[#E5C378]">✦</span>
            </div>
          </div>
        )}

        {/* VINYL RECORD STICKER ACCENT (Peeking from Right Side) */}
        <div className="absolute -right-8 bottom-4 w-32 h-32 rounded-full bg-[#121212] border-2 border-[#333] shadow-2xl flex items-center justify-center p-2 z-15 rotate-12">
          <div className="w-24 h-24 rounded-full border border-[#262626] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#580B17] to-[#7D1A2A] border border-[#E5C378] flex items-center justify-center text-center">
              <span className="text-[7px] text-[#FAF5EE] uppercase font-bold tracking-tighter">
                Én&apos;s Track
              </span>
            </div>
          </div>
        </div>

        {/* MAIN BAROQUE ARCH FRAME (Gia Yến's High-Res Portrait) */}
        <div className="relative w-[560px] p-5 rounded-[52px] bg-[#FAF5EE] border-4 border-[#E5C378] shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-20">
          
          {/* Inner Ornate Arch Container */}
          <div className="relative w-full aspect-[3.2/4.4] rounded-[42px] overflow-hidden bg-[#2A050B] border-2 border-[#D1BBA2]/80">
            <img
              src={graduatePhoto}
              alt="Lê Gia Yến Tân Cử Nhân"
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0205]/85 via-transparent to-black/20" />

            {/* Bottom Floating Plaque */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <div className="inline-block px-6 py-2 rounded-full bg-[#180205]/85 backdrop-blur-md border border-[#E5C378]/70 shadow-lg">
                <p className="text-2xl font-serif italic text-[#FAF5EE] font-bold">
                  Lê Gia Yến
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-[#E5C378] font-serif font-semibold mt-0.5">
                  Tân Cử Nhân • ĐH Cần Thơ
                </p>
              </div>
            </div>
          </div>

          {/* Botanical Sprig (Calla Lily & Golden Leaves) at top right */}
          <div className="absolute -top-6 -right-6 pointer-events-none z-30">
            <svg
              className="w-20 h-28 text-[#FFFDF9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] rotate-[35deg]"
              viewBox="0 0 100 140"
              fill="none"
            >
              <path d="M50 40 Q45 80 40 130" stroke="#4A5D43" strokeWidth="3.5" />
              <path d="M45 85 Q30 75 25 65 Q35 70 45 80" fill="#C5A059" opacity="0.95" />
              <path d="M42 105 Q55 95 60 85 Q50 92 42 100" fill="#C5A059" opacity="0.95" />
              <path d="M50 15 C35 25 35 45 50 55 C65 45 65 25 50 15 Z" fill="#FFFDF9" stroke="#EADBCE" strokeWidth="1.5" />
              <path d="M50 20 C42 26 42 38 50 48" stroke="#E5C378" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 3D Wax Seal with Ribbon at bottom left */}
          <div className="absolute -bottom-6 -left-6 z-30 flex items-center justify-center">
            {/* Hanging Ribbon Tails */}
            <div
              className="absolute top-12 left-2 w-5 h-20 bg-gradient-to-b from-[#580B17] to-[#250308] shadow-xl rounded-b-sm border-x border-[#D1BBA2]/30 -rotate-12"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
            />
            <div
              className="absolute top-12 left-8 w-5 h-22 bg-gradient-to-b from-[#580B17] to-[#250308] shadow-xl rounded-b-sm border-x border-[#D1BBA2]/30 rotate-12"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
            />

            {/* Oval Wax Seal */}
            <div
              className="w-24 h-28 rounded-[52%_48%_55%_45%_/_48%_53%_47%_52%] p-2 relative flex flex-col items-center justify-center border-2 border-[#E5C378] shadow-2xl"
              style={{
                background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FAF5EE 45%, #EADBCE 85%, #CBB79F 100%)",
              }}
            >
              <span className="text-base font-serif font-black tracking-widest text-[#580B17]">
                LGY
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#7D1A2A] font-bold">
                CTU • 2026
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          LAYER 4: LUXURY GOLD-FOIL VIP TICKET (Guest Invitation Pass)
          (Occupies bottom area solidly with zero wasted space!)
          ======================================================== */}
      <div className="relative z-20 w-full max-w-[980px] mx-auto rounded-3xl bg-[#FFFDF9] p-8 text-[#3B0A13] border-4 border-[#E5C378] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        
        {/* Ticket Notch Cutouts on left & right sides */}
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#180205] border-r-2 border-[#E5C378]" />
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#180205] border-l-2 border-[#E5C378]" />

        {/* Inner Gold Stitched Border */}
        <div className="absolute inset-3 rounded-2xl border border-dashed border-[#C5A059]/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Header Pass Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#580B17]/10 border border-[#580B17]/25 text-[#580B17] text-xs font-serif uppercase tracking-[0.3em] font-bold">
            <span>✦</span>
            <span>Official VIP Graduation Pass</span>
            <span>✦</span>
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-[#7D1A2A] font-serif font-bold mt-2">
            Trân trọng kính mời
          </p>

          {/* Guest Name in Magnificent Bold Typography */}
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#580B17] mt-1 mb-3 tracking-wide">
            {guestName}
          </h2>

          {/* Event Details Grid (2 Gilded Columns) */}
          <div className="w-full grid grid-cols-2 gap-4 py-3 border-y-2 border-[#D1BBA2]/70 my-2">
            
            {/* Column 1: Time */}
            <div className="flex flex-col items-center border-r border-[#D1BBA2]/50 pr-2">
              <span className="text-[11px] uppercase tracking-widest text-[#7D1A2A] font-bold">
                Thời Gian Đón Tiếp
              </span>
              <p className="text-2xl font-serif font-black text-[#3B0A13] mt-0.5">
                11:00 AM
              </p>
              <p className="text-xs text-[#580B17] font-serif font-semibold">
                Thứ Hai, Ngày 02/11/2026
              </p>
            </div>

            {/* Column 2: Venue */}
            <div className="flex flex-col items-center pl-2">
              <span className="text-[11px] uppercase tracking-widest text-[#7D1A2A] font-bold">
                Địa Điểm Tổ Chức
              </span>
              <p className="text-2xl font-serif font-black text-[#3B0A13] mt-0.5">
                Hội trường Rùa
              </p>
              <p className="text-xs text-[#580B17] font-serif font-semibold">
                Trường Đại học Cần Thơ (Khu II)
              </p>
            </div>

          </div>

          {/* Directions Subtext */}
          <p className="text-xs text-[#7D1A2A] font-serif mt-2 font-medium">
            📍 Chỉ dẫn: Đi từ <strong>Cổng B</strong> vào 50m bên tay trái • Gửi xe tại <strong>Tòa ATL</strong> hoặc đối diện Hội trường Rùa.
          </p>

          {/* Heartfelt Quote & Barcode */}
          <div className="mt-3 pt-2.5 border-t border-[#D1BBA2]/40 w-full flex items-center justify-between px-4 text-left">
            <p className="text-[11px] text-[#580B17] italic font-serif max-w-md">
              &ldquo;Một cột mốc thanh xuân đáng nhớ sẽ càng trọn vẹn hơn khi có những người thương quý cùng hiện diện.&rdquo;
            </p>
            
            {/* Decorative Ticket Barcode */}
            <div className="flex flex-col items-end">
              <span className="font-mono text-xs tracking-widest text-[#3B0A13]">
                |||| | ||||| ||| ||||||| |
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#7D1A2A]">
                LGY-CTU-2026-VIP
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
});

GiaYenInvitationExportCard.displayName = "GiaYenInvitationExportCard";
