import { z } from "zod";

export const rsvpSchema = z.object({
  token: z.string().min(1, "Mã thư mời không hợp lệ"),
  status: z.enum(["attending", "maybe", "declined"], {
    error: "Vui lòng chọn trạng thái tham dự hợp lệ",
  }),
  message: z.string().max(1000, "Lời nhắn tối đa 1000 ký tự").optional().nullable(),
});

export const addGuestSchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên khách mời")
    .max(100, "Tên khách mời không được quá 100 ký tự"),
  host_id: z.enum(["thanh_hung", "gia_yen"]).optional().default("thanh_hung"),
});

export const updateGuestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Tên khách mời không được để trống").max(100),
  host_id: z.enum(["thanh_hung", "gia_yen"]).optional(),
});

// Accepts absolute http(s) URLs or site-relative paths like /uploads/photo.png
const mediaUrl = (message: string) =>
  z
    .string()
    .refine((v) => v.startsWith("/") || /^https?:\/\//i.test(v), message);

export const eventSettingsSchema = z.object({
  graduate_name: z.string().min(1),
  major: z.string().min(1),
  cohort: z.string().min(1),
  university: z.string().min(1),
  event_date: z.string().min(1),
  event_start_time: z.string().nullable().optional(),
  guest_meeting_time: z.string().nullable().optional(),
  location_name: z.string().min(1),
  maps_url: z.string().url("Đường dẫn Google Maps không hợp lệ").or(z.literal("")).nullable().optional(),
  graduate_photo_url: mediaUrl("Đường dẫn ảnh không hợp lệ").or(z.literal("")).nullable().optional(),
  background_music_url: mediaUrl("Đường dẫn nhạc không hợp lệ").or(z.literal("")).nullable().optional(),
  memory_photo_urls: z
    .array(mediaUrl("Đường dẫn ảnh kỷ niệm không hợp lệ"))
    .max(20, "Tối đa 20 ảnh kỷ niệm")
    .optional(),
  invitation_message: z.string().min(1),
  thank_you_message: z.string().min(1),
  contact_phone: z.string().nullable().optional(),
  assistant_phone: z.string().nullable().optional(),
  parking_guide: z.string().nullable().optional(),
  theme_style: z.string().nullable().optional(),
});
