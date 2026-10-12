"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

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
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#172A46]/90 border border-[#D6B675]/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#D6B675] hover:bg-[#1E365A] transition-all cursor-pointer text-[#D6B675]"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-[#D6B675] animate-pulse" />
              <span className="w-0.5 h-4 bg-[#D6B675] animate-bounce" />
              <span className="w-0.5 h-2 bg-[#D6B675] animate-pulse" />
            </div>
            <span className="text-xs font-sans font-medium hidden sm:inline text-[#F6F1E8]">
              Nhạc nền
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#9DAABD] group-hover:text-[#D6B675] transition-colors" />
            <span className="text-xs font-sans font-medium hidden sm:inline text-[#9DAABD] group-hover:text-[#D6B675]">
              Bật nhạc
            </span>
          </>
        )}
      </button>
    </div>
  );
}
