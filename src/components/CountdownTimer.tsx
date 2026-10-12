"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sparkles, CalendarCheck } from "lucide-react";

interface CountdownTimerProps {
  eventDate: string; // "2026-10-25"
  eventStartTime?: string | null; // e.g. "08:30" or null
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

function calculateTimeLeft(
  eventDate: string,
  eventStartTime?: string | null
): TimeLeft {
  // Event target in Asia/Ho_Chi_Minh (UTC+7)
  const timeStr = eventStartTime ? `${eventStartTime}:00` : "08:00:00";
  const targetIso = `${eventDate}T${timeStr}+07:00`;
  const targetTime = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = targetTime - now;

  // Check if same day in Vietnam
  const nowVn = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const todayStr = `${nowVn.getFullYear()}-${String(
    nowVn.getMonth() + 1
  ).padStart(2, "0")}-${String(nowVn.getDate()).padStart(2, "0")}`;

  const isToday = todayStr === eventDate;
  const isPast = diff < 0 && !isToday;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday,
      isPast,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isToday: false,
    isPast: false,
  };
}

export function CountdownTimer({
  eventDate,
  eventStartTime,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(eventDate, eventStartTime)
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate, eventStartTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, eventStartTime]);

  if (!mounted || !timeLeft) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="w-48 h-20 rounded-xl bg-[#172A46]/30 animate-pulse" />
      </div>
    );
  }

  return (
    <section className="relative w-full py-12 md:py-16 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#D6B675]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#D6B675] font-sans font-medium">
            Đếm ngược ngày lễ
          </span>
          <Sparkles className="w-4 h-4 text-[#D6B675]" />
        </div>

        {timeLeft.isToday ? (
          <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-[#D6B675]/20 via-[#D6B675]/30 to-[#D6B675]/20 border border-[#D6B675] text-center shadow-[0_0_30px_rgba(214,182,117,0.3)]">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
              TODAY IS THE DAY!
            </h3>
            <p className="text-sm text-[#F6F1E8] mt-2">
              Ngày lễ tốt nghiệp đang diễn ra hôm nay. Rất hân hạnh được đón tiếp bạn!
            </p>
          </div>
        ) : timeLeft.isPast ? (
          <div className="my-6 p-6 rounded-2xl bg-[#172A46]/60 border border-[#D6B675]/30 text-center">
            <CalendarCheck className="w-8 h-8 text-[#D6B675] mx-auto mb-2" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F1E8]">
              Lễ Tốt Nghiệp Đã Hoàn Thành
            </h3>
            <p className="text-xs sm:text-sm text-[#9DAABD] mt-1.5">
              Cảm ơn tất cả mọi người đã luôn yêu thương và đồng hành cùng Hưng!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-6 max-w-md mx-auto">
            {[
              { label: "NGÀY", value: timeLeft.days },
              { label: "GIỜ", value: timeLeft.hours },
              { label: "PHÚT", value: timeLeft.minutes },
              { label: "GIÂY", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#172A46]/80 to-[#0E1F36]/90 border border-[#D6B675]/30 shadow-lg min-w-[70px] sm:min-w-[85px]"
              >
                <span className="font-serif text-2xl sm:text-4xl font-bold text-[#F6F1E8] tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D6B675] uppercase font-sans mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-[#9DAABD] font-sans">
          Múi giờ Việt Nam (UTC+7) · Chủ nhật, 25.10.2026
        </p>
      </motion.div>
    </section>
  );
}
