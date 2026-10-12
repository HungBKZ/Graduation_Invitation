"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { EventSettings } from "@/types";

interface LocationSectionProps {
  settings: EventSettings;
}

export function LocationSection({ settings }: LocationSectionProps) {
  const hasMapsUrl = Boolean(settings.maps_url && settings.maps_url.trim().length > 0);

  return (
    <section className="relative w-full py-12 md:py-18 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl navy-card rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full bg-[#D6B675]/15 border border-[#D6B675]/40 flex items-center justify-center mb-4">
          <MapPin className="w-6 h-6 text-[#D6B675]" />
        </div>

        <span className="text-[11px] tracking-[0.3em] text-[#D6B675] uppercase font-sans font-semibold">
          Địa điểm tổ chức
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F1E8] mt-2 mb-1">
          {settings.location_name}
        </h3>

        <p className="text-xs sm:text-sm text-[#9DAABD] font-sans max-w-md mt-1 leading-relaxed">
          Số 600 đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ
        </p>

        <div className="my-5 py-2.5 px-4 rounded-lg bg-[#0F1E33] border border-[#D6B675]/20 text-xs text-[#F6F1E8]/80 inline-flex items-center gap-2">
          <span>Lễ Tốt Nghiệp Khóa K18 · 25.10.2026</span>
        </div>

        {hasMapsUrl ? (
          <a
            href={settings.maps_url!}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#172A46] border border-[#D6B675] text-[#D6B675] hover:bg-[#D6B675] hover:text-[#0B1930] transition-all duration-300 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_4px_20px_rgba(214,182,117,0.15)] hover:shadow-[0_4px_25px_rgba(214,182,117,0.4)]"
          >
            <Navigation className="w-4 h-4 transition-transform group-hover:rotate-45" />
            <span>Xem vị trí trên Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        ) : (
          <p className="text-xs text-[#9DAABD]/70 italic mt-2">
            Đường dẫn Google Maps sẽ được cập nhật sớm trong bảng điều khiển.
          </p>
        )}
      </motion.div>
    </section>
  );
}
