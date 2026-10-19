"use client";

import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Download, X, Loader2, Sparkles, Image as ImageIcon, Heart, CheckCircle2 } from "lucide-react";
import { EventSettings } from "@/types";
import { InvitationExportCard } from "./InvitationExportCard";

interface DownloadInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  settings: EventSettings;
}

// Convert image URL to Base64 to bypass mobile Safari canvas CORS and lazy-load restrictions
async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn("fetchImageAsBase64 fallback to original url:", url, err);
    return url;
  }
}

export function DownloadInvitationModal({
  isOpen,
  onClose,
  guestName,
  settings,
}: DownloadInvitationModalProps) {
  const exportCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [base64MemoryPhotos, setBase64MemoryPhotos] = useState<string[]>([]);
  const [base64GraduatePhoto, setBase64GraduatePhoto] = useState<string>("");

  // Pre-convert images to base64 whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setDownloadUrl(null);
      return;
    }

    let isMounted = true;
    const preload = async () => {
      const memoryUrls = settings.memory_photo_urls || [];
      const graduateUrl =
        settings.graduate_photo_url ||
        "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png";

      const [convertedMemories, convertedGrad] = await Promise.all([
        Promise.all(memoryUrls.map((u) => fetchImageAsBase64(u))),
        fetchImageAsBase64(graduateUrl),
      ]);

      if (isMounted) {
        setBase64MemoryPhotos(convertedMemories);
        setBase64GraduatePhoto(convertedGrad);
      }
    };

    preload();
    return () => {
      isMounted = false;
    };
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleGenerateImage = async () => {
    if (!exportCardRef.current) return;
    setIsExporting(true);
    setExportStep("Đang tải dữ liệu hình ảnh...");

    try {
      await document.fonts.ready;

      // Ensure base64 images are loaded if not ready yet
      let memoryPhotos = base64MemoryPhotos;
      let gradPhoto = base64GraduatePhoto;

      if (memoryPhotos.length === 0) {
        const memoryUrls = settings.memory_photo_urls || [];
        const graduateUrl =
          settings.graduate_photo_url ||
          "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png";

        [memoryPhotos, gradPhoto] = await Promise.all([
          Promise.all(memoryUrls.map((u) => fetchImageAsBase64(u))),
          fetchImageAsBase64(graduateUrl),
        ]);
        setBase64MemoryPhotos(memoryPhotos);
        setBase64GraduatePhoto(gradPhoto);
      }

      setExportStep("Đang xử lý khung hình 1080 × 1920...");
      // Small pause to guarantee DOM repaint of base64 images
      await new Promise((r) => setTimeout(r, 250));

      const dataUrl = await toPng(exportCardRef.current, {
        pixelRatio: 1, // Card is already 1080x1920 CSS pixels, ideal for mobile memory
        quality: 0.95,
        cacheBust: false, // Don't bust cache on base64 data URLs
      });

      setDownloadUrl(dataUrl);

      const cleanGuestName = guestName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      const filename = `Thu-Moi-Tot-Nghiep-${cleanGuestName || "Khach-Moi"}.png`;

      // Trigger browser download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
      alert("Có lỗi khi tạo ảnh. Vui lòng thử lại!");
    } finally {
      setIsExporting(false);
      setExportStep("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-5 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-[#EADBCE] my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#718096] hover:text-[#1E2530] transition-colors rounded-full hover:bg-[#FAF5EE] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-13 h-13 rounded-full bg-[#FAF0E4] border border-[#EADBCE] flex items-center justify-center mb-3 text-[#9E1B32]">
          <ImageIcon className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7D1124]">
          Lưu Thư Mời Cá Nhân Hóa
        </h3>
        <p className="text-xs sm:text-sm text-[#718096] mt-1 max-w-sm">
          Ảnh thư mời độ phân giải cao (1080 × 1920) chuẩn Stories Facebook / Instagram / Zalo để bạn lưu giữ làm kỷ niệm.
        </p>

        {/* Generated Image Preview on Mobile */}
        {downloadUrl ? (
          <div className="my-4 w-full flex flex-col items-center">
            <div className="relative w-44 sm:w-52 aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-2 border-[#EADBCE] mb-3 bg-[#FAF6F0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={downloadUrl}
                alt="Ảnh thiệp mời"
                className="w-full h-full object-cover select-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs w-full text-center flex items-center justify-center gap-1.5 font-medium mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã tạo ảnh thành công!</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#EADBCE] text-[#718096] text-[11px] sm:text-xs text-left w-full space-y-1 mb-4">
              <p className="font-semibold text-[#9E1B32]">📱 Mẹo lưu ảnh trên điện thoại:</p>
              <p>Nếu ảnh chưa tự tải về máy, bạn hãy <strong>nhấn giữ ngón tay vào bức ảnh phía trên</strong> rồi chọn <strong>&ldquo;Lưu hình ảnh&rdquo; (Save Image)</strong> để lưu vào bộ sưu tập nhé!</p>
            </div>

            <div className="flex gap-2 w-full">
              <a
                href={downloadUrl}
                download={`Thu-Moi-Tot-Nghiep-${guestName}.png`}
                className="flex-1 py-3 px-4 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải lại ảnh (PNG)</span>
              </a>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-full bg-[#FAF5EE] hover:bg-[#F3E7D5] text-[#1E2530] font-sans text-xs font-semibold border border-[#EADBCE] cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="my-4 p-4 rounded-2xl bg-[#FAF5EE] border border-[#EADBCE] w-full text-left text-xs space-y-1.5">
              <p className="text-[#9E1B32] font-semibold">Thông tin thiệp mời:</p>
              <p className="text-[#1E2530]">Thương mời: <span className="font-bold text-[#9E1B32]">{guestName}</span></p>
              <p className="text-[#5A6474]">Định dạng: Hình ảnh dọc Full-Bleed 1080 × 1920</p>
              <p className="text-[#5A6474]">Tương thích: Điện thoại iOS, Android và Máy tính</p>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={isExporting}
              className="w-full py-3.5 px-6 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(158,27,50,0.25)] hover:shadow-[0_6px_25px_rgba(158,27,50,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{exportStep || "Đang xử lý hình ảnh..."}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tạo & Tải ảnh thiệp mời (PNG)</span>
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Hidden card positioned at (0,0) with opacity 0 and -z-50 to ensure mobile browser fully paints images */}
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none overflow-hidden w-[1080px] h-[1920px]">
        <InvitationExportCard
          ref={exportCardRef}
          guestName={guestName}
          settings={settings}
          resolvedMemoryPhotos={base64MemoryPhotos}
          resolvedGraduatePhoto={base64GraduatePhoto}
        />
      </div>
    </div>
  );
}
