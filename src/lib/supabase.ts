import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && (supabaseServiceKey || supabaseAnonKey)
);

// Server-side admin client using service role key (or fallback to anon key)
export const getSupabaseServerClient = () => {
  if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
