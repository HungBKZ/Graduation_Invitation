"use server";

import { revalidatePath } from "next/cache";
import {
  getGuestByToken,
  markGuestOpened,
  saveRsvp,
  addGuest,
  updateGuestName,
  toggleGuestActive,
  deleteGuest,
  bulkAddGuests,
  updateEventSettings,
} from "@/lib/db";
import {
  setAdminSession,
  clearAdminSession,
  requireAuth,
  verifyAdminPassword,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
} from "@/lib/auth";
import {
  rsvpSchema,
  addGuestSchema,
  updateGuestSchema,
  eventSettingsSchema,
} from "@/lib/validations";
import { EventSettings, RsvpStatus } from "@/types";

// GUEST ACTIONS

export async function submitRsvpAction(data: {
  token: string;
  status: RsvpStatus;
  message?: string | null;
}) {
  const parsed = rsvpSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  const guest = await getGuestByToken(parsed.data.token);
  if (!guest || !guest.is_active) {
    return {
      success: false,
      error: "Thư mời không tồn tại hoặc đã bị thu hồi.",
    };
  }

  try {
    const saved = await saveRsvp(
      guest.id,
      parsed.data.status,
      parsed.data.message
    );
    revalidatePath(`/i/${parsed.data.token}`);
    return {
      success: true,
      rsvp: saved,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Không thể lưu phản hồi. Vui lòng thử lại sau.";
    return {
      success: false,
      error: errorMsg,
    };
  }
}

export async function recordEnvelopeOpenAction(token: string) {
  try {
    await markGuestOpened(token);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ADMIN AUTHENTICATION

export async function adminLoginAction(password: string) {
  const ipKey = "admin_login_single_ip";
  const rateLimit = checkLoginRateLimit(ipKey);
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau ${rateLimit.remainingSeconds} giây.`,
    };
  }

  const valid = await verifyAdminPassword(password);
  if (!valid) {
    recordFailedLogin(ipKey);
    return {
      success: false,
      error: "Mật khẩu quản trị viên không chính xác.",
    };
  }

  resetLoginAttempts(ipKey);
  await setAdminSession();
  return { success: true };
}

export async function adminLogoutAction() {
  await clearAdminSession();
  return { success: true };
}

// ADMIN GUEST MUTATIONS

export async function addGuestAction(name: string) {
  await requireAuth();
  const parsed = addGuestSchema.safeParse({ name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  try {
    const guest = await addGuest(parsed.data.name);
    revalidatePath("/manage-pth-x7k29m");
    return { success: true, guest };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Lỗi tạo khách mời";
    return { success: false, error: errorMsg };
  }
}

export async function updateGuestNameAction(id: string, name: string) {
  await requireAuth();
  const parsed = updateGuestSchema.safeParse({ id, name });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  try {
    const updated = await updateGuestName(parsed.data.id, parsed.data.name);
    revalidatePath("/manage-pth-x7k29m");
    return { success: true, guest: updated };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Lỗi cập nhật tên";
    return { success: false, error: errorMsg };
  }
}

export async function toggleGuestActiveAction(id: string, isActive: boolean) {
  await requireAuth();
  try {
    const updated = await toggleGuestActive(id, isActive);
    revalidatePath("/manage-pth-x7k29m");
    return { success: true, guest: updated };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Lỗi cập nhật trạng thái";
    return { success: false, error: errorMsg };
  }
}

export async function deleteGuestAction(id: string) {
  await requireAuth();
  try {
    await deleteGuest(id);
    revalidatePath("/manage-pth-x7k29m");
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Lỗi xóa khách mời";
    return { success: false, error: errorMsg };
  }
}

export async function bulkAddGuestsAction(names: string[]) {
  await requireAuth();
  if (!Array.isArray(names) || names.length === 0) {
    return { success: false, error: "Danh sách tên không hợp lệ" };
  }

  try {
    const created = await bulkAddGuests(names);
    revalidatePath("/manage-pth-x7k29m");
    return { success: true, count: created.length, guests: created };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Lỗi tạo khách hàng loạt";
    return { success: false, error: errorMsg };
  }
}

// ADMIN EVENT SETTINGS

export async function updateSettingsAction(updates: Partial<EventSettings>) {
  await requireAuth();
  const parsed = eventSettingsSchema.partial().safeParse(updates);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  try {
    const updated = await updateEventSettings(parsed.data);
    revalidatePath("/manage-pth-x7k29m");
    revalidatePath("/");
    return { success: true, settings: updated };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Lỗi cập nhật cài đặt";
    return { success: false, error: errorMsg };
  }
}
