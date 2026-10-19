-- Supabase Database Schema for The Graduation of Phan Thành Hưng
-- Run this script in the Supabase SQL Editor

-- 1. Create event_settings table
CREATE TABLE IF NOT EXISTS event_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  graduate_name TEXT NOT NULL DEFAULT 'Phan Thành Hưng',
  major TEXT NOT NULL DEFAULT 'Kỹ thuật phần mềm (Software Engineering)',
  cohort TEXT NOT NULL DEFAULT 'K18',
  university TEXT NOT NULL DEFAULT 'Trường Đại học FPT Cần Thơ',
  event_date DATE NOT NULL DEFAULT '2026-10-25',
  event_start_time TEXT,
  guest_meeting_time TEXT,
  location_name TEXT NOT NULL DEFAULT 'Trường Đại học FPT Cần Thơ',
  maps_url TEXT,
  graduate_photo_url TEXT,
  background_music_url TEXT,
  memory_photo_urls TEXT[] NOT NULL DEFAULT '{}',
  invitation_message TEXT NOT NULL,
  thank_you_message TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- For databases created before memory photos were added
ALTER TABLE event_settings ADD COLUMN IF NOT EXISTS memory_photo_urls TEXT[] NOT NULL DEFAULT '{}';

-- Seed default event settings
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
  thank_you_message
) VALUES (
  'default',
  'Phan Thành Hưng',
  'Kỹ thuật phần mềm (Software Engineering)',
  'K18',
  'Trường Đại học FPT Cần Thơ',
  '2026-10-25',
  NULL,
  NULL,
  'Trường Đại học FPT Cần Thơ',
  'https://maps.app.goo.gl/Ns55iZXUqcW4ZxET7',
  'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392860/anh_h7bbjo.png',
  NULL,
  ARRAY[
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792392077668_1870005017028387390_8126173855356861704_e09fb4817c437826a6e8201237f824ad_eelie4.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792392077628_1870005017028387390_8126173855356861704_de52956a7ddc26c86e10c5d20091da77_cqxqo2.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392407/1792224923435_1870005017028387390_8126173855356861704_0ac081d21bfc9c2bab25daa8623606cb_e7eidz.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391676813_1870005017028387390_8126173855356861704_ed1d64783f72df4610213fa464b60a37_rgl7ni.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391724917_1870005017028387390_8126173855356861704_6db930a9d1d49c55735cbfe0859909a1_yvgkut.jpg',
    'https://res.cloudinary.com/dvucotc8z/image/upload/v1792392406/1792391745750_1870005017028387390_8126173855356861704_9a4c2a617dd9341f8367441974563327_nbi3jp.jpg'
  ],
  'Đến tham dự và chung vui cùng Hưng trong ngày lễ tốt nghiệp — một cột mốc đáng nhớ trên hành trình trưởng thành.\n\nSự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa và trọn vẹn hơn bao giờ hết.',
  '"Every milestone becomes more meaningful when shared with the people who matter."\n\nCảm ơn bạn đã luôn là một phần quý giá trong hành trình thanh xuân và trưởng thành của Hưng.'
) ON CONFLICT (id) DO NOTHING;

-- 2. Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invitation_token TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_opened_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_guests_token ON guests(invitation_token);
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON guests(created_at DESC);

-- 3. Create rsvp_responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  response_status TEXT NOT NULL CHECK (response_status IN ('attending', 'maybe', 'declined')),
  personal_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_guest_rsvp UNIQUE (guest_id)
);

CREATE INDEX IF NOT EXISTS idx_rsvp_guest_id ON rsvp_responses(guest_id);

-- Enable RLS (Row Level Security)
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Allow public read on event_settings"
  ON event_settings FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on active guests by token"
  ON guests FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow public read on rsvp_responses"
  ON rsvp_responses FOR SELECT
  USING (true);

-- Anonymous update on guests (to update first_opened_at)
CREATE POLICY "Allow guests to record opened timestamp"
  ON guests FOR UPDATE
  USING (is_active = true)
  WITH CHECK (is_active = true);

-- Anonymous insert/update on rsvp
CREATE POLICY "Allow guests to submit RSVP"
  ON rsvp_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow guests to update their RSVP"
  ON rsvp_responses FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Storage bucket creation for media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('graduation-media', 'graduation-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public media access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'graduation-media');
