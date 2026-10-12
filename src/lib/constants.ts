import { EventSettings } from "@/types";

export const DEFAULT_EVENT_SETTINGS: EventSettings = {
  id: "default",
  graduate_name: "Phan Thành Hưng",
  major: "Kỹ thuật phần mềm (Software Engineering)",
  cohort: "K18",
  university: "Trường Đại học FPT Cần Thơ",
  event_date: "2026-10-25",
  event_start_time: null, // Editable in Admin, do not invent
  guest_meeting_time: null,
  location_name: "Trường Đại học FPT Cần Thơ",
  maps_url: null, // Editable in Admin
  graduate_photo_url: null, // To be uploaded/configured in Admin
  background_music_url: null, // To be uploaded/configured in Admin
  invitation_message:
    "Đến tham dự và chung vui cùng Hưng trong ngày lễ tốt nghiệp — một cột mốc đáng nhớ trên hành trình trưởng thành.\n\nSự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa và trọn vẹn hơn bao giờ hết.",
  thank_you_message:
    "\"Every milestone becomes more meaningful when shared with the people who matter.\"\n\nCảm ơn bạn đã luôn là một phần quý giá trong hành trình thanh xuân và trưởng thành của Hưng.",
  updated_at: new Date().toISOString(),
};

export const ADMIN_ROUTE = "/manage-pth-x7k29m";
export const ADMIN_SESSION_COOKIE = "pth_grad_session_v1";
