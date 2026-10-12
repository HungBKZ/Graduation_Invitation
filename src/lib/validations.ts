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
});

export const updateGuestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Tên khách mời không được để trống").max(100),
});

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
  graduate_photo_url: z.string().url().or(z.literal("")).nullable().optional(),
  background_music_url: z.string().url().or(z.literal("")).nullable().optional(),
  invitation_message: z.string().min(1),
  thank_you_message: z.string().min(1),
});
