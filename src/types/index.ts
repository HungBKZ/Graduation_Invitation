export type RsvpStatus = "attending" | "maybe" | "declined";

export interface Guest {
  id: string;
  name: string;
  invitation_token: string;
  is_active: boolean;
  created_at: string;
  first_opened_at: string | null;
  rsvp?: RsvpResponse | null;
}

export interface RsvpResponse {
  id: string;
  guest_id: string;
  response_status: RsvpStatus;
  personal_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventSettings {
  id: string;
  graduate_name: string;
  major: string;
  cohort: string;
  university: string;
  event_date: string;
  event_start_time: string | null;
  guest_meeting_time: string | null;
  location_name: string;
  maps_url: string | null;
  graduate_photo_url: string | null;
  background_music_url: string | null;
  invitation_message: string;
  thank_you_message: string;
  updated_at: string;
}

export interface OverviewStats {
  totalInvitations: number;
  openedInvitations: number;
  confirmedAttendance: number;
  maybeAttending: number;
  declinedInvitations: number;
  pendingResponses: number;
}
