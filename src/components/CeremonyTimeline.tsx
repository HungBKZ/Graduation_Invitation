"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Clock, Calendar, CheckCircle2, ChevronDown, ChevronUp, Sparkles, GraduationCap } from "lucide-react";
import { OFFICIAL_CEREMONY_SCHEDULE } from "@/lib/constants";

export function CeremonyTimeline() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Key milestones to show in collapsed preview
  const keyMilestones = OFFICIAL_CEREMONY_SCHEDULE.filter((item) => item.highlight);
  const displayItems = isExpanded ? OFFICIAL_CEREMONY_SCHEDULE : keyMilestones;

  return (
    <section className="relative w-full py-8 md:py-14 px-4 sm:px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.06)]"
      >
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#EADBCE] text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Chương Trình Buổi Lễ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7D1124]">
            Lịch Trình Chi Tiết
          </h2>
          <p className="text-xs sm:text-sm text-[#718096] mt-1 font-sans">
            Chủ nhật, ngày 25 tháng 10 năm 2026 · Sân Vận Động ĐH FPT Cần Thơ
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#EADBCE] ml-2 sm:ml-4 space-y-5">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="relative group"
            >
              {/* Dot on timeline */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  item.highlight
                    ? "bg-[#9E1B32] border-[#FFFDF9] ring-2 ring-[#9E1B32]/30"
                    : "bg-[#FFFDF9] border-[#C5A059]"
                }`}
              />

              <div
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  item.highlight
                    ? "bg-[#FAF5EE] border-[#C5A059]/40 shadow-sm"
                    : "bg-white border-[#EADBCE]/80"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-xs font-sans font-bold tracking-wider uppercase ${
                      item.highlight ? "text-[#9E1B32]" : "text-[#C5A059]"
                    }`}
                  >
                    {item.time}
                  </span>
                  {item.highlight && (
                    <span className="text-[10px] font-medium bg-[#9E1B32]/10 text-[#9E1B32] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Điểm nhấn
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-[#1E2530]">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle Expand Button */}
        <div className="mt-8 pt-4 border-t border-[#EADBCE] text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF5EE] hover:bg-[#F3E7D5] text-[#9E1B32] border border-[#EADBCE] text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            {isExpanded ? (
              <>
                <span>Thu gọn lịch trình</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Xem toàn bộ 14 nội dung chương trình chính thức</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
