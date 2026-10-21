import { EventSettings } from "@/types";

export const DEFAULT_GRADUATE_PHOTO =
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png";

export const DEFAULT_MEMORY_PHOTOS: string[] = [
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792392077668_1870005017028387390_8126173855356861704_e09fb4817c437826a6e8201237f824ad_eelie4.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792392077628_1870005017028387390_8126173855356861704_de52956a7ddc26c86e10c5d20091da77_cqxqo2.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792224923435_1870005017028387390_8126173855356861704_0ac081d21bfc9c2bab25daa8623606cb_e7eidz.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391676813_1870005017028387390_8126173855356861704_ed1d64783f72df4610213fa464b60a37_rgl7ni.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391724917_1870005017028387390_8126173855356861704_6db930a9d1d49c55735cbfe0859909a1_yvgkut.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391745750_1870005017028387390_8126173855356861704_9a4c2a617dd9341f8367441974563327_nbi3jp.jpg",
];

export const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/Ns55iZXUqcW4ZxET7";

export const OFFICIAL_CEREMONY_SCHEDULE = [
  { time: "06:30 - 07:00", title: "Đón khách & Check-in", highlight: true },
  { time: "07:00 - 07:15", title: "Quý Thầy Cô tiến vào khu vực lễ", highlight: false },
  { time: "07:15 - 07:30", title: "Văn nghệ chào mừng", highlight: false },
  { time: "07:30 - 07:50", title: "Chào cờ - Tuyên bố lý do - Giới thiệu đại biểu", highlight: false },
  { time: "07:50 - 08:00", title: "Phát biểu của BGH Trường Đại học FPT Cần Thơ", highlight: false },
  { time: "08:00 - 08:10", title: "Thông qua quyết định tốt nghiệp", highlight: false },
  { time: "08:10 - 08:20", title: "Trao bằng khen sinh viên xuất sắc & rèn luyện", highlight: false },
  { time: "08:20 - 08:25", title: "Trao bằng tốt nghiệp và bằng khen Thủ khoa", highlight: false },
  { time: "08:25 - 08:35", title: "Phát biểu đại diện doanh nghiệp & Tân cử nhân", highlight: false },
  { time: "08:35 - 08:45", title: "Nghi thức tri ân Thầy Cô và Gia đình", highlight: true },
  { time: "08:45 - 08:50", title: "Hòa ca 'FPT Dòng Sông Lời Thề'", highlight: false },
  { time: "09:00 - 11:00", title: "Nghi thức trao bằng tốt nghiệp Tân cử nhân", highlight: true },
  { time: "11:00 - 11:15", title: "Nghi thức tung mũ tốt nghiệp", highlight: true },
  { time: "11:15", title: "Bế mạc lễ & Chụp ảnh kỷ niệm tự do", highlight: true },
];

export const DEFAULT_EVENT_SETTINGS: EventSettings = {
  id: "default",
  graduate_name: "Phan Thành Hưng",
  major: "Kỹ thuật phần mềm (Software Engineering)",
  cohort: "K18",
  university: "Trường Đại học FPT Phân hiệu Cần Thơ",
  event_date: "2026-10-25",
  event_start_time: "06:30",
  guest_meeting_time: "06:30 - 07:00",
  location_name: "Sân vận động - Trường Đại học FPT Phân hiệu Cần Thơ (Số 600 Nguyễn Văn Cừ, P. An Bình, TP. Cần Thơ)",
  maps_url: DEFAULT_MAPS_URL,
  graduate_photo_url: DEFAULT_GRADUATE_PHOTO,
  background_music_url: null, // To be uploaded/configured in Admin
  memory_photo_urls: DEFAULT_MEMORY_PHOTOS,
  invitation_message:
    "Đến tham dự và chung vui cùng Hưng trong ngày lễ tốt nghiệp — một cột mốc đáng nhớ trên hành trình trưởng thành.\n\nSự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa và trọn vẹn hơn bao giờ hết.",
  thank_you_message:
    "Mỗi cột mốc đều ý nghĩa hơn khi được chia sẻ cùng những người mình thương.\n\nCảm ơn bạn đã luôn là một phần tuyệt vời trong hành trình thanh xuân của Hưng.",
  updated_at: new Date().toISOString(),
  theme_style: "crimson_gold",
};

// ==========================================
// LÊ GIA YẾN (OPTION 2: BURGUNDY ROMANCE)
// ==========================================

export const GIA_YEN_GRADUATE_PHOTO =
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg";

export const GIA_YEN_MAPS_URL =
  "https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI";

export const GIA_YEN_MEMORY_PHOTOS: string[] = [
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177808_2062798856725247085_2062798856725247085_8601190c8537a65cef01d7c55acffb7c_j2ydir.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177768_2062798856725247085_2062798856725247085_b132dfe12214de9cec87bd803b71f891_przkz3.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177799_2062798856725247085_2062798856725247085_d7699ede8dad4f9ccfe6bf6fe9e0473c_fiurg4.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177755_2062798856725247085_2062798856725247085_64f77496608a17f4d6da876bfc137b4f_tvttmm.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177789_2062798856725247085_2062798856725247085_c0aef555b27c783f2629e4494a3ac378_znqwpg.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177816_2062798856725247085_2062798856725247085_dfbddae28ed42548e7890e9587c4a78b_lkujou.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590232/1792590177823_2062798856725247085_2062798856725247085_dfc22e0ef5324ab67ad3a33e468f84e7_i5cygd.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590409/1792590383980_2062798856725247085_2062798856725247085_dd550b1ba8e25253153dc93199ae3158_xlwlfn.jpg",
  "https://res.cloudinary.com/dvucotc8z/image/upload/v1792590415/1792590399888_2062798856725247085_2062798856725247085_5e315a099aee79d46893913109838c16_jzyfrf.jpg",
];

export const DEFAULT_GIA_YEN_SETTINGS: EventSettings = {
  id: "gia_yen",
  graduate_name: "Lê Gia Yến",
  major: "Tài chính - Ngân hàng",
  cohort: "Khóa 48",
  university: "Trường Đại học Cần Thơ",
  event_date: "2026-11-02",
  event_start_time: "11:00",
  guest_meeting_time: "11:00 AM",
  location_name: "Hội trường Rùa - Trường Đại học Cần Thơ (Khu II, đường 3 Tháng 2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ)",
  maps_url: GIA_YEN_MAPS_URL,
  graduate_photo_url: GIA_YEN_GRADUATE_PHOTO,
  background_music_url: null,
  memory_photo_urls: GIA_YEN_MEMORY_PHOTOS,
  invitation_message:
    "Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện. Én rất mong được gặp bạn trong ngày này!",
  thank_you_message:
    "Mỗi cột mốc đều ý nghĩa hơn khi được chia sẻ cùng những người mình thương.\n\nCảm ơn bạn đã luôn là một phần tuyệt vời trong hành trình thanh xuân của Én.",
  updated_at: new Date().toISOString(),
  contact_phone: "0907612060",
  assistant_phone: "0772967049",
  parking_guide:
    "Lưu ý: Đi từ cổng B vào 50m bên tay trái là hội trường Rùa, có thể gửi xe tại tòa ATL (cổng B vào tòa nhà bên trái), hoặc gửi xe đối diện hội trường Rùa.",
  theme_style: "burgundy_romance",
};

export const ADMIN_ROUTE = "/manage-pth-x7k29m";
export const ADMIN_SESSION_COOKIE = "pth_grad_session_v1";
