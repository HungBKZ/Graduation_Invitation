"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, HelpCircle, XCircle, Send, Sparkles, AlertCircle, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { RsvpResponse, RsvpStatus } from "@/types";
import { submitRsvpAction } from "@/app/actions";

interface RsvpSectionProps {
  token: string;
  initialRsvp?: RsvpResponse | null;
}

export function RsvpSection({ token, initialRsvp }: RsvpSectionProps) {
  const [selectedStatus, setSelectedStatus] = useState<RsvpStatus | null>(
    initialRsvp?.response_status || null
  );
  const [message, setMessage] = useState<string>(
    initialRsvp?.personal_message || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) {
      setErrorMessage("Vui lòng chọn một câu trả lời (tham dự, chưa chắc chắn, hoặc từ chối).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitRsvpAction({
      token,
      status: selectedStatus,
      message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      if (selectedStatus === "attending") {
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.75 },
            colors: ["#9E1B32", "#C5A059", "#FAF5EE", "#E53E3E"],
          });
        } catch {}
      }
    } else {
      setErrorMessage(res.error || "Không thể gửi phản hồi. Vui lòng thử lại.");
    }
  };

  return (
    <section id="rsvp-section" className="relative w-full py-8 md:py-16 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 text-center border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.06)]"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#EADBCE] text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#9E1B32]" />
          <span>Xác Nhận Tham Dự</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7D1124] mb-2 leading-snug">
          Bạn sẽ đến chung vui cùng Hưng chứ?
        </h2>
        <p className="text-xs sm:text-sm text-[#718096] font-sans mb-7 max-w-md mx-auto">
          Sự hiện diện của bạn là niềm hạnh phúc lớn đối với Hưng trong ngày nhận bằng tốt nghiệp.
        </p>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-2xl bg-[#F0FFF4] border border-[#9AE6B4] text-left flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2F855A] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#22543D]">
                Đã ghi nhận phản hồi của bạn!
              </p>
              <p className="text-xs text-[#276749] mt-0.5">
                Cảm ơn bạn rất nhiều! Bạn có thể cập nhật lựa chọn bất cứ lúc nào qua liên kết này.
              </p>
            </div>
          </motion.div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#FFF5F5] border border-[#FEB2B2] text-left flex items-center gap-2.5 text-xs text-[#C53030]">
            <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Choices */}
          <div className="space-y-2.5">
            {/* Choice 1: Attending */}
            <label
              onClick={() => setSelectedStatus("attending")}
              className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedStatus === "attending"
                  ? "bg-[#FAF5EE] border-[#9E1B32] shadow-sm text-[#9E1B32]"
                  : "bg-white border-[#EADBCE] text-[#4A5568] hover:border-[#C5A059] hover:bg-[#FAF9F5]"
              }`}
            >
              <input
                type="radio"
                name="rsvpStatus"
                value="attending"
                checked={selectedStatus === "attending"}
                onChange={() => setSelectedStatus("attending")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedStatus === "attending"
                    ? "border-[#9E1B32] bg-[#9E1B32]"
                    : "border-[#CBD5E0]"
                }`}
              >
                {selectedStatus === "attending" && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="font-sans text-sm font-semibold text-[#1E2530]">
                Chắc chắn rồi, mình sẽ đến tham dự! 🎉
              </span>
            </label>

            {/* Choice 2: Maybe */}
            <label
              onClick={() => setSelectedStatus("maybe")}
              className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedStatus === "maybe"
                  ? "bg-[#FAF5EE] border-[#C5A059] shadow-sm text-[#7D1124]"
                  : "bg-white border-[#EADBCE] text-[#4A5568] hover:border-[#C5A059] hover:bg-[#FAF9F5]"
              }`}
            >
              <input
                type="radio"
                name="rsvpStatus"
                value="maybe"
                checked={selectedStatus === "maybe"}
                onChange={() => setSelectedStatus("maybe")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedStatus === "maybe"
                    ? "border-[#C5A059] bg-[#C5A059]"
                    : "border-[#CBD5E0]"
                }`}
              >
                {selectedStatus === "maybe" && (
                  <HelpCircle className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="font-sans text-sm font-semibold text-[#1E2530]">
                Mình chưa chắc chắn, sẽ báo lại sau nhé 🤔
              </span>
            </label>

            {/* Choice 3: Declined */}
            <label
              onClick={() => setSelectedStatus("declined")}
              className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedStatus === "declined"
                  ? "bg-[#FAF5EE] border-[#718096] shadow-sm text-[#4A5568]"
                  : "bg-white border-[#EADBCE] text-[#4A5568] hover:border-[#C5A059] hover:bg-[#FAF9F5]"
              }`}
            >
              <input
                type="radio"
                name="rsvpStatus"
                value="declined"
                checked={selectedStatus === "declined"}
                onChange={() => setSelectedStatus("declined")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedStatus === "declined"
                    ? "border-[#718096] bg-[#718096]"
                    : "border-[#CBD5E0]"
                }`}
              >
                {selectedStatus === "declined" && (
                  <XCircle className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="font-sans text-sm font-semibold text-[#1E2530]">
                Rất tiếc, mình có lịch bận không thể đến 💌
              </span>
            </label>
          </div>

          {/* Optional Message */}
          <div>
            <label
              htmlFor="personal-message"
              className="block text-xs uppercase tracking-wider text-[#9E1B32] font-semibold mb-2"
            >
              Lời nhắn gửi đến Hưng (Tùy chọn)
            </label>
            <textarea
              id="personal-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi một lời chúc hoặc lời nhắn cho Hưng..."
              className="w-full rounded-2xl bg-[#FAF5EE] border border-[#EADBCE] p-3.5 text-sm text-[#1E2530] placeholder-[#A0AEC0] focus:outline-none focus:border-[#9E1B32] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(158,27,50,0.25)] hover:shadow-[0_6px_25px_rgba(158,27,50,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Đang gửi..."
                : initialRsvp
                ? "Cập nhật phản hồi RSVP"
                : "Gửi phản hồi tham dự"}
            </span>
          </button>
        </form>
      </motion.div>
    </section>
  );
}
