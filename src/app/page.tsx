import Link from "next/link";
import { getEventSettings } from "@/lib/db";
import { MonogramSeal } from "@/components/MonogramSeal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Calendar, GraduationCap, MapPin, Sparkles, KeyRound } from "lucide-react";
import { ADMIN_ROUTE } from "@/lib/constants";

export default async function HomePage() {
  const settings = await getEventSettings();

  return (
    <div className="min-h-screen bg-[#0B1930] text-[#F6F1E8] flex flex-col justify-between items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#172A46]/40 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#D6B675_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      </div>

      {/* Header Monogram */}
      <header className="relative z-10 flex flex-col items-center text-center mt-6">
        <MonogramSeal size={90} className="mb-4 drop-shadow-2xl" />
        <span className="text-xs tracking-[0.35em] text-[#D6B675] uppercase font-sans font-semibold">
          Graduation Celebration · 2026
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F1E8] mt-3 gold-gradient-text">
          {settings.graduate_name}
        </h1>
        <p className="text-xs sm:text-sm text-[#9DAABD] tracking-wider uppercase font-sans mt-2">
          {settings.major} · {settings.cohort}
        </p>
      </header>

      {/* Main Info Card */}
      <main className="relative z-10 w-full max-w-xl navy-card rounded-2xl p-6 sm:p-10 my-8 text-center gold-border-corner">
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-[#F6F1E8]/90 font-sans max-w-md mx-auto mb-6">
          <p className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-[#D6B675]" />
            <span>Chủ nhật, ngày 25 tháng 10 năm 2026</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#D6B675]" />
            <span>{settings.university}</span>
          </p>
        </div>

        <CountdownTimer
          eventDate={settings.event_date}
          eventStartTime={settings.event_start_time}
        />

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B675] to-transparent mx-auto my-6" />

        <div className="space-y-3">
          <p className="text-xs text-[#9DAABD] font-light leading-relaxed">
            Trang web sử dụng liên kết cá nhân hóa cho từng khách mời với phong bì thư tương tác độc quyền.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/i/demoMinhAnh"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(214,182,117,0.3)] hover:shadow-[0_6px_25px_rgba(214,182,117,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Xem Thư Mời Mẫu (Demo)</span>
            </Link>

            <Link
              href={ADMIN_ROUTE}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#172A46] border border-[#D6B675]/40 text-[#D6B675] hover:bg-[#1E365A] font-sans text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Bảng Quản Trị</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-[#9DAABD]/70 font-sans pb-4">
        <p>The Graduation of Phan Thành Hưng · FPT University Can Tho Campus</p>
      </footer>
    </div>
  );
}
