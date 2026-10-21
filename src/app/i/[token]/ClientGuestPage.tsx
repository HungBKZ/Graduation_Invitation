"use client";

import React, { useState } from "react";
import { Guest, EventSettings } from "@/types";
import { EnvelopeExperience } from "@/components/EnvelopeExperience";
import { GraduationHero } from "@/components/GraduationHero";
import { InvitationLetter } from "@/components/InvitationLetter";
import { CeremonyTimeline } from "@/components/CeremonyTimeline";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LocationSection } from "@/components/LocationSection";
import { RsvpSection } from "@/components/RsvpSection";
import { ThankYouSection } from "@/components/ThankYouSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DownloadInvitationModal } from "@/components/DownloadInvitationModal";
import { GiaYenClientGuestPage } from "@/components/gia-yen/GiaYenClientGuestPage";

interface ClientGuestPageProps {
  guest: Guest;
  settings: EventSettings;
}

export function ClientGuestPage({ guest, settings }: ClientGuestPageProps) {
  const isGiaYen =
    guest.host_id === "gia_yen" ||
    guest.invitation_token.startsWith("gy-") ||
    settings.theme_style === "burgundy_romance";

  if (isGiaYen) {
    return <GiaYenClientGuestPage guest={guest} settings={settings} />;
  }

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const handleStartAudio = () => {
    if (settings.background_music_url) {
      setIsPlayingAudio(true);
    }
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#1E2530] overflow-x-hidden selection:bg-[#9E1B32] selection:text-[#FAF6F0]">
      {/* Envelope opening overlay */}
      {!isEnvelopeOpen && (
        <EnvelopeExperience
          guestName={guest.name}
          token={guest.invitation_token}
          onOpenComplete={() => setIsEnvelopeOpen(true)}
          onStartAudio={handleStartAudio}
        />
      )}

      {/* Main Graduation Invitation Experience */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Section 1: Memory Collage & Cutout Hero */}
        <GraduationHero settings={settings} guestName={guest.name} />

        {/* Section 2: Personal Invitation Letter */}
        <InvitationLetter guestName={guest.name} settings={settings} />

        {/* Section 3: Official Ceremony Program Timeline */}
        <CeremonyTimeline />

        {/* Section 4: Countdown Timer */}
        <CountdownTimer
          eventDate={settings.event_date}
          eventStartTime={settings.event_start_time}
        />

        {/* Section 5: Event Location & Directions */}
        <LocationSection settings={settings} />

        {/* Section 6: RSVP Form */}
        <RsvpSection token={guest.invitation_token} initialRsvp={guest.rsvp} />

        {/* Section 7: Thank-You and Action Footer */}
        <ThankYouSection
          settings={settings}
          onDownloadClick={() => setIsDownloadOpen(true)}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          hasAudio={Boolean(settings.background_music_url)}
        />
      </main>

      {/* Floating Audio Controller */}
      <MusicPlayer
        audioUrl={settings.background_music_url}
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* Downloadable High-Res Image Modal */}
      <DownloadInvitationModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        guestName={guest.name}
        settings={settings}
      />
    </div>
  );
}
