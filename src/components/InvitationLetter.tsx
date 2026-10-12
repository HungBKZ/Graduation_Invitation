"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventSettings } from "@/types";
import { MonogramSeal } from "./MonogramSeal";

interface InvitationLetterProps {
  guestName: string;
  settings: EventSettings;
}

export function InvitationLetter({ guestName, settings }: InvitationLetterProps) {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl navy-card rounded-2xl p-6 sm:p-10 md:p-14 text-center gold-border-corner"
      >
        {/* Top Monogram Seal */}
        <div className="flex justify-center mb-6">
          <MonogramSeal size={58} />
        </div>

        {/* Heading */}
        <span className="text-[11px] sm:text-xs tracking-[0.35em] text-[#D6B675] uppercase font-sans font-semibold">
          Graduation Invitation
        </span>

        <h2 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#9DAABD] font-sans mt-2">
          Trân trọng kính mời
        </h2>

        {/* Guest Name with Gold Foil typography */}
        <div className="my-4 py-2 border-y border-[#D6B675]/25 max-w-md mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient-text break-words">
            {guestName}
          </h1>
        </div>

        {/* Invitation Message Body */}
        <div className="my-6 space-y-4 text-sm sm:text-base text-[#F6F1E8]/90 font-sans leading-relaxed max-w-lg mx-auto font-light whitespace-pre-line">
          {settings.invitation_message}
        </div>

        {/* Event Schedule Info Box */}
        <div className="my-8 p-4 sm:p-5 rounded-xl bg-[#0F1E33]/80 border border-[#D6B675]/25 max-w-lg mx-auto flex flex-col gap-3 text-left text-xs sm:text-sm">
          <div className="flex items-start gap-3 text-[#F6F1E8]">
            <Calendar className="w-4 h-4 text-[#D6B675] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#D6B675]">Ngày: </span>
              <span>Chủ nhật, 25 tháng 10 năm 2026</span>
            </div>
          </div>

          {/* Show ceremony time only if explicitly configured */}
          {settings.event_start_time && (
            <div className="flex items-start gap-3 text-[#F6F1E8]">
              <Clock className="w-4 h-4 text-[#D6B675] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#D6B675]">Thời gian: </span>
                <span>{settings.event_start_time}</span>
                {settings.guest_meeting_time && (
                  <span className="text-[#9DAABD] text-xs ml-2">
                    (Đón khách từ: {settings.guest_meeting_time})
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 text-[#F6F1E8]">
            <MapPin className="w-4 h-4 text-[#D6B675] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#D6B675]">Địa điểm: </span>
              <span>{settings.location_name}</span>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-4 border-t border-[#D6B675]/20 flex flex-col items-center">
          <p className="font-serif italic text-sm text-[#9DAABD]">
            With love and gratitude,
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#D6B675] mt-1 tracking-wide">
            {settings.graduate_name}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
