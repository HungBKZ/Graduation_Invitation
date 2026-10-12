"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, X, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
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
      // Ensure Google fonts are loaded
      await document.fonts.ready;

      const dataUrl = await toPng(exportCardRef.current, {
        pixelRatio: 1.5,
        cacheBust: true,
        quality: 0.95,
      });

      setDownloadUrl(dataUrl);

      // Auto trigger download
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg navy-card rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#D6B675]/40">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9DAABD] hover:text-[#F6F1E8] transition-colors rounded-full hover:bg-[#172A46] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#D6B675]/20 border border-[#D6B675]/50 flex items-center justify-center mb-4 text-[#D6B675]">
          <ImageIcon className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F1E8]">
          Tải Thư Mời Cá Nhân Hóa
        </h3>
        <p className="text-xs sm:text-sm text-[#9DAABD] mt-1.5 max-w-sm">
          Ảnh thư mời chất lượng cao (1080 × 1920) định dạng Stories, không bao gồm các nút chức năng của trang web.
        </p>

        <div className="my-6 p-4 rounded-xl bg-[#0F1E33] border border-[#D6B675]/25 w-full text-left text-xs space-y-1.5">
          <p className="text-[#D6B675] font-semibold">Thông tin thư mời tải về:</p>
          <p className="text-[#F6F1E8]">Khách mời: <span className="font-medium text-[#D6B675]">{guestName}</span></p>
          <p className="text-[#F6F1E8]">Sự kiện: Lễ tốt nghiệp kỹ sư Phan Thành Hưng</p>
          <p className="text-[#F6F1E8]">Định dạng: Hình ảnh PNG độ phân giải cao</p>
        </div>

        <button
          onClick={handleGenerateImage}
          disabled={isExporting}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(214,182,117,0.3)] hover:shadow-[0_6px_35px_rgba(214,182,117,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang tạo ảnh chất lượng cao...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Bắt đầu tải xuống PNG</span>
            </>
          )}
        </button>

        {downloadUrl && (
          <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ảnh đã được lưu về thiết bị của bạn!</span>
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
