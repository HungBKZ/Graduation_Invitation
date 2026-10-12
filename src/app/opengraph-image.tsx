import { ImageResponse } from "next/og";

export const alt = "The Graduation of Phan Thành Hưng";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0B1930",
          padding: "60px 40px",
          position: "relative",
        }}
      >
        {/* Decorative Gold Border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "2px solid rgba(214, 182, 117, 0.4)",
            borderRadius: "20px",
          }}
        />

        {/* Top Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              color: "#D6B675",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            LỄ TỐT NGHIỆP ĐẠI HỌC · 2026
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#9DAABD",
              fontStyle: "italic",
              marginTop: "6px",
            }}
          >
            The Graduation of
          </div>
        </div>

        {/* Center Graduate Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#F6F1E8",
              letterSpacing: "2px",
            }}
          >
            PHAN THÀNH HƯNG
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#D6B675",
              marginTop: "12px",
              letterSpacing: "1px",
            }}
          >
            KỸ THUẬT PHẦN MỀM · KHÓA K18
          </div>
        </div>

        {/* Bottom Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#F6F1E8",
              fontWeight: 600,
            }}
          >
            Chủ nhật, 25 tháng 10 năm 2026
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#9DAABD",
              marginTop: "6px",
            }}
          >
            Trường Đại học FPT Cần Thơ (FPT University Can Tho Campus)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
