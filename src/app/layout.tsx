import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro, Dancing_Script } from "next/font/google";
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

const dancingScript = Dancing_Script({
  variable: "--font-handwriting",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["500", "600", "700"],
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
      className={`${beVietnamPro.variable} ${playfair.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAF6F0] text-[#1E2530] font-sans selection:bg-[#9E1B32] selection:text-[#FAF6F0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
