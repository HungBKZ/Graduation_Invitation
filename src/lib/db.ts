import fs from "fs";
import path from "path";
import {
  EventSettings,
  Guest,
  OverviewStats,
  RsvpResponse,
  RsvpStatus,
} from "@/types";
import { DEFAULT_EVENT_SETTINGS } from "./constants";
import { generateInvitationToken } from "./token";
import { getSupabaseServerClient, isSupabaseConfigured } from "./supabase";

interface StoreData {
  eventSettings: EventSettings;
  guests: Guest[];
  rsvps: Record<string, RsvpResponse>; // keyed by guest_id
}

interface SupabaseGuestRow {
  id: string;
  name: string;
  invitation_token: string;
  is_active: boolean;
  created_at: string;
  first_opened_at: string | null;
  rsvp_responses?: RsvpResponse | RsvpResponse[] | null;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

/**
 * Validates database environment.
 * In production, Supabase credentials MUST be present unless explicitly running
 * local storage mode with ENABLE_LOCAL_STORAGE=true.
 */
function assertDatabaseConfig(isMutation: boolean = false) {
  if (isSupabaseConfigured) {
    return;
  }

  // If local storage is explicitly enabled (e.g. local development)
  if (process.env.ENABLE_LOCAL_STORAGE === "true") {
    return;
  }

  if (process.env.NODE_ENV === "production") {
    if (isMutation) {
      throw new Error(
        "LỖI CƠ SỞ DỮ LIỆU: Supabase chưa được cấu hình trong môi trường Production. " +
          "Vui lòng thiết lập NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY."
      );
    }
    // For non-mutation build-time prerendering when Supabase credentials are not yet linked:
    return;
  }
}

// Ensure local file-store exists (development only)
function getLocalStore(): StoreData {
  assertDatabaseConfig();

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const initialData: StoreData = {
      eventSettings: { ...DEFAULT_EVENT_SETTINGS },
      guests: [
        {
          id: "g-demo-1",
          name: "Nguyễn Minh Anh",
          invitation_token: "demoMinhAnh",
          is_active: true,
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          first_opened_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: "g-demo-2",
          name: "Trần Gia Bảo",
          invitation_token: "demoGiaBao",
          is_active: true,
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          first_opened_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
        {
          id: "g-demo-3",
          name: "Lê Ngọc Hân",
          invitation_token: "demoNgocHan",
          is_active: true,
          created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
          first_opened_at: null,
        },
      ],
      rsvps: {
        "g-demo-1": {
          id: "r-demo-1",
          guest_id: "g-demo-1",
          response_status: "attending",
          personal_message:
            "Chúc mừng tân kỹ sư phần mềm Phan Thành Hưng! Rất vui được đến chung vui cùng Hưng.",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        "g-demo-2": {
          id: "r-demo-2",
          guest_id: "g-demo-2",
          response_status: "maybe",
          personal_message: "Mình sẽ cố gắng thu xếp công việc để có mặt nha!",
          created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
      },
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw) as StoreData;
  } catch {
    return {
      eventSettings: { ...DEFAULT_EVENT_SETTINGS },
      guests: [],
      rsvps: {},
    };
  }
}

function saveLocalStore(data: StoreData) {
  assertDatabaseConfig(true);
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ==========================================
// UNIFIED DATABASE PERSISTENCE API
// ==========================================

export async function getEventSettings(): Promise<EventSettings> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("event_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error) {
      // If table exists but row not seeded yet, seed default
      if (error.code === "PGRST116") {
        await supabase.from("event_settings").insert({
          ...DEFAULT_EVENT_SETTINGS,
        });
        return DEFAULT_EVENT_SETTINGS;
      }
      throw new Error(`Lỗi tải cài đặt sự kiện từ Supabase: ${error.message}`);
    }

    if (data) return data as EventSettings;
  }

  const store = getLocalStore();
  return store.eventSettings;
}

export async function updateEventSettings(
  updates: Partial<EventSettings>
): Promise<EventSettings> {
  const supabase = getSupabaseServerClient();
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("event_settings")
      .upsert({ id: "default", ...updatedData })
      .select()
      .single();

    if (error) {
      throw new Error(`Lỗi cập nhật cài đặt sự kiện trên Supabase: ${error.message}`);
    }

    return data as EventSettings;
  }

  const store = getLocalStore();
  store.eventSettings = {
    ...store.eventSettings,
    ...updatedData,
  };
  saveLocalStore(store);
  return store.eventSettings;
}

export async function getGuestByToken(token: string): Promise<Guest | null> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data: guestData, error: guestError } = await supabase
      .from("guests")
      .select("*, rsvp_responses(*)")
      .eq("invitation_token", token)
      .eq("is_active", true)
      .single();

    if (guestError) {
      if (guestError.code === "PGRST116") {
        // Record not found
        return null;
      }
      throw new Error(`Lỗi truy vấn thư mời từ Supabase: ${guestError.message}`);
    }

    if (guestData) {
      const rsvp = Array.isArray(guestData.rsvp_responses)
        ? guestData.rsvp_responses[0]
        : guestData.rsvp_responses;
      return {
        id: guestData.id,
        name: guestData.name,
        invitation_token: guestData.invitation_token,
        is_active: guestData.is_active,
        created_at: guestData.created_at,
        first_opened_at: guestData.first_opened_at,
        rsvp: rsvp || null,
      };
    }
    return null;
  }

  const store = getLocalStore();
  const guest = store.guests.find(
    (g) => g.invitation_token === token && g.is_active
  );
  if (!guest) return null;

  return {
    ...guest,
    rsvp: store.rsvps[guest.id] || null,
  };
}

export async function markGuestOpened(token: string): Promise<void> {
  const now = new Date().toISOString();
  const supabase = getSupabaseServerClient();
  if (supabase) {
    // Only update if first_opened_at is null
    const { error } = await supabase
      .from("guests")
      .update({ first_opened_at: now })
      .eq("invitation_token", token)
      .is("first_opened_at", null);

    if (error) {
      console.error("Lỗi cập nhật thời điểm mở thư trên Supabase:", error.message);
    }
    return;
  }

  const store = getLocalStore();
  const guest = store.guests.find((g) => g.invitation_token === token);
  if (guest && !guest.first_opened_at) {
    guest.first_opened_at = now;
    saveLocalStore(store);
  }
}

export async function saveRsvp(
  guestId: string,
  status: RsvpStatus,
  personalMessage?: string | null
): Promise<RsvpResponse> {
  const now = new Date().toISOString();
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("rsvp_responses")
      .upsert(
        {
          guest_id: guestId,
          response_status: status,
          personal_message: personalMessage?.trim() || null,
          updated_at: now,
        },
        { onConflict: "guest_id" }
      )
      .select()
      .single();

    if (error) {
      throw new Error(`Lỗi lưu phản hồi RSVP trên Supabase: ${error.message}`);
    }
    return data as RsvpResponse;
  }

  const store = getLocalStore();
  const existing = store.rsvps[guestId];
  const rsvp: RsvpResponse = {
    id: existing?.id || `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    guest_id: guestId,
    response_status: status,
    personal_message: personalMessage?.trim() || null,
    created_at: existing?.created_at || now,
    updated_at: now,
  };

  store.rsvps[guestId] = rsvp;
  saveLocalStore(store);
  return rsvp;
}

export async function getAllGuests(): Promise<Guest[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("guests")
      .select("*, rsvp_responses(*)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Lỗi tải danh sách khách mời từ Supabase: ${error.message}`);
    }

    if (data) {
      return (data as unknown as SupabaseGuestRow[]).map((item) => ({
        id: item.id,
        name: item.name,
        invitation_token: item.invitation_token,
        is_active: item.is_active,
        created_at: item.created_at,
        first_opened_at: item.first_opened_at,
        rsvp: Array.isArray(item.rsvp_responses)
          ? item.rsvp_responses[0] || null
          : item.rsvp_responses || null,
      }));
    }
  }

  const store = getLocalStore();
  return store.guests.map((g) => ({
    ...g,
    rsvp: store.rsvps[g.id] || null,
  }));
}

export async function addGuest(name: string): Promise<Guest> {
  const token = generateInvitationToken();
  const now = new Date().toISOString();
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("guests")
      .insert({
        name: name.trim(),
        invitation_token: token,
        is_active: true,
        created_at: now,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Lỗi tạo khách mời trên Supabase: ${error.message}`);
    }
    return { ...data, rsvp: null };
  }

  const store = getLocalStore();
  const newGuest: Guest = {
    id: `g-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    invitation_token: token,
    is_active: true,
    created_at: now,
    first_opened_at: null,
    rsvp: null,
  };
  store.guests.unshift(newGuest);
  saveLocalStore(store);
  return newGuest;
}

export async function updateGuestName(
  id: string,
  name: string
): Promise<Guest> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("guests")
      .update({ name: name.trim() })
      .eq("id", id)
      .select("*, rsvp_responses(*)")
      .single();

    if (error) {
      throw new Error(`Lỗi cập nhật tên trên Supabase: ${error.message}`);
    }
    return {
      ...data,
      rsvp: Array.isArray(data.rsvp_responses)
        ? data.rsvp_responses[0]
        : data.rsvp_responses || null,
    };
  }

  const store = getLocalStore();
  const guest = store.guests.find((g) => g.id === id);
  if (!guest) throw new Error("Khách mời không tồn tại");
  guest.name = name.trim();
  saveLocalStore(store);
  return { ...guest, rsvp: store.rsvps[guest.id] || null };
}

export async function toggleGuestActive(
  id: string,
  isActive: boolean
): Promise<Guest> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("guests")
      .update({ is_active: isActive })
      .eq("id", id)
      .select("*, rsvp_responses(*)")
      .single();

    if (error) {
      throw new Error(`Lỗi thay đổi trạng thái trên Supabase: ${error.message}`);
    }
    return {
      ...data,
      rsvp: Array.isArray(data.rsvp_responses)
        ? data.rsvp_responses[0]
        : data.rsvp_responses || null,
    };
  }

  const store = getLocalStore();
  const guest = store.guests.find((g) => g.id === id);
  if (!guest) throw new Error("Khách mời không tồn tại");
  guest.is_active = isActive;
  saveLocalStore(store);
  return { ...guest, rsvp: store.rsvps[guest.id] || null };
}

export async function deleteGuest(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) {
      throw new Error(`Lỗi xóa khách mời trên Supabase: ${error.message}`);
    }
    return true;
  }

  const store = getLocalStore();
  store.guests = store.guests.filter((g) => g.id !== id);
  delete store.rsvps[id];
  saveLocalStore(store);
  return true;
}

export async function bulkAddGuests(names: string[]): Promise<Guest[]> {
  const now = new Date().toISOString();
  const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
  if (cleanNames.length === 0) return [];

  const createdGuests: Guest[] = cleanNames.map((name) => ({
    id: `g-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    invitation_token: generateInvitationToken(),
    is_active: true,
    created_at: now,
    first_opened_at: null,
    rsvp: null,
  }));

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const rows = createdGuests.map((g) => ({
      name: g.name,
      invitation_token: g.invitation_token,
      is_active: true,
      created_at: now,
    }));

    const { data, error } = await supabase.from("guests").insert(rows).select();
    if (error) {
      throw new Error(`Lỗi tạo hàng loạt trên Supabase: ${error.message}`);
    }
    return ((data || []) as unknown as SupabaseGuestRow[]).map((d) => ({
      ...d,
      rsvp: null,
    }));
  }

  const store = getLocalStore();
  store.guests.unshift(...createdGuests);
  saveLocalStore(store);
  return createdGuests;
}

export async function getOverviewStats(): Promise<OverviewStats> {
  const guests = await getAllGuests();
  const activeGuests = guests.filter((g) => g.is_active);

  const totalInvitations = activeGuests.length;
  const openedInvitations = activeGuests.filter(
    (g) => g.first_opened_at !== null
  ).length;
  const confirmedAttendance = activeGuests.filter(
    (g) => g.rsvp?.response_status === "attending"
  ).length;
  const maybeAttending = activeGuests.filter(
    (g) => g.rsvp?.response_status === "maybe"
  ).length;
  const declinedInvitations = activeGuests.filter(
    (g) => g.rsvp?.response_status === "declined"
  ).length;
  const pendingResponses = activeGuests.filter((g) => !g.rsvp).length;

  return {
    totalInvitations,
    openedInvitations,
    confirmedAttendance,
    maybeAttending,
    declinedInvitations,
    pendingResponses,
  };
}
