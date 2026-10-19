import Link from "next/link";
import { getEventSettings } from "@/lib/db";
import { MonogramSeal } from "@/components/MonogramSeal";
import { GraduationHero } from "@/components/GraduationHero";
import { CeremonyTimeline } from "@/components/CeremonyTimeline";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LocationSection } from "@/components/LocationSection";
import { Calendar, MapPin, Sparkles, KeyRound, Heart } from "lucide-react";
import { ADMIN_ROUTE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getEventSettings();

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E2530] flex flex-col justify-between items-center px-3 sm:px-6 py-8 relative overflow-hidden select-none">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FCEEE2]/70 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#F7E7CE]/50 rounded-full blur-[130px]" />
      </div>

      {/* Main Graduation Hero Poster with Memory Collage & Cutout */}
      <GraduationHero settings={settings} guestName="Bạn & Gia Đình" />

      {/* Quick Navigation Action Card */}
      <div className="relative z-10 w-full max-w-xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 my-6 text-center border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.06)]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#EADBCE] text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Liên Kết Cá Nhân Hóa</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7D1124] mb-2">
          Thư Mời Dành Riêng Cho Từng Khách Mời
        </h3>

        <p className="text-xs sm:text-sm text-[#718096] font-sans leading-relaxed mb-6">
          Mỗi khách mời sẽ nhận được một đường link cá nhân hóa chứa phong bì thư tương tác, thiệp mời riêng biệt và biểu mẫu phản hồi RSVP.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/i/demoMinhAnh"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#9E1B32] hover:bg-[#7D1124] text-white font-sans font-semibold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(158,27,50,0.25)] hover:shadow-[0_6px_25px_rgba(158,27,50,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F3E5C8]" />
            <span>Trải nghiệm Thư Mời Mẫu (Demo)</span>
          </Link>

          <Link
            href={ADMIN_ROUTE}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FAF5EE] border border-[#EADBCE] text-[#7D1124] hover:bg-[#F3E7D5] font-sans text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#9E1B32]" />
            <span>Bảng Quản Trị</span>
          </Link>
        </div>
      </div>

      {/* Official Ceremony Schedule on Homepage */}
      <CeremonyTimeline />

      {/* Countdown Timer */}
      <CountdownTimer
        eventDate={settings.event_date}
        eventStartTime={settings.event_start_time}
      />

      {/* Location Section */}
      <LocationSection settings={settings} />

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-[#A0AEC0] font-sans py-6">
        <p>The Graduation of Phan Thành Hưng · Trường Đại Học FPT Phân Hiệu Cần Thơ</p>
      </footer>
    </div>
  );
}
