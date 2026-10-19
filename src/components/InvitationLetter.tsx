"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Sparkles, GraduationCap } from "lucide-react";
import { EventSettings } from "@/types";
import { MonogramSeal } from "./MonogramSeal";

interface InvitationLetterProps {
  guestName: string;
  settings: EventSettings;
}

export function InvitationLetter({ guestName, settings }: InvitationLetterProps) {
  return (
    <section className="relative w-full py-10 md:py-16 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-14 text-center border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.08)] gold-corner-ornament"
      >
        {/* Top Monogram Seal */}
        <div className="flex justify-center mb-4">
          <MonogramSeal size={62} />
        </div>

        {/* Heading */}
        <span className="text-[11px] sm:text-xs tracking-[0.3em] text-[#C5A059] uppercase font-sans font-bold">
          Thư Mời Tham Dự Lễ Tốt Nghiệp
        </span>

        <h2 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#718096] font-sans mt-1">
          Trân trọng kính mời
        </h2>

        {/* Guest Name with Handwriting calligraphy */}
        <div className="my-4 py-2 border-y border-[#EADBCE] max-w-md mx-auto">
          <h1 className="font-handwriting text-3xl sm:text-4xl md:text-5xl font-bold text-[#9E1B32] break-words">
            {guestName}
          </h1>
        </div>

        {/* Invitation Message Body */}
        <div className="my-6 space-y-3.5 text-sm sm:text-base text-[#2D3748] font-sans leading-relaxed max-w-lg mx-auto font-normal">
          {(settings.invitation_message || "")
            .replace(/\\r\\n/g, "\n")
            .replace(/\\n/g, "\n")
            .split(/\n\s*\n/)
            .map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph.split("\n").map((line, lIdx, arr) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
        </div>

        {/* Event Schedule Info Box */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-[#FAF5EE] border border-[#EADBCE] max-w-lg mx-auto flex flex-col gap-3.5 text-left text-xs sm:text-sm">
          <div className="flex items-start gap-3 text-[#1E2530]">
            <Calendar className="w-4 h-4 text-[#9E1B32] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#9E1B32]">Ngày: </span>
              <span className="font-medium">Chủ nhật, ngày 25 tháng 10 năm 2026</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-[#1E2530]">
            <Clock className="w-4 h-4 text-[#9E1B32] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#9E1B32]">Thời gian: </span>
              <span className="font-medium">{settings.event_start_time || "06:30"} - 11:15</span>
              {settings.guest_meeting_time && (
                <span className="text-[#C5A059] font-medium text-xs ml-2">
                  (Đón khách từ: {settings.guest_meeting_time})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 text-[#1E2530]">
            <MapPin className="w-4 h-4 text-[#9E1B32] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#9E1B32]">Địa điểm: </span>
              <span className="font-medium">{settings.location_name}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-[#1E2530]">
            <GraduationCap className="w-4 h-4 text-[#9E1B32] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#9E1B32]">Chương trình: </span>
              <span className="text-[#5A6474]">Lễ Tốt Nghiệp · Trao Bằng Cử Nhân · Chụp ảnh kỷ niệm</span>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-4 border-t border-[#EADBCE] flex flex-col items-center">
          <p className="font-serif italic text-sm text-[#718096]">
            With love and gratitude,
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9E1B32] mt-1 tracking-wide">
            {settings.graduate_name}
          </p>
          <p className="text-xs text-[#C5A059] font-sans font-medium mt-0.5 uppercase tracking-wider">
            {settings.cohort} · {settings.major}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
