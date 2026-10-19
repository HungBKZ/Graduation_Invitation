"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sparkles, CalendarCheck, Clock } from "lucide-react";

interface CountdownTimerProps {
  eventDate: string; // "2026-10-25"
  eventStartTime?: string | null; // "06:30"
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
  const timeStr = eventStartTime ? `${eventStartTime}:00` : "06:30:00";
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
      <div className="w-full py-8 flex justify-center">
        <div className="w-64 h-20 rounded-2xl bg-[#EADBCE]/30 animate-pulse" />
      </div>
    );
  }

  return (
    <section className="relative w-full py-8 md:py-12 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl mx-auto w-full"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#EADBCE] text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Đếm ngược ngày nhận bằng</span>
        </div>

        {timeLeft.isToday ? (
          <div className="my-4 p-6 rounded-2xl bg-[#FFFDF9] border-2 border-[#9E1B32] text-center shadow-[0_10px_30px_rgba(158,27,50,0.15)]">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#9E1B32]">
              🎉 TODAY IS THE DAY!
            </h3>
            <p className="text-sm text-[#2D3748] mt-2">
              Lễ tốt nghiệp đang diễn ra hôm nay tại Sân Vận Động ĐH FPT Cần Thơ. Rất hân hạnh đón tiếp bạn!
            </p>
          </div>
        ) : timeLeft.isPast ? (
          <div className="my-4 p-6 rounded-2xl bg-[#FFFDF9] border border-[#EADBCE] text-center shadow-sm">
            <CalendarCheck className="w-8 h-8 text-[#9E1B32] mx-auto mb-2" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2530]">
              Lễ Tốt Nghiệp Đã Hoàn Thành
            </h3>
            <p className="text-xs sm:text-sm text-[#718096] mt-1.5">
              Cảm ơn tất cả mọi người đã luôn yêu thương và đồng hành cùng Hưng!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-5 max-w-md mx-auto">
            {[
              { label: "NGÀY", value: timeLeft.days },
              { label: "GIỜ", value: timeLeft.hours },
              { label: "PHÚT", value: timeLeft.minutes },
              { label: "GIÂY", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#EADBCE] shadow-[0_6px_20px_rgba(158,27,50,0.06)] min-w-[70px] sm:min-w-[85px]"
              >
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[#9E1B32] tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-sans font-bold mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-[#718096] font-sans">
          06:30 · Chủ nhật, ngày 25 tháng 10 năm 2026 (Giờ Việt Nam)
        </p>
      </motion.div>
    </section>
  );
}
