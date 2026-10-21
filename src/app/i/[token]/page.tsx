import { Metadata } from "next";
import { getEventSettings, getGuestByToken } from "@/lib/db";
import { ClientGuestPage } from "./ClientGuestPage";
import { MonogramSeal } from "@/components/MonogramSeal";
import { AlertCircle } from "lucide-react";

interface GuestPageProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: GuestPageProps): Promise<Metadata> {
  const { token } = await params;
  const guest = await getGuestByToken(token);

  if (!guest) {
    return {
      title: "Thư Mời Không Tìm Thấy | Graduation Invitation",
      robots: { index: false, follow: false },
    };
  }

  const isGiaYen = guest.host_id === "gia_yen" || guest.invitation_token.startsWith("gy-");
  const hostName = isGiaYen ? "Lê Gia Yến (Én)" : "Phan Thành Hưng";
  const university = isGiaYen ? "Trường Đại học Cần Thơ" : "Trường Đại học FPT Cần Thơ";

  return {
    title: `Thư Mời Tốt Nghiệp dành cho ${guest.name} | The Graduation of ${hostName}`,
    description: `Trân trọng kính mời ${guest.name} đến tham dự lễ tốt nghiệp của ${hostName} tại ${university}.`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `The Graduation of ${hostName}`,
      description: `A special milestone — ${university}.`,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function GuestPage({ params }: GuestPageProps) {
  const { token } = await params;
  const guest = await getGuestByToken(token);

  const profileId =
    guest?.host_id === "gia_yen" || token.startsWith("gy-")
      ? "gia_yen"
      : "default";

  const settings = await getEventSettings(profileId);

  // Polished luxury error state if token is invalid or guest is inactive
  if (!guest || !guest.is_active) {
    const isGiaYenToken = token.startsWith("gy-");
    const hostName = isGiaYenToken ? "Lê Gia Yến" : "Phan Thành Hưng";
    const uniName = isGiaYenToken ? "Can Tho University · 2026" : "FPT University Can Tho · 2026";

    return (
      <div className="min-h-screen bg-[#FAF6F0] text-[#1E2530] flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 flex flex-col items-center border border-[#EADBCE] shadow-[0_15px_45px_rgba(158,27,50,0.06)]">
          <MonogramSeal size={80} className="mb-6 drop-shadow-md" />

          <div className="w-12 h-12 rounded-full bg-[#FFF5F5] border border-[#FEB2B2] flex items-center justify-center text-[#C53030] mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-[#7D1124] mb-2">
            Liên Kết Không Khả Dụng
          </h1>

          <p className="text-sm text-[#718096] font-sans leading-relaxed mb-6">
            Đường dẫn thư mời này không tồn tại, đã hết hạn hoặc đã được thu hồi.
            Vui lòng liên hệ trực tiếp với {hostName} để nhận đường dẫn chính xác.
          </p>

          <div className="pt-4 border-t border-[#EADBCE] w-full flex flex-col items-center">
            <p className="text-xs text-[#718096] uppercase tracking-widest font-sans">
              The Graduation of {hostName}
            </p>
            <p className="text-xs text-[#9E1B32] font-serif font-bold mt-1">
              {uniName}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ClientGuestPage guest={guest} settings={settings} />;
}
