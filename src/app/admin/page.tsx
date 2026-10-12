import { redirect } from "next/navigation";
import { ADMIN_ROUTE } from "@/lib/constants";

export default function AdminRedirect() {
  redirect(ADMIN_ROUTE);
}
