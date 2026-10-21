"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, HelpCircle, XCircle, Send, Sparkles, AlertCircle, Heart } from "lucide-react";
import { RsvpResponse, RsvpStatus } from "@/types";
import { submitRsvpAction } from "@/app/actions";

interface GiaYenRsvpSectionProps {
  token: string;
  initialRsvp?: RsvpResponse | null;
}

export function GiaYenRsvpSection({ token, initialRsvp }: GiaYenRsvpSectionProps) {
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
      setErrorMessage("Vui lòng chọn phản hồi của bạn để Én chuẩn bị chu đáo nhé!");
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
            origin: { y: 0.7 },
            colors: ["#540F1B", "#7D1A2A", "#D1BBA2", "#FAF5EE", "#C25E6E"],
          });
        } catch {
          // ignore
        }
      }
    } else {
      setErrorMessage(res.error || "Không thể gửi phản hồi. Vui lòng thử lại.");
    }
  };

  return (
    <section id="rsvp-section" className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Scalloped Floral Stationery Container */}
      <div className="relative rounded-3xl bg-[#FFFDF9] border-2 border-[#540F1B]/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(84,15,27,0.08)]">
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#D1BBA2]/50 pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#540F1B]/10 text-[#540F1B] border border-[#540F1B]/20 text-xs font-serif uppercase tracking-[0.25em]">
            <Heart className="w-3.5 h-3.5 fill-[#7D1A2A]/40 text-[#7D1A2A]" />
            Kindly RSVP
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-serif text-[#3B0A13] font-medium tracking-tight">
            Xác Nhận Tham Dự Cùng Én
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#7D1A2A] max-w-md mx-auto">
            Sự hiện diện của bạn là niềm vinh hạnh và niềm vui to lớn của Én trong ngày lễ tốt nghiệp.
          </p>

          {/* Success Banner */}
          {submitSuccess && (
            <div className="mt-6 p-4 rounded-2xl bg-[#540F1B]/10 border border-[#540F1B]/30 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#540F1B] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#3B0A13]">
                    Én đã nhận được phản hồi của bạn!
                  </h4>
                  <p className="text-xs text-[#540F1B] mt-1 font-serif">
                    Cảm ơn bạn rất nhiều vì đã hồi đáp. Hẹn gặp bạn tại Hội trường Rùa ĐH Cần Thơ lúc 11:00 AM ngày 02/11/2026 nhé! 🌸
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-left">
              <div className="flex items-center gap-2 text-red-800 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
            {/* Status Selection Cards */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-[#7D1A2A] font-semibold mb-3">
                Bạn có thể đến chung vui không? *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Attending */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus("attending")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedStatus === "attending"
                      ? "bg-[#540F1B] text-[#FAF5EE] border-[#540F1B] shadow-md scale-[1.02]"
                      : "bg-[#FAF5EE] text-[#3B0A13] border-[#D1BBA2] hover:border-[#540F1B]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🌸</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        selectedStatus === "attending"
                          ? "text-[#D1BBA2]"
                          : "text-transparent"
                      }`}
                    />
                  </div>
                  <p className="text-sm font-serif font-bold mt-2">Chắc chắn đến</p>
                  <p
                    className={`text-[11px] font-serif italic mt-0.5 ${
                      selectedStatus === "attending"
                        ? "text-[#FAF5EE]/80"
                        : "text-[#7D1A2A]"
                    }`}
                  >
                    11h tại Hội trường Rùa
                  </p>
                </button>

                {/* 2. Maybe */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus("maybe")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedStatus === "maybe"
                      ? "bg-[#540F1B] text-[#FAF5EE] border-[#540F1B] shadow-md scale-[1.02]"
                      : "bg-[#FAF5EE] text-[#3B0A13] border-[#D1BBA2] hover:border-[#540F1B]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">✨</span>
                    <HelpCircle
                      className={`w-4 h-4 ${
                        selectedStatus === "maybe"
                          ? "text-[#D1BBA2]"
                          : "text-transparent"
                      }`}
                    />
                  </div>
                  <p className="text-sm font-serif font-bold mt-2">Có thể sẽ đến</p>
                  <p
                    className={`text-[11px] font-serif italic mt-0.5 ${
                      selectedStatus === "maybe"
                        ? "text-[#FAF5EE]/80"
                        : "text-[#7D1A2A]"
                    }`}
                  >
                    Sẽ cố gắng thu xếp
                  </p>
                </button>

                {/* 3. Declined */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus("declined")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedStatus === "declined"
                      ? "bg-[#540F1B] text-[#FAF5EE] border-[#540F1B] shadow-md scale-[1.02]"
                      : "bg-[#FAF5EE] text-[#3B0A13] border-[#D1BBA2] hover:border-[#540F1B]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">💌</span>
                    <XCircle
                      className={`w-4 h-4 ${
                        selectedStatus === "declined"
                          ? "text-[#D1BBA2]"
                          : "text-transparent"
                      }`}
                    />
                  </div>
                  <p className="text-sm font-serif font-bold mt-2">Tiếc là không đến được</p>
                  <p
                    className={`text-[11px] font-serif italic mt-0.5 ${
                      selectedStatus === "declined"
                        ? "text-[#FAF5EE]/80"
                        : "text-[#7D1A2A]"
                    }`}
                  >
                    Gửi lời chúc từ xa
                  </p>
                </button>
              </div>
            </div>

            {/* Personal Wish Message Area */}
            <div>
              <label
                htmlFor="personal-message"
                className="block text-xs font-serif uppercase tracking-widest text-[#7D1A2A] font-semibold mb-2"
              >
                Gửi lời chúc đến Én (Tùy chọn)
              </label>
              <textarea
                id="personal-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Viết vài dòng chia vui hoặc nhắn nhủ cùng Én tại đây..."
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF5EE] border border-[#D1BBA2] text-sm text-[#3B0A13] font-serif placeholder:text-[#3B0A13]/40 focus:outline-none focus:border-[#540F1B] focus:ring-1 focus:ring-[#540F1B] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#6B1724] via-[#540F1B] to-[#3B0A13] text-[#FAF5EE] font-serif font-semibold text-sm shadow-md hover:shadow-xl hover:from-[#7D1A2A] hover:to-[#540F1B] disabled:opacity-60 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#D1BBA2]" />
                    <span>Đang gửi phản hồi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#D1BBA2]" />
                    <span>Gửi phản hồi cho Én</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
