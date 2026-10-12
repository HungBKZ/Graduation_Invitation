import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "The Graduation of Phan Thành Hưng | FPT University Can Tho",
  description:
    "Trân trọng kính mời bạn tham dự lễ tốt nghiệp của Phan Thành Hưng - Kỹ thuật phần mềm K18, Trường Đại học FPT Cần Thơ.",
  openGraph: {
    title: "The Graduation of Phan Thành Hưng",
    description:
      "A special milestone — Software Engineering K18, FPT University Can Tho Campus.",
    url: "https://graduation-invitation.fpt.edu.vn",
    siteName: "The Graduation of Phan Thành Hưng",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0B1930] text-[#F6F1E8] font-sans selection:bg-[#D6B675] selection:text-[#0B1930] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
