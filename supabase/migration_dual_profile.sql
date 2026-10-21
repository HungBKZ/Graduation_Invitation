-- ====================================================================
-- SUPABASE MIGRATION: DUAL-GRADUATE PROFILES (Phan Thành Hưng & Lê Gia Yến)
-- ====================================================================

-- 1. Bổ sung cột host_id vào bảng guests nếu chưa có
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS host_id TEXT DEFAULT 'thanh_hung';

-- Tạo index để truy vấn nhanh theo host_id
CREATE INDEX IF NOT EXISTS idx_guests_host_id ON guests(host_id);

-- Gán host_id cho các khách đã có sẵn
UPDATE guests 
SET host_id = 'gia_yen' 
WHERE invitation_token LIKE 'gy-%';

UPDATE guests 
SET host_id = 'thanh_hung' 
WHERE host_id IS NULL;

-- 2. Bổ sung các cột mở rộng cho bảng event_settings nếu chưa có
ALTER TABLE event_settings 
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS assistant_phone TEXT,
ADD COLUMN IF NOT EXISTS parking_guide TEXT,
ADD COLUMN IF NOT EXISTS theme_style TEXT DEFAULT 'crimson_gold';

-- 3. Chèn / Cập nhật hồ sơ sự kiện của Lê Gia Yến (id = 'gia_yen')
INSERT INTO event_settings (
  id,
  graduate_name,
  major,
  cohort,
  university,
  event_date,
  event_start_time,
  guest_meeting_time,
  location_name,
  maps_url,
  graduate_photo_url,
  background_music_url,
  memory_photo_urls,
  invitation_message,
  thank_you_message,
  contact_phone,
  assistant_phone,
  parking_guide,
  theme_style,
  updated_at
) VALUES (
  'gia_yen',
  'Lê Gia Yến',
  'Tài chính - Ngân hàng',
  'Khóa 48',
  'Trường Đại học Cần Thơ',
  '2026-11-02',
  '11:00',
  '11:00 AM',
  'Hội trường Rùa - Trường Đại học Cần Thơ (Khu II, đường 3 Tháng 2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ)',
  'https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI',
  'https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg',
  'https://res.cloudinary.com/dvucotc8z/video/upload/v1792599404/Joe_Hisaishi_-_Merry-Go-Round_of_Life_from_Howls_Moving_Castle_hkdl0h.mp3',
  ARRAY[
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/TrungTuyen_hln3pz.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/Bainhomdautien_w0c6ym.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/ghetTriet_xihy7g.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/HoaAn_d7nzjl.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595609/KienTap_t0ojou.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/NCKH_p6diow.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595611/BaoCaoLuan_rrr9gp.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595609/MuaHeXanh_fd7m5b.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595609/ThiBaoHiem_kprsbh.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595610/HoiTrai_epwkk3.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595609/HoanThanhBaoCao_hvwmt1.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792595609/DiChoiXaNhe_b5ezui.jpg'
  ],
  'Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện. Én rất mong được gặp bạn trong ngày này!',
  'Mỗi cột mốc đều ý nghĩa hơn khi được chia sẻ cùng những người mình thương.\n\nCảm ơn bạn đã luôn là một phần tuyệt vời trong hành trình thanh xuân của Én.',
  '0907 612 060',
  '0772 967 049',
  'Đi từ Cổng B vào 50m bên tay trái là Hội trường Rùa. Bãi gửi xe tại Tòa ATL (tòa nhà bên trái cổng B) hoặc đối diện Hội trường.',
  'burgundy_romance',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  graduate_name = EXCLUDED.graduate_name,
  major = EXCLUDED.major,
  cohort = EXCLUDED.cohort,
  university = EXCLUDED.university,
  event_date = EXCLUDED.event_date,
  event_start_time = EXCLUDED.event_start_time,
  guest_meeting_time = EXCLUDED.guest_meeting_time,
  location_name = EXCLUDED.location_name,
  maps_url = EXCLUDED.maps_url,
  graduate_photo_url = EXCLUDED.graduate_photo_url,
  background_music_url = EXCLUDED.background_music_url,
  memory_photo_urls = EXCLUDED.memory_photo_urls,
  invitation_message = EXCLUDED.invitation_message,
  thank_you_message = EXCLUDED.thank_you_message,
  contact_phone = EXCLUDED.contact_phone,
  assistant_phone = EXCLUDED.assistant_phone,
  parking_guide = EXCLUDED.parking_guide,
  theme_style = EXCLUDED.theme_style,
  updated_at = NOW();

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

