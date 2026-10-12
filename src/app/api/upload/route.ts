import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  // 1. Require admin authentication
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { error: "Unauthorized: Admin session required" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 2. Validate MIME type
    const validMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/x-m4a",
    ];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: "Định dạng file không được hỗ trợ (chỉ chấp nhận ảnh PNG/JPEG/WebP hoặc audio MP3/WAV)" },
        { status: 400 }
      );
    }

    // 3. Validate size (Max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Kích thước file vượt quá 20MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize extension and name
    const ext = path.extname(file.name) || (file.type.startsWith("image/") ? ".png" : ".mp3");
    const safeHash = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}-${safeHash}${ext}`;

    // 4. Try uploading to Supabase Storage if configured
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const bucket = "graduation-media";
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
          filename,
        });
      }
      console.warn("Supabase storage upload failed, falling back to local:", error?.message);
    }

    // 5. Local storage upload fallback for development
    if (process.env.NODE_ENV === "production" && !isSupabaseConfigured) {
      return NextResponse.json(
        {
          error:
            "Không thể lưu trữ file: Cần cấu hình Supabase Storage trong môi trường production.",
        },
        { status: 500 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Lỗi xử lý file tải lên";
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
