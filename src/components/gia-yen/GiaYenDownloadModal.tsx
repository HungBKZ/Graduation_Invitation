"use client";

import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Download, X, Loader2, Sparkles, Image as ImageIcon, Heart, CheckCircle2 } from "lucide-react";
import { EventSettings } from "@/types";
import { GiaYenInvitationExportCard } from "./GiaYenInvitationExportCard";

interface GiaYenDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  settings: EventSettings;
}

// Convert image URL to Base64 to bypass mobile canvas CORS restrictions
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
    console.warn("fetchImageAsBase64 fallback to url:", url, err);
    return url;
  }
}

export function GiaYenDownloadModal({
  isOpen,
  onClose,
  guestName,
  settings,
}: GiaYenDownloadModalProps) {
  const exportCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [base64MemoryPhotos, setBase64MemoryPhotos] = useState<string[]>([]);
  const [base64GraduatePhoto, setBase64GraduatePhoto] = useState<string>("");

  // Pre-convert images to base64 when modal opens
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
        "https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg";

      const [convertedMemories, convertedGrad] = await Promise.all([
        Promise.all(memoryUrls.slice(0, 4).map((u) => fetchImageAsBase64(u))),
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

  const handleExport = async () => {
    if (!exportCardRef.current || isExporting) return;

    try {
      setIsExporting(true);
      setExportStep("Đang chuẩn bị hình ảnh độ nét cao...");

      // Small delay for canvas rendering stability
      await new Promise((r) => setTimeout(r, 200));

      setExportStep("Đang kết xuất ảnh thiệp mời 1080×1920...");

      const dataUrl = await toPng(exportCardRef.current, {
        cacheBust: true,
        pixelRatio: 1,
        width: 1080,
        height: 1920,
        quality: 0.95,
      });

      setDownloadUrl(dataUrl);
      setExportStep("Đã hoàn tất!");

      // Automatic trigger download
      const cleanGuestName = guestName
        .trim()
        .replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, "_");
      const filename = `Thiep_Moi_Gia_Yen_${cleanGuestName}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
      alert("Không thể xuất ảnh lúc này. Bạn có thể chụp ảnh màn hình lưu lại nhé!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#24050B]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFDF9] border border-[#D1BBA2] shadow-2xl p-6 sm:p-8 flex flex-col items-center max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF5EE] hover:bg-[#FAF5EE]/70 border border-[#D1BBA2] text-[#540F1B] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#540F1B]/10 text-[#540F1B] font-serif text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7D1A2A]" />
            Story & Wallpaper Card
          </div>
          <h3 className="mt-2 text-2xl font-serif font-bold text-[#3B0A13]">
            Tải Ảnh Thiệp Mời Của Én
          </h3>
          <p className="mt-1 text-xs text-[#7D1A2A] font-serif italic">
            Định dạng ảnh dọc 1080×1920 sắc nét, hoàn hảo để lưu làm kỷ niệm hoặc chia sẻ Story!
          </p>
        </div>

        {/* Preview Container */}
        <div className="relative w-full aspect-[9/16] max-w-[240px] rounded-2xl overflow-hidden border-2 border-[#540F1B]/30 shadow-lg bg-[#3B0A13] flex items-center justify-center my-2">
          {downloadUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={downloadUrl}
              alt="Thiệp mời hoàn thiện"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-[#FAF5EE]">
              <ImageIcon className="w-8 h-8 text-[#D1BBA2] mb-2" />
              <p className="text-xs font-serif font-medium">
                Thiệp Mời Lê Gia Yến
              </p>
              <p className="text-[10px] text-[#FAF5EE]/70 font-serif italic mt-0.5">
                Dành riêng cho {guestName}
              </p>
            </div>
          )}
        </div>

        {/* Progress status */}
        {isExporting && (
          <div className="mt-3 flex items-center gap-2 text-xs font-serif text-[#540F1B]">
            <Loader2 className="w-4 h-4 animate-spin text-[#7D1A2A]" />
            <span>{exportStep}</span>
          </div>
        )}

        {/* Download Success notice */}
        {downloadUrl && !isExporting && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-serif text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ảnh đã được tạo thành công!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 w-full flex flex-col gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6B1724] to-[#420A14] text-[#FAF5EE] font-serif font-semibold text-sm shadow-md hover:shadow-xl hover:from-[#7D1A2A] hover:to-[#540F1B] transition-all disabled:opacity-60 cursor-pointer"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang tạo ảnh chất lượng cao...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{downloadUrl ? "Tải lại ảnh về máy" : "Tạo & Tải ảnh thiệp mời"}</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#7D1A2A] font-serif text-center mt-1">
            * Nếu dùng iPhone hoặc Android, bạn có thể nhấn giữ ảnh đã tải để lưu vào Thư viện.
          </p>
        </div>

        {/* Hidden 1080x1920 Export Target Container (rendered offscreen) */}
        <div
          style={{
            position: "fixed",
            left: "-99999px",
            top: "-99999px",
            width: "1080px",
            height: "1920px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          <GiaYenInvitationExportCard
            ref={exportCardRef}
            guestName={guestName}
            settings={settings}
            resolvedMemoryPhotos={base64MemoryPhotos}
            resolvedGraduatePhoto={base64GraduatePhoto}
          />
        </div>

      </div>
    </div>
  );
}
