"use client";

import React, { useState } from "react";
import { Lock, KeyRound, Loader2, AlertCircle } from "lucide-react";
import { adminLoginAction } from "@/app/actions";
import { MonogramSeal } from "@/components/MonogramSeal";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Vui lòng nhập mật khẩu quản trị viên.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const res = await adminLoginAction(password);
    setIsLoading(false);

    if (res.success) {
      // Reload page to enter authenticated dashboard
      window.location.reload();
    } else {
      setError(res.error || "Mật khẩu không chính xác.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1930] text-[#F6F1E8] flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-md navy-card rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center gold-border-corner">
        <MonogramSeal size={74} className="mb-4 drop-shadow-xl" />

        <div className="w-11 h-11 rounded-full bg-[#D6B675]/15 border border-[#D6B675]/40 flex items-center justify-center text-[#D6B675] mb-3">
          <KeyRound className="w-5 h-5" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#F6F1E8]">
          Bảng Quản Trị Thư Mời
        </h1>
        <p className="text-xs text-[#9DAABD] mt-1 mb-6">
          The Graduation of Phan Thành Hưng · FPT University
        </p>

        {error && (
          <div className="w-full mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-left flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Nhập mật khẩu quản trị..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-sm text-[#F6F1E8] placeholder-[#9DAABD]/50 focus:outline-none focus:border-[#D6B675] transition-colors"
                autoFocus
              />
              <Lock className="w-4 h-4 text-[#D6B675] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-[#9DAABD]/70 text-left mt-1.5 pl-1">
              Mật khẩu mặc định phát triển: <code className="text-[#D6B675]">hungpth2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(214,182,117,0.3)] hover:shadow-[0_6px_25px_rgba(214,182,117,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <span>Đăng Nhập Quản Trị</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
