"use client";

import React, { useState } from "react";
import { Guest, EventSettings } from "@/types";
import { EnvelopeExperience } from "@/components/EnvelopeExperience";
import { GraduationHero } from "@/components/GraduationHero";
import { InvitationLetter } from "@/components/InvitationLetter";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LocationSection } from "@/components/LocationSection";
import { RsvpSection } from "@/components/RsvpSection";
import { ThankYouSection } from "@/components/ThankYouSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DownloadInvitationModal } from "@/components/DownloadInvitationModal";

interface ClientGuestPageProps {
  guest: Guest;
  settings: EventSettings;
}

export function ClientGuestPage({ guest, settings }: ClientGuestPageProps) {
  // If guest previously opened, they can still view envelope or jump straight to invitation
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
    <div className="relative min-h-screen bg-[#0B1930] text-[#F6F1E8] overflow-x-hidden selection:bg-[#D6B675] selection:text-[#0B1930]">
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
        {/* Section 3: Graduation Hero (Full-body centerpiece) */}
        <GraduationHero settings={settings} />

        {/* Section 4: Personal Invitation Letter */}
        <InvitationLetter guestName={guest.name} settings={settings} />

        {/* Section 5: Countdown Timer */}
        <CountdownTimer
          eventDate={settings.event_date}
          eventStartTime={settings.event_start_time}
        />

        {/* Section 6: Event Location */}
        <LocationSection settings={settings} />

        {/* Section 7: RSVP Form */}
        <RsvpSection token={guest.invitation_token} initialRsvp={guest.rsvp} />

        {/* Section 8: Thank-You and Action Footer */}
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
