"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { EventSettings } from "@/types";
import { MonogramSeal } from "./MonogramSeal";

interface InvitationExportCardProps {
  guestName: string;
  settings: EventSettings;
}

export const InvitationExportCard = forwardRef<HTMLDivElement, InvitationExportCardProps>(
  ({ guestName, settings }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          backgroundColor: "#0B1930",
        }}
        className="relative flex flex-col justify-between p-20 text-[#F6F1E8] overflow-hidden select-none font-sans"
      >
        {/* Background Gradients & Ambient Luxury Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full bg-[#172A46]/60 blur-[150px]" />
          <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#D6B675]/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#D6B675_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        </div>

        {/* Double Gold Ornamental Border */}
        <div className="absolute inset-10 border border-[#D6B675]/40 pointer-events-none rounded-3xl">
          <div className="absolute inset-3 border border-[#D6B675]/20 rounded-2xl" />
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#D6B675]" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#D6B675]" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#D6B675]" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#D6B675]" />
        </div>

        {/* Header Section */}
        <div className="relative z-10 flex flex-col items-center text-center mt-8">
          <MonogramSeal size={140} className="mb-6 drop-shadow-2xl" />
          <span className="text-xl tracking-[0.4em] text-[#D6B675] uppercase font-semibold">
            Official Graduation Invitation
          </span>
          <h2 className="text-2xl font-serif italic text-[#9DAABD] mt-2">
            The Graduation of {settings.graduate_name}
          </h2>
          <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-[#D6B675] to-transparent my-6" />
        </div>

        {/* Middle Visual & Formal Body */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 my-auto">
          {/* Graduate Photo if present */}
          {settings.graduate_photo_url && (
            <div className="relative w-[360px] h-[480px] rounded-2xl overflow-hidden border-2 border-[#D6B675]/50 shadow-2xl mb-8 p-1 bg-[#172A46]">
              <Image
                src={settings.graduate_photo_url}
                alt={settings.graduate_name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}

          <p className="text-2xl tracking-[0.3em] uppercase text-[#9DAABD]">
            Trân trọng kính mời
          </p>

          <div className="my-4 py-4 px-12 border-y-2 border-[#D6B675]/30 max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text tracking-wide leading-tight">
              {guestName}
            </h1>
          </div>

          <div className="max-w-2xl text-2xl text-[#F6F1E8]/90 font-light leading-relaxed my-6 whitespace-pre-line">
            {settings.invitation_message}
          </div>

          {/* Schedule details */}
          <div className="mt-6 py-6 px-12 rounded-2xl bg-[#172A46]/80 border border-[#D6B675]/40 text-xl flex flex-col gap-3 shadow-xl">
            <p className="text-[#D6B675] font-semibold">
              Chủ nhật, ngày 25 tháng 10 năm 2026
            </p>
            {settings.event_start_time && (
              <p className="text-[#F6F1E8]">
                Thời gian: {settings.event_start_time}
                {settings.guest_meeting_time && ` (Đón khách: ${settings.guest_meeting_time})`}
              </p>
            )}
            <p className="text-[#F6F1E8]/90">
              {settings.location_name}
            </p>
            <p className="text-base text-[#9DAABD] tracking-wider uppercase mt-1">
              {settings.cohort} · {settings.major}
            </p>
          </div>
        </div>

        {/* Footer & Signature Section */}
        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <p className="font-serif italic text-2xl text-[#9DAABD]">
            With love and gratitude,
          </p>
          <p className="font-serif text-4xl font-bold text-[#D6B675] mt-2 tracking-wide">
            {settings.graduate_name}
          </p>
          <span className="text-lg text-[#9DAABD]/70 uppercase tracking-[0.25em] mt-3">
            FPT UNIVERSITY CAN THO CAMPUS
          </span>
        </div>
      </div>
    );
  }
);

InvitationExportCard.displayName = "InvitationExportCard";
