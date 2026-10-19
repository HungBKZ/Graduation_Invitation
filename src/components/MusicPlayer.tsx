"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  audioUrl?: string | null;
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicPlayer({
  audioUrl,
  isPlaying,
  onToggle,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.preload = "auto";
      audio.onerror = () => setAudioError(true);
      audioRef.current = audio;
    } else if (audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!audioRef.current || !audioUrl || audioError) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser policy
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioUrl, audioError]);

  if (!audioUrl || audioError) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/95 border border-[#EADBCE] backdrop-blur-md shadow-[0_4px_20px_rgba(158,27,50,0.12)] hover:border-[#9E1B32] hover:bg-[#FFFDF9] transition-all cursor-pointer text-[#9E1B32]"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-[#9E1B32] animate-pulse" />
              <span className="w-0.5 h-4 bg-[#C5A059] animate-bounce" />
              <span className="w-0.5 h-2 bg-[#9E1B32] animate-pulse" />
            </div>
            <span className="text-xs font-sans font-medium hidden sm:inline text-[#1E2530]">
              Nhạc nền
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#718096] group-hover:text-[#9E1B32] transition-colors" />
            <span className="text-xs font-sans font-medium hidden sm:inline text-[#718096] group-hover:text-[#9E1B32]">
              Bật nhạc
            </span>
          </>
        )}
      </button>
    </div>
  );
}
