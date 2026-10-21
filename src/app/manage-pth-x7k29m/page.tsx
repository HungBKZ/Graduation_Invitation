import { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { getAllGuests, getEventSettings, getOverviewStats } from "@/lib/db";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Graduation of Phan Thành Hưng",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <AdminLoginForm />;
  }

  const [guests, settings, stats] = await Promise.all([
    getAllGuests("thanh_hung"),
    getEventSettings("default"),
    getOverviewStats("thanh_hung"),
  ]);

  return (
    <AdminDashboard
      initialGuests={guests}
      initialSettings={settings}
      initialStats={stats}
      isSupabase={isSupabaseConfigured}
    />
  );
}
