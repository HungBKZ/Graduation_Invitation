"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink, Sparkles } from "lucide-react";
import { EventSettings } from "@/types";

interface LocationSectionProps {
  settings: EventSettings;
}

export function LocationSection({ settings }: LocationSectionProps) {
  const mapsUrl = settings.maps_url || "https://maps.app.goo.gl/Ns55iZXUqcW4ZxET7";

  return (
    <section className="relative w-full py-8 md:py-14 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.06)]"
      >
        <div className="w-14 h-14 rounded-full bg-[#FAF0E4] border border-[#EADBCE] flex items-center justify-center mb-4 text-[#9E1B32]">
          <MapPin className="w-7 h-7" />
        </div>

        <span className="text-[11px] tracking-[0.3em] text-[#C5A059] uppercase font-sans font-bold">
          Địa điểm tổ chức
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#7D1124] mt-2 mb-1">
          {settings.location_name}
        </h3>

        <p className="text-xs sm:text-sm text-[#5A6474] font-sans max-w-md mt-1 leading-relaxed">
          Số 600 Nguyễn Văn Cừ, Phường An Bình, Thành phố Cần Thơ
        </p>

        <div className="my-5 py-2 px-4 rounded-full bg-[#FAF5EE] border border-[#EADBCE] text-xs text-[#9E1B32] font-medium inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Khuôn viên Sân Vận Động · Lễ Tốt Nghiệp Khóa K18</span>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white transition-all duration-300 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_4px_20px_rgba(158,27,50,0.25)] hover:shadow-[0_6px_25px_rgba(158,27,50,0.4)]"
        >
          <Navigation className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span>Chỉ đường trên Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </motion.div>
    </section>
  );
}
