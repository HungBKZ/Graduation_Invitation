"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, HelpCircle, XCircle, Send, Sparkles, AlertCircle } from "lucide-react";
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
            particleCount: 80,
            spread: 70,
            origin: { y: 0.75 },
            colors: ["#D6B675", "#F6F1E8", "#172A46", "#FFF0D0"],
          });
        } catch {}
      }
    } else {
      setErrorMessage(res.error || "Không thể gửi phản hồi. Vui lòng thử lại.");
    }
  };

  return (
    <section id="rsvp-section" className="relative w-full py-12 md:py-20 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl navy-card rounded-2xl p-6 sm:p-10 md:p-12 text-center gold-border-corner"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B675]" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D6B675] font-sans font-semibold">
            Xác Nhận Tham Dự
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D6B675]" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F1E8] mb-2 leading-snug">
          Will you join my celebration?
        </h2>
        <p className="text-xs sm:text-sm text-[#9DAABD] font-sans mb-8">
          Sự có mặt của bạn là niềm vinh dự lớn đối với Hưng. Hãy cho Hưng biết bạn có thể tham dự không nhé!
        </p>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-[#D6B675]/15 border border-[#D6B675]/50 text-left flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#D6B675] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#D6B675]">
                Đã ghi nhận phản hồi của bạn!
              </p>
              <p className="text-xs text-[#F6F1E8]/90 mt-1">
                Cảm ơn bạn rất nhiều. Bạn có thể thay đổi lựa chọn bất cứ lúc nào qua đường link này.
              </p>
            </div>
          </motion.div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-left flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Choice 1: Attending */}
          <div className="space-y-3">
            <label
              onClick={() => setSelectedStatus("attending")}
              className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                selectedStatus === "attending"
                  ? "bg-[#172A46] border-[#D6B675] shadow-[0_0_15px_rgba(214,182,117,0.2)] text-[#F6F1E8]"
                  : "bg-[#0F1E33]/60 border-[#D6B675]/20 text-[#9DAABD] hover:border-[#D6B675]/40 hover:bg-[#12243C]"
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
                    ? "border-[#D6B675] bg-[#D6B675]"
                    : "border-[#9DAABD]/40"
                }`}
              >
                {selectedStatus === "attending" && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1930]" />
                )}
              </div>
              <span className="font-sans text-sm font-medium text-[#F6F1E8]">
                Tôi sẽ tham dự 🎉
              </span>
            </label>

            {/* Choice 2: Maybe */}
            <label
              onClick={() => setSelectedStatus("maybe")}
              className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                selectedStatus === "maybe"
                  ? "bg-[#172A46] border-[#D6B675] shadow-[0_0_15px_rgba(214,182,117,0.2)] text-[#F6F1E8]"
                  : "bg-[#0F1E33]/60 border-[#D6B675]/20 text-[#9DAABD] hover:border-[#D6B675]/40 hover:bg-[#12243C]"
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
                    ? "border-[#D6B675] bg-[#D6B675]"
                    : "border-[#9DAABD]/40"
                }`}
              >
                {selectedStatus === "maybe" && (
                  <HelpCircle className="w-3.5 h-3.5 text-[#0B1930]" />
                )}
              </div>
              <span className="font-sans text-sm font-medium text-[#F6F1E8]">
                Tôi chưa chắc chắn 🤔
              </span>
            </label>

            {/* Choice 3: Declined */}
            <label
              onClick={() => setSelectedStatus("declined")}
              className={`flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                selectedStatus === "declined"
                  ? "bg-[#172A46] border-[#D6B675] shadow-[0_0_15px_rgba(214,182,117,0.2)] text-[#F6F1E8]"
                  : "bg-[#0F1E33]/60 border-[#D6B675]/20 text-[#9DAABD] hover:border-[#D6B675]/40 hover:bg-[#12243C]"
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
                    ? "border-[#D6B675] bg-[#D6B675]"
                    : "border-[#9DAABD]/40"
                }`}
              >
                {selectedStatus === "declined" && (
                  <XCircle className="w-3.5 h-3.5 text-[#0B1930]" />
                )}
              </div>
              <span className="font-sans text-sm font-medium text-[#F6F1E8]">
                Rất tiếc, tôi không thể tham dự 💌
              </span>
            </label>
          </div>

          {/* Optional Message */}
          <div>
            <label
              htmlFor="personal-message"
              className="block text-xs uppercase tracking-wider text-[#D6B675] font-medium mb-2"
            >
              Lời nhắn gửi đến Hưng (Tùy chọn)
            </label>
            <textarea
              id="personal-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi một lời chúc hoặc lời nhắn cho Hưng..."
              className="w-full rounded-xl bg-[#0F1E33] border border-[#D6B675]/25 p-3.5 text-sm text-[#F6F1E8] placeholder-[#9DAABD]/50 focus:outline-none focus:border-[#D6B675] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(214,182,117,0.3)] hover:shadow-[0_6px_35px_rgba(214,182,117,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Đang gửi..."
                : initialRsvp
                ? "Cập nhật phản hồi RSVP"
                : "Gửi phản hồi RSVP"}
            </span>
          </button>
        </form>
      </motion.div>
    </section>
  );
}
