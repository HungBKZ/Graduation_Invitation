import crypto from "crypto";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "./constants";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hungpth2026";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "pth-grad-super-secret-key-salt-2026";

// Rate limiting in-memory store for failed login attempts
const failedAttempts = new Map<string, { count: number; lockUntil: number }>();

export function checkLoginRateLimit(ipKey: string): {
  allowed: boolean;
  remainingSeconds?: number;
} {
  const now = Date.now();
  const entry = failedAttempts.get(ipKey);
  if (!entry) return { allowed: true };

  if (entry.lockUntil > now) {
    return {
      allowed: false,
      remainingSeconds: Math.ceil((entry.lockUntil - now) / 1000),
    };
  }

  // Lock expired, reset
  if (entry.lockUntil <= now && entry.lockUntil > 0) {
    failedAttempts.delete(ipKey);
  }
  return { allowed: true };
}

export function recordFailedLogin(ipKey: string) {
  const now = Date.now();
  const entry = failedAttempts.get(ipKey) || { count: 0, lockUntil: 0 };
  entry.count += 1;
  // If failed >= 5 times, lock for 3 minutes
  if (entry.count >= 5) {
    entry.lockUntil = now + 3 * 60 * 1000;
  }
  failedAttempts.set(ipKey, entry);
}

export function resetLoginAttempts(ipKey: string) {
  failedAttempts.delete(ipKey);
}

// Generate signed session token
function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString("hex");
  const data = `${timestamp}:${random}`;
  const hmac = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("hex");
  return `${data}.${hmac}`;
}

// Verify signed session token
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("hex");

  if (signature !== expectedSig) return false;

  // Check 7 days expiration
  const [timestamp] = data.split(":");
  const createdTime = parseInt(timestamp, 10);
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  if (isNaN(createdTime) || Date.now() - createdTime > maxAge) {
    return false;
  }

  return true;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function setAdminSession() {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(sessionToken);
}

export async function requireAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("Unauthorized: Admin session required");
  }
}
