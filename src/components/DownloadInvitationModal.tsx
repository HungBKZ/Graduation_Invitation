"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, X, Loader2, Sparkles, Image as ImageIcon, Heart } from "lucide-react";
import { EventSettings } from "@/types";
import { InvitationExportCard } from "./InvitationExportCard";

interface DownloadInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  settings: EventSettings;
}

export function DownloadInvitationModal({
  isOpen,
  onClose,
  guestName,
  settings,
}: DownloadInvitationModalProps) {
  const exportCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateImage = async () => {
    if (!exportCardRef.current) return;
    setIsExporting(true);

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(exportCardRef.current, {
        pixelRatio: 1.5,
        cacheBust: true,
        quality: 0.95,
      });

      setDownloadUrl(dataUrl);

      const cleanGuestName = guestName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      const filename = `Thu-Moi-Tot-Nghiep-${cleanGuestName || "Khach-Moi"}.png`;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EADBCE]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#718096] hover:text-[#1E2530] transition-colors rounded-full hover:bg-[#FAF5EE] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-full bg-[#FAF0E4] border border-[#EADBCE] flex items-center justify-center mb-4 text-[#9E1B32]">
          <ImageIcon className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7D1124]">
          Lưu Thư Mời Cá Nhân Hóa
        </h3>
        <p className="text-xs sm:text-sm text-[#718096] mt-1.5 max-w-sm">
          Ảnh thư mời độ phân giải cao (1080 × 1920) chuẩn Stories Facebook / Instagram / Zalo để bạn lưu giữ làm kỷ niệm.
        </p>

        <div className="my-5 p-4 rounded-2xl bg-[#FAF5EE] border border-[#EADBCE] w-full text-left text-xs space-y-1.5">
          <p className="text-[#9E1B32] font-semibold">Thông tin thiệp mời:</p>
          <p className="text-[#1E2530]">Thương mời: <span className="font-bold text-[#9E1B32]">{guestName}</span></p>
          <p className="text-[#5A6474]">Sự kiện: Lễ tốt nghiệp kỹ sư Phan Thành Hưng</p>
          <p className="text-[#5A6474]">Định dạng: Hình ảnh PNG sắc nét</p>
        </div>

        <button
          onClick={handleGenerateImage}
          disabled={isExporting}
          className="w-full py-3.5 px-6 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(158,27,50,0.25)] hover:shadow-[0_6px_25px_rgba(158,27,50,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang tạo ảnh chất lượng cao...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Tải ảnh thiệp mời (PNG)</span>
            </>
          )}
        </button>

        {downloadUrl && (
          <p className="text-xs text-emerald-700 font-medium mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ảnh đã được lưu về máy của bạn!</span>
          </p>
        )}
      </div>

      {/* Hidden high-res container for offscreen rendering */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        <InvitationExportCard
          ref={exportCardRef}
          guestName={guestName}
          settings={settings}
        />
      </div>
    </div>
  );
}
