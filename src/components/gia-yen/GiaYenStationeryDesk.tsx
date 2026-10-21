"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EventSettings } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Disc3,
  Volume2,
  VolumeX,
  Sparkles,
  Car,
  Heart,
  ExternalLink,
} from "lucide-react";

interface GiaYenStationeryDeskProps {
  guestName: string;
  settings: EventSettings;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onScrollToRsvp: () => void;
  onOpenDownloadModal: () => void;
}

export function GiaYenStationeryDesk({
  guestName,
  settings,
  isPlayingAudio,
  onToggleAudio,
  onScrollToRsvp,
  onOpenDownloadModal,
}: GiaYenStationeryDeskProps) {
  // Countdown to 02/11/2026 11:00:00
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const targetDate = new Date(`${settings.event_date}T${settings.event_start_time || "11:00"}:00`).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [settings.event_date, settings.event_start_time]);

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
      {/* Vintage Desk Canvas */}
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 french-stationery-paper border border-[#D1BBA2]/50 shadow-[0_20px_50px_rgba(84,15,27,0.08)]">
        {/* Subtle decorative stamp at top corner */}
        <div className="absolute top-6 right-6 hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-[#7D1A2A]/40 text-[#7D1A2A]/60 font-serif text-[10px] uppercase tracking-widest rotate-12 select-none pointer-events-none">
          <span>CTU • 2026</span>
          <span className="font-bold text-xs">ÉN</span>
          <span>GRADUATION</span>
        </div>

        {/* Header Ribbon / Monogram */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#540F1B]/10 border border-[#540F1B]/25 text-[#540F1B] font-serif text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#7D1A2A]" />
            Le Gia Yen • Graduation Ceremony
          </div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-serif text-[#3B0A13] tracking-tight font-medium">
            Lễ Tốt Nghiệp Cử Nhân
          </h1>
          <p className="mt-2 text-sm sm:text-base font-serif italic text-[#7D1A2A]">
            Trường Đại Học Cần Thơ • Khóa 48
          </p>
        </div>

        {/* 2-Column French Stationery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Baroque Portrait & Spinning Vinyl */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            
            {/* 1. Baroque Ornate Frame with Gia Yến Portrait */}
            <div className="relative group w-full max-w-[320px]">
              {/* Outer decorative halo */}
              <div className="absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-[#D1BBA2]/30 via-transparent to-[#7D1A2A]/20 blur-sm pointer-events-none" />

              <div className="relative rounded-[36px] bg-[#FAF5EE] p-3 sm:p-4 border-2 border-[#D1BBA2] shadow-[0_15px_35px_rgba(84,15,27,0.15)]">
                {/* Baroque inner border */}
                <div className="relative rounded-[28px] overflow-hidden border border-[#D1BBA2]/70 bg-[#3B0A13]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={settings.graduate_photo_url || "https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg"}
                      alt="Lê Gia Yến"
                      fill
                      priority
                      sizes="(max-width: 768px) 300px, 350px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A13]/80 via-transparent to-transparent" />
                    
                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="font-serif italic text-white text-lg font-medium drop-shadow-md">
                        Lê Gia Yến
                      </span>
                      <p className="text-[11px] uppercase tracking-wider text-[#FAF5EE]/90 font-serif">
                        Tài chính - Ngân hàng
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delicate corner ornaments */}
                <div className="absolute top-2 left-2 text-[#D1BBA2] text-xs">✦</div>
                <div className="absolute top-2 right-2 text-[#D1BBA2] text-xs">✦</div>
                <div className="absolute bottom-2 left-2 text-[#D1BBA2] text-xs">✦</div>
                <div className="absolute bottom-2 right-2 text-[#D1BBA2] text-xs">✦</div>
              </div>
            </div>

            {/* 2. Interactive Vinyl Record ("Click to Listen") */}
            <div
              onClick={onToggleAudio}
              className="group relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#D1BBA2] shadow-sm hover:shadow-md transition-all cursor-pointer w-full max-w-[320px] select-none"
            >
              {/* Vinyl Disc with Grooves */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0">
                <div
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#121212] p-1 shadow-lg relative flex items-center justify-center border-2 border-[#2b2b2b] ${
                    isPlayingAudio ? "spin-record-active" : "spin-record-paused"
                  }`}
                >
                  {/* Vinyl grooves rings */}
                  <div className="w-12 h-12 rounded-full border border-[#2b2b2b] flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-[#383838] flex items-center justify-center">
                      {/* Center Burgundy Record Label */}
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#540F1B] to-[#7D1A2A] border border-[#D1BBA2] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EE]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Disc icon badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#540F1B] text-[#FAF5EE] flex items-center justify-center shadow-md">
                  {isPlayingAudio ? (
                    <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#D1BBA2]" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-[#FAF5EE]/70" />
                  )}
                </div>
              </div>

              {/* Record Label Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-serif uppercase tracking-widest text-[#7D1A2A]">
                  <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "4s" }} />
                  <span>{isPlayingAudio ? "Đang phát nhạc..." : "Nhạc thanh xuân"}</span>
                </div>
                <p className="text-sm font-serif font-bold text-[#3B0A13] truncate mt-0.5">
                  Golden Hour Romance
                </p>
                <p className="text-xs text-[#7D1A2A]/80 font-serif italic">
                  Chạm vào đĩa để {isPlayingAudio ? "tạm dừng" : "lắng nghe"}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Main Stationery Invitation & Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* 1. Main French Invitation Letter Card */}
            <div className="relative rounded-2xl bg-[#FFFDF9] p-6 sm:p-8 border-2 border-[#540F1B]/20 shadow-[0_10px_30px_rgba(84,15,27,0.05)]">
              {/* Inner Double Border */}
              <div className="absolute inset-2 sm:inset-3 rounded-xl border border-[#D1BBA2]/50 pointer-events-none" />

              <div className="relative z-10">
                {/* Guest Personal Salutation */}
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#7D1A2A] font-serif font-semibold">
                    Thân gửi bạn quý,
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#540F1B] font-bold mt-1">
                    {guestName}
                  </h2>
                </div>

                {/* Heartfelt Message */}
                <p className="text-sm sm:text-base font-serif leading-relaxed text-[#3B0A13]/90 italic whitespace-pre-line border-l-2 border-[#D1BBA2] pl-4 py-1 my-4">
                  &ldquo;{settings.invitation_message || "Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện. Én rất mong được gặp bạn trong ngày này!"}&rdquo;
                </p>

                {/* Key Ceremony Details Badge */}
                <div className="mt-6 pt-5 border-t border-[#D1BBA2]/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#540F1B]/10 flex items-center justify-center flex-shrink-0 text-[#540F1B]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#7D1A2A] font-serif">Thời gian</p>
                      <p className="text-sm font-bold text-[#3B0A13] font-serif">
                        Thứ Hai, 02/11/2026
                      </p>
                      <p className="text-xs text-[#540F1B] font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> 11:00 AM (Trưa)
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#540F1B]/10 flex items-center justify-center flex-shrink-0 text-[#540F1B]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#7D1A2A] font-serif">Địa điểm</p>
                      <p className="text-sm font-bold text-[#3B0A13] font-serif">
                        Hội trường Rùa
                      </p>
                      <p className="text-xs text-[#540F1B]/80 font-serif">
                        Trường Đại học Cần Thơ (Khu II)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onScrollToRsvp}
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6B1724] to-[#420A14] text-[#FAF5EE] text-xs sm:text-sm font-serif font-semibold shadow-md hover:shadow-lg hover:from-[#7D1A2A] hover:to-[#540F1B] transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#FAF5EE]/30" />
                    Xác nhận tham dự (RSVP)
                  </button>

                  <button
                    type="button"
                    onClick={onOpenDownloadModal}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D1BBA2] text-[#540F1B] text-xs sm:text-sm font-serif font-semibold hover:bg-[#F3E5C8]/40 transition-colors"
                  >
                    <span>Lưu thiệp ảnh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Oval Tassel Card: "The Finer Details" (Chỉ dẫn Cổng B, gửi xe, SĐT) */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F5EBE1] p-5 sm:p-6 border border-[#D1BBA2] shadow-sm">
              {/* Header with Silk Tassel icon */}
              <div className="flex items-center justify-between pb-3 border-b border-[#D1BBA2]/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#540F1B]" />
                  <h3 className="font-serif font-bold text-[#3B0A13] text-sm sm:text-base tracking-wide">
                    Chỉ Dẫn & Chi Tiết Đón Tiếp
                  </h3>
                </div>
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#7D1A2A]">
                  The Finer Details
                </span>
              </div>

              {/* Directions & Parking */}
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3B0A13]/90">
                  <Car className="w-4 h-4 text-[#7D1A2A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#540F1B]">Đường vào & Bãi gửi xe: </span>
                    <span>
                      Đi từ <strong>Cổng B</strong> vào khoảng 50m bên tay trái là Hội trường Rùa. Bạn có thể gửi xe tại <strong>Tòa ATL</strong> (tòa nhà bên trái khi vào cổng B) hoặc bãi xe <strong>đối diện Hội trường Rùa</strong>.
                    </span>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="tel:0907612060"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#540F1B]/10 hover:bg-[#540F1B]/20 text-[#540F1B] text-xs font-serif font-semibold transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Én: <strong>0907 612 060</strong></span>
                  </a>

                  <a
                    href="tel:0772967049"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#540F1B]/10 hover:bg-[#540F1B]/20 text-[#540F1B] text-xs font-serif font-semibold transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Trợ lý: <strong>0772 967 049</strong></span>
                  </a>

                  <a
                    href={settings.maps_url || "https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D1BBA2]/30 hover:bg-[#D1BBA2]/50 text-[#3B0A13] text-xs font-serif font-semibold transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-[#7D1A2A]" />
                    <span>Chỉ đường Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Deep Burgundy Velvet Countdown Banner */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#4A0D17] via-[#6B1724] to-[#420A14] text-[#FAF5EE] p-5 sm:p-6 shadow-[0_10px_25px_rgba(59,10,19,0.3)] border border-[#D1BBA2]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#D1BBA2]">
                  Đếm ngược đến giờ hẹn
                </span>
                <p className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                  11:00 AM • 02/11/2026
                </p>
              </div>

              {/* Countdown Numbers */}
              <div className="flex items-center gap-2 sm:gap-3 text-center">
                <div className="px-2.5 py-1.5 rounded-xl bg-black/25 border border-white/10 min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-serif font-bold text-[#FAF5EE]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#D1BBA2]">Ngày</p>
                </div>
                <span className="text-[#D1BBA2] font-serif text-lg">:</span>
                <div className="px-2.5 py-1.5 rounded-xl bg-black/25 border border-white/10 min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-serif font-bold text-[#FAF5EE]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#D1BBA2]">Giờ</p>
                </div>
                <span className="text-[#D1BBA2] font-serif text-lg">:</span>
                <div className="px-2.5 py-1.5 rounded-xl bg-black/25 border border-white/10 min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-serif font-bold text-[#FAF5EE]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#D1BBA2]">Phút</p>
                </div>
                <span className="text-[#D1BBA2] font-serif text-lg">:</span>
                <div className="px-2.5 py-1.5 rounded-xl bg-black/25 border border-white/10 min-w-[50px]">
                  <span className="text-lg sm:text-2xl font-serif font-bold text-[#FAF5EE]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <p className="text-[9px] uppercase tracking-wider text-[#D1BBA2]">Giây</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
