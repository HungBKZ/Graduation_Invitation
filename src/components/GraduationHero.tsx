"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Award, GraduationCap, Calendar, MapPin } from "lucide-react";
import { MonogramSeal } from "./MonogramSeal";
import { EventSettings } from "@/types";

interface GraduationHeroProps {
  settings: EventSettings;
}

export function GraduationHero({ settings }: GraduationHeroProps) {
  const hasPhoto = Boolean(settings.graduate_photo_url);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#172A46]/30 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#D6B675]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left Side (Desktop 55%): Full-body photograph container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[52%] flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[3/4] rounded-2xl p-2.5 bg-gradient-to-b from-[#1C3354] via-[#11233B] to-[#081324] border border-[#D6B675]/35 shadow-[0_25px_60px_rgba(6,13,26,0.8)] gold-border-corner">
            {/* Inner frame */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0F1E33] to-[#081324] flex items-center justify-center">
              {hasPhoto ? (
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <Image
                    src={settings.graduate_photo_url!}
                    alt={`Tân cử nhân ${settings.graduate_name}`}
                    fill
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Subtle bottom vignette to blend naturally */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081324] to-transparent pointer-events-none" />
                </div>
              ) : (
                /* Elegant Luxury Monogram Placeholder (when no personal photo is uploaded yet) */
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MonogramSeal size={130} className="mb-6 drop-shadow-2xl" />
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D6B675] font-sans font-medium">
                    Software Engineer
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#F6F1E8] mt-2">
                    {settings.graduate_name}
                  </h3>
                  <p className="text-xs text-[#9DAABD] mt-2 italic max-w-xs font-serif leading-relaxed">
                    Kỷ niệm lễ tốt nghiệp chuyên ngành Kỹ thuật Phần mềm · Khóa K18
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D6B675]/30 bg-[#172A46]/60 text-[11px] text-[#D6B675]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#D6B675]" />
                    <span>Lễ Tốt Nghiệp 2026</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom floating tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#D6B675]/40 shadow-lg flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B675] animate-pulse" />
              <span className="text-[11px] tracking-wider font-sans font-medium text-[#D6B675] uppercase">
                {settings.cohort} · {settings.major.split("(")[0].trim()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side (Desktop 45%): Typography & Hero Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[48%] flex flex-col text-center lg:text-left items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D6B675]/30 bg-[#172A46]/50 mb-4">
            <Award className="w-3.5 h-3.5 text-[#D6B675]" />
            <span className="text-xs tracking-[0.25em] text-[#D6B675] uppercase font-sans font-medium">
              Lễ Tốt Nghiệp Đại Học
            </span>
          </div>

          <span className="text-xs tracking-[0.35em] text-[#9DAABD] uppercase font-sans">
            The Graduation of
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F1E8] mt-2 mb-4 gold-gradient-text leading-[1.15]">
            {settings.graduate_name}
          </h1>

          <div className="flex flex-col gap-1.5 text-sm sm:text-base font-sans text-[#D6B675] font-medium tracking-wide">
            <p className="flex items-center justify-center lg:justify-start gap-2">
              <GraduationCap className="w-4 h-4 text-[#D6B675]" />
              <span>{settings.major} · {settings.cohort}</span>
            </p>
            <p className="flex items-center justify-center lg:justify-start gap-2 text-[#9DAABD]">
              <Calendar className="w-4 h-4 text-[#D6B675]" />
              <span>Chủ nhật, 25 · 10 · 2026</span>
            </p>
            <p className="flex items-center justify-center lg:justify-start gap-2 text-[#9DAABD]">
              <MapPin className="w-4 h-4 text-[#D6B675]" />
              <span>{settings.university}</span>
            </p>
          </div>

          <div className="w-16 h-0.5 bg-gradient-to-r from-[#D6B675] to-transparent my-6 hidden lg:block" />

          <p className="text-sm sm:text-base text-[#F6F1E8]/80 font-sans leading-relaxed max-w-lg mt-4 lg:mt-0 font-light">
            Một chặng đường đại học khép lại, mở ra hành trình nghề nghiệp mới
            với nhiều đam mê và khát vọng. Trân trọng kính mời bạn đến cùng chia
            sẻ niềm vui và những khoảnh khắc đáng nhớ nhất trong ngày đặc biệt này.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
