import crypto from "crypto";

// Generates high-entropy, random, non-sequential token like 'a8Kx29PmQ'
export function generateInvitationToken(length: number = 9): string {
  const chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}
