-- ====================================================================
-- SUPABASE MIGRATION: DUAL-GRADUATE PROFILES (Phan Thành Hưng & Lê Gia Yến)
-- ====================================================================

-- 1. Bổ sung cột host_id vào bảng guests nếu chưa có
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS host_id TEXT DEFAULT 'thanh_hung';

-- Tạo index để truy vấn nhanh theo host_id
CREATE INDEX IF NOT EXISTS idx_guests_host_id ON guests(host_id);

-- Cập nhật các khách mời đã có sẵn (hoặc có token bắt đầu bằng 'gy-')
UPDATE guests 
SET host_id = 'gia_yen' 
WHERE invitation_token LIKE 'gy-%';

UPDATE guests 
SET host_id = 'thanh_hung' 
WHERE host_id IS NULL;

-- 2. Mở rộng bảng event_settings để hỗ trợ các trường nâng cao
ALTER TABLE event_settings 
ADD COLUMN IF NOT EXISTS host_id TEXT DEFAULT 'thanh_hung',
ADD COLUMN IF NOT EXISTS theme_style TEXT DEFAULT 'crimson_gold',
ADD COLUMN IF NOT EXISTS dress_code TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS assistant_phone TEXT,
ADD COLUMN IF NOT EXISTS parking_guide TEXT;

-- 3. Tạo hoặc chèn profile mặc định cho Lê Gia Yến (profile id = 'gia_yen')
INSERT INTO event_settings (
  id,
  graduate_name,
  graduate_title,
  university_name,
  major_name,
  ceremony_date,
  ceremony_start_time,
  ceremony_end_time,
  reception_start_time,
  venue_name,
  venue_room,
  venue_address,
  google_maps_url,
  invitation_message,
  thank_you_message,
  graduate_photo_url,
  memory_photo_urls,
  music_url,
  music_title,
  music_artist,
  host_id,
  theme_style,
  contact_phone,
  assistant_phone,
  parking_guide,
  created_at,
  updated_at
) VALUES (
  'gia_yen',
  'Lê Gia Yến',
  'Cử nhân',
  'Trường Đại học Cần Thơ',
  'Tài chính - Ngân hàng',
  '2026-11-02',
  '11:00',
  '13:30',
  '11:00',
  'Hội trường Rùa, Trường Đại học Cần Thơ',
  'Hội trường Rùa (Khu II)',
  'Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều, TP. Cần Thơ',
  'https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI',
  'Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện. Én rất mong được gặp bạn trong ngày này!',
  'Cảm ơn bạn đã luôn đồng hành, yêu thương và ủng hộ Én trong suốt chặng đường đại học tuyệt đẹp này.',
  'https://res.cloudinary.com/dvucotc8z/image/upload/v1792589960/DainXinkDep_imj1fp.jpg',
  ARRAY[
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177808_2062798856725247085_2062798856725247085_8601190c8537a65cef01d7c55acffb7c_j2ydir.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177768_2062798856725247085_2062798856725247085_b132dfe12214de9cec87bd803b71f891_przkz3.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177799_2062798856725247085_2062798856725247085_d7699ede8dad4f9ccfe6bf6fe9e0473c_fiurg4.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177755_2062798856725247085_2062798856725247085_2f7902d8479e000f0ea5175cf5ea1385_tvttmm.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177789_2062798856725247085_2062798856725247085_32b0a1d48c9df4f713aa67123aa12bb4_znqwpg.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590231/1792590177816_2062798856725247085_2062798856725247085_eb4f4cb333a4c4832c32cf984a9561cf_lkujou.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590232/1792590177823_2062798856725247085_2062798856725247085_fb9b486241a27e7f6e30a58a74cb9a61_i5cygd.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590409/1792590383980_2062798856725247085_2062798856725247085_61c77f09c2a8f897f2674e7cfdfbca1a_xlwlfn.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792590415/1792590399888_2062798856725247085_2062798856725247085_3d6bb6b7e8006e12eecfe8bc0ae22fdc_jzyfrf.jpg'
  ],
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  'Golden Hour Romance',
  'Acoustic Strings',
  'gia_yen',
  'burgundy_romance',
  '0907 612 060',
  '0772 967 049',
  'Đi từ Cổng B vào 50m bên tay trái là Hội trường Rùa. Bãi gửi xe tại Tòa ATL (tòa nhà bên trái cổng B) hoặc đối diện Hội trường.',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  graduate_name = EXCLUDED.graduate_name,
  graduate_title = EXCLUDED.graduate_title,
  university_name = EXCLUDED.university_name,
  major_name = EXCLUDED.major_name,
  ceremony_date = EXCLUDED.ceremony_date,
  ceremony_start_time = EXCLUDED.ceremony_start_time,
  venue_name = EXCLUDED.venue_name,
  google_maps_url = EXCLUDED.google_maps_url,
  graduate_photo_url = EXCLUDED.graduate_photo_url,
  memory_photo_urls = EXCLUDED.memory_photo_urls,
  theme_style = 'burgundy_romance',
  contact_phone = EXCLUDED.contact_phone,
  assistant_phone = EXCLUDED.assistant_phone,
  parking_guide = EXCLUDED.parking_guide,
  updated_at = NOW();
