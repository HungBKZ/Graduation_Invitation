"use client";

import React, { useState } from "react";
import { Guest, EventSettings } from "@/types";
import { GiaYenEnvelopeExperience } from "./GiaYenEnvelopeExperience";
import { GiaYenStationeryDesk } from "./GiaYenStationeryDesk";
import { GiaYenMemoryGallery } from "./GiaYenMemoryGallery";
import { GiaYenRsvpSection } from "./GiaYenRsvpSection";
import { GiaYenDownloadModal } from "./GiaYenDownloadModal";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Heart, Sparkles, Download, Navigation, Phone, ExternalLink } from "lucide-react";

interface GiaYenClientGuestPageProps {
  guest: Guest;
  settings: EventSettings;
}

export function GiaYenClientGuestPage({ guest, settings }: GiaYenClientGuestPageProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const audioTrackUrl =
    settings.background_music_url ||
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3";

  const handleStartAudio = () => {
    setIsPlayingAudio(true);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  const handleScrollToRsvp = () => {
    const rsvpEl = document.getElementById("rsvp-section");
    if (rsvpEl) {
      rsvpEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF5EE] text-[#3B0A13] overflow-x-hidden selection:bg-[#540F1B] selection:text-[#FAF5EE]">
      {/* Background Soft Ambient Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#7D1A2A]/5 via-transparent to-transparent" />
      </div>

      {/* 1. Interactive Deep Burgundy Envelope Overlay */}
      {!isEnvelopeOpen && (
        <GiaYenEnvelopeExperience
          guestName={guest.name}
          token={guest.invitation_token}
          onOpenComplete={() => setIsEnvelopeOpen(true)}
          onStartAudio={handleStartAudio}
        />
      )}

      {/* 2. Main French Romance Stationery Page */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Section 1: French Stationery Desk (Vinyl turntable, baroque portrait, CTU directions, countdown) */}
        <GiaYenStationeryDesk
          guestName={guest.name}
          settings={settings}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          onScrollToRsvp={handleScrollToRsvp}
          onOpenDownloadModal={() => setIsDownloadOpen(true)}
        />

        {/* Section 2: Memory Scrapbook Gallery (9 Photos - Natural Aspect Ratio) */}
        <GiaYenMemoryGallery photos={settings.memory_photo_urls} />

        {/* Section 3: French Floral RSVP Form */}
        <GiaYenRsvpSection
          token={guest.invitation_token}
          initialRsvp={guest.rsvp}
        />

        {/* Section 4: Romantic Thank You & Action Footer */}
        <footer className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EE] p-8 sm:p-12 border border-[#D1BBA2] shadow-sm relative overflow-hidden">
            {/* Top monogram */}
            <div className="w-14 h-14 mx-auto rounded-full bg-[#540F1B]/10 border border-[#540F1B]/20 flex items-center justify-center text-[#540F1B] font-serif font-bold text-lg mb-4">
              LGY
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#3B0A13] font-medium">
              Cảm Ơn Bạn Vì Đã Luôn Đồng Hành
            </h3>

            <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#7D1A2A] max-w-xl mx-auto leading-relaxed whitespace-pre-line">
              {settings.thank_you_message ||
                "Mỗi cột mốc đều ý nghĩa hơn khi được chia sẻ cùng những người mình thương.\n\nCảm ơn bạn đã luôn là một phần tuyệt vời trong hành trình thanh xuân của Én."}
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#540F1B] hover:bg-[#7D1A2A] text-[#FAF5EE] text-xs sm:text-sm font-serif font-semibold shadow-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải ảnh thiệp mời kỷ niệm</span>
              </button>

              <a
                href={settings.maps_url || "https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF5EE] hover:bg-[#F3E5C8]/50 border border-[#D1BBA2] text-[#540F1B] text-xs sm:text-sm font-serif font-semibold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Bản đồ Hội trường Rùa CTU</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>

            {/* Copyright & Subtext */}
            <div className="mt-10 pt-6 border-t border-[#D1BBA2]/40 text-[11px] font-serif text-[#7D1A2A]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>Lễ Tốt Nghiệp • Lê Gia Yến (Én) • Đại học Cần Thơ</span>
              <span>11:00 AM • 02/11/2026</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Audio Controller */}
      <MusicPlayer
        audioUrl={audioTrackUrl}
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* 1080x1920 Download Modal */}
      <GiaYenDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        guestName={guest.name}
        settings={settings}
      />
    </div>
  );
}
