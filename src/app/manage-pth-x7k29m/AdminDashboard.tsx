"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import {
  Users,
  UserPlus,
  Send,
  Sliders,
  Palette,
  BarChart3,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Download,
  Upload,
  Search,
  Sparkles,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Database,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Guest, EventSettings, OverviewStats, RsvpStatus, HostId } from "@/types";
import {
  adminLogoutAction,
  addGuestAction,
  updateGuestNameAction,
  toggleGuestActiveAction,
  deleteGuestAction,
  bulkAddGuestsAction,
  updateSettingsAction,
  getAdminDataAction,
} from "@/app/actions";
import { MonogramSeal } from "@/components/MonogramSeal";

interface AdminDashboardProps {
  initialGuests: Guest[];
  initialSettings: EventSettings;
  initialStats: OverviewStats;
  isSupabase: boolean;
}

export function AdminDashboard({
  initialGuests,
  initialSettings,
  initialStats,
  isSupabase,
}: AdminDashboardProps) {
  const [currentHost, setCurrentHost] = useState<HostId>("thanh_hung");
  const [activeTab, setActiveTab] = useState<
    "overview" | "guests" | "bulk" | "rsvps" | "designer" | "settings"
  >("overview");

  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [settings, setSettings] = useState<EventSettings>(initialSettings);
  const [stats, setStats] = useState<OverviewStats>(initialStats);
  const [isPending, startTransition] = useTransition();

  const handleSwitchHost = (host: HostId) => {
    if (host === currentHost) return;
    setCurrentHost(host);
    startTransition(async () => {
      const res = await getAdminDataAction(host);
      if (res.success && res.guests && res.settings && res.stats) {
        setGuests(res.guests);
        setSettings(res.settings);
        setSettingsForm(res.settings);
        setStats(res.stats);
        showNotice(
          `Đã chuyển sang quản lý hồ sơ: ${
            host === "gia_yen" ? "Lê Gia Yến (CTU)" : "Phan Thành Hưng (FPTU)"
          }`
        );
      }
    });
  };

  // Toast / Status notice
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showNotice = (text: string, type: "success" | "error" = "success") => {
    setNotice({ text, type });
    setTimeout(() => setNotice(null), 4000);
  };

  // Clipboard copy state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const copyLink = (token: string) => {
    const url = `${window.location.origin}/i/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    showNotice(`Đã sao chép liên kết thư mời!`);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  // ----------------------------------------------------
  // GUEST MANAGEMENT STATE
  // ----------------------------------------------------
  const [guestSearch, setGuestSearch] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState<"all" | RsvpStatus | "pending">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState("");
  const [editingGuest, setEditingGuest] = useState<{ id: string; name: string } | null>(null);

  const filteredGuests = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(guestSearch.toLowerCase());
    if (!matchSearch) return false;
    if (rsvpFilter === "all") return true;
    if (rsvpFilter === "pending") return !g.rsvp;
    return g.rsvp?.response_status === rsvpFilter;
  });

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    startTransition(async () => {
      const res = await addGuestAction(newGuestName.trim(), currentHost);
      if (res.success && res.guest) {
        setGuests((prev) => [res.guest, ...prev]);
        setNewGuestName("");
        setIsAddModalOpen(false);
        showNotice(`Đã tạo thư mời cho "${res.guest.name}" thành công!`);
      } else {
        showNotice(res.error || "Không thể tạo khách mời", "error");
      }
    });
  };

  const handleUpdateGuestName = async (id: string, name: string) => {
    if (!name.trim()) return;
    startTransition(async () => {
      const res = await updateGuestNameAction(id, name.trim());
      if (res.success && res.guest) {
        setGuests((prev) => prev.map((g) => (g.id === id ? res.guest : g)));
        setEditingGuest(null);
        showNotice("Đã cập nhật tên khách mời!");
      } else {
        showNotice(res.error || "Lỗi cập nhật", "error");
      }
    });
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    startTransition(async () => {
      const res = await toggleGuestActiveAction(id, !currentActive);
      if (res.success && res.guest) {
        setGuests((prev) => prev.map((g) => (g.id === id ? res.guest : g)));
        showNotice(
          !currentActive
            ? "Đã kích hoạt lại thư mời!"
            : "Đã thu hồi quyền truy cập thư mời!"
        );
      } else {
        showNotice(res.error || "Lỗi cập nhật", "error");
      }
    });
  };

  const handleDeleteGuest = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa thư mời của "${name}" không?`)) return;

    startTransition(async () => {
      const res = await deleteGuestAction(id);
      if (res.success) {
        setGuests((prev) => prev.filter((g) => g.id !== id));
        showNotice(`Đã xóa thư mời của "${name}"`);
      } else {
        showNotice(res.error || "Không thể xóa", "error");
      }
    });
  };

  // Export guests to Excel
  const handleExportGuests = () => {
    const data = guests.map((g) => ({
      "Tên Khách Mời": g.name,
      "Liên Kết Thư Mời": `${window.location.origin}/i/${g.invitation_token}`,
      "Trạng Thái": g.is_active ? "Đang hoạt động" : "Đã thu hồi",
      "Đã Mở Thư": g.first_opened_at ? "Có" : "Chưa",
      "Phản Hồi RSVP":
        g.rsvp?.response_status === "attending"
          ? "Sẽ tham dự"
          : g.rsvp?.response_status === "maybe"
          ? "Chưa chắc chắn"
          : g.rsvp?.response_status === "declined"
          ? "Từ chối"
          : "Chưa phản hồi",
      "Lời Nhắn": g.rsvp?.personal_message || "",
      "Thời Gian Phản Hồi": g.rsvp?.updated_at || "",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachKhachMoi");
    XLSX.writeFile(wb, "Danh-Sach-Khach-Moi-Tot-Nghiep.xlsx");
  };

  // ----------------------------------------------------
  // BULK GENERATOR STATE
  // ----------------------------------------------------
  const [bulkMode, setBulkMode] = useState<"paste" | "file">("paste");
  const [pasteNamesText, setPasteNamesText] = useState("");
  const [parsedBulkNames, setParsedBulkNames] = useState<string[]>([]);
  const [bulkDuplicates, setBulkDuplicates] = useState<string[]>([]);
  const [createdBulkGuests, setCreatedBulkGuests] = useState<Guest[]>([]);

  // Parse paste names
  const handleAnalyzeNames = (text: string) => {
    const rawLines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const dupes: string[] = [];
    const seen = new Set<string>();

    rawLines.forEach((name) => {
      const lower = name.toLowerCase();
      if (seen.has(lower)) {
        dupes.push(name);
      }
      seen.add(lower);
    });

    setParsedBulkNames(rawLines);
    setBulkDuplicates(dupes);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];

        // Extract first column or column with guest names
        const names: string[] = [];
        data.forEach((row) => {
          if (row && row[0] && typeof row[0] === "string" && row[0].trim().length > 0) {
            // Ignore header row if it says "tên" or "name"
            if (!row[0].toLowerCase().includes("tên") && !row[0].toLowerCase().includes("name")) {
              names.push(row[0].trim());
            }
          }
        });

        if (names.length === 0) {
          showNotice("Không tìm thấy tên khách mời nào trong file", "error");
          return;
        }

        setPasteNamesText(names.join("\n"));
        handleAnalyzeNames(names.join("\n"));
        showNotice(`Đã đọc ${names.length} tên từ file!`);
      } catch {
        showNotice("Lỗi khi đọc file. Vui lòng kiểm tra định dạng CSV hoặc XLSX.", "error");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExecuteBulkCreate = () => {
    if (parsedBulkNames.length === 0) return;

    startTransition(async () => {
      const res = await bulkAddGuestsAction(parsedBulkNames, currentHost);
      if (res.success && res.guests) {
        setGuests((prev) => [...res.guests, ...prev]);
        setCreatedBulkGuests(res.guests);
        setPasteNamesText("");
        setParsedBulkNames([]);
        showNotice(`Đã tạo thành công ${res.count} thư mời mới!`);
      } else {
        showNotice(res.error || "Lỗi tạo hàng loạt", "error");
      }
    });
  };

  // Bulk copy links
  const handleBulkCopyLinks = (guestList: Guest[]) => {
    const text = guestList
      .map((g) => `${g.name}: ${window.location.origin}/i/${g.invitation_token}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    showNotice(`Đã sao chép tất cả ${guestList.length} liên kết vào bộ nhớ tạm!`);
  };

  // ----------------------------------------------------
  // SETTINGS & DESIGNER STATE
  // ----------------------------------------------------
  const [designerPreviewDevice, setDesignerPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [designerSampleGuest, setDesignerSampleGuest] = useState<string>(
    guests[0]?.name || "Nguyễn Minh Anh"
  );
  const [settingsForm, setSettingsForm] = useState<EventSettings>({ ...settings });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setSettingsForm((prev) => ({
          ...prev,
          graduate_photo_url: data.url,
        }));
        await updateSettingsAction(
          { graduate_photo_url: data.url },
          currentHost === "gia_yen" ? "gia_yen" : "default"
        );
        setSettings((prev) => ({ ...prev, graduate_photo_url: data.url }));
        showNotice("Đã tải lên và cập nhật ảnh cử nhân thành công!");
      } else {
        showNotice(data.error || "Lỗi tải ảnh lên", "error");
      }
    } catch {
      showNotice("Lỗi kết nối khi tải ảnh", "error");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAudio(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setSettingsForm((prev) => ({
          ...prev,
          background_music_url: data.url,
        }));
        await updateSettingsAction(
          { background_music_url: data.url },
          currentHost === "gia_yen" ? "gia_yen" : "default"
        );
        setSettings((prev) => ({ ...prev, background_music_url: data.url }));
        showNotice("Đã tải lên và cập nhật file nhạc thành công!");
      } else {
        showNotice(data.error || "Lỗi tải file nhạc", "error");
      }
    } catch {
      showNotice("Lỗi kết nối khi tải file nhạc", "error");
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSettingsAction(
        settingsForm,
        currentHost === "gia_yen" ? "gia_yen" : "default"
      );
      if (res.success && res.settings) {
        setSettings(res.settings);
        showNotice("Đã lưu cài đặt sự kiện thành công!");
      } else {
        showNotice(res.error || "Lỗi lưu cài đặt", "error");
      }
    });
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0B1930] text-[#F6F1E8] flex flex-col font-sans select-none">
      {/* Toast Notice */}
      {notice && (
        <div
          className={`fixed top-4 right-4 z-50 py-3 px-5 rounded-xl border text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-300 ${
            notice.type === "success"
              ? "bg-[#172A46] border-[#D6B675] text-[#D6B675]"
              : "bg-red-950/90 border-red-500 text-red-200"
          }`}
        >
          {notice.type === "success" ? (
            <Sparkles className="w-4 h-4 text-[#D6B675]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          )}
          <span>{notice.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-[#D6B675]/20 bg-[#0E1F36]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div className="flex items-center gap-3">
            <MonogramSeal size={38} variant="badge" />
            <div>
              <h1 className="font-serif text-base sm:text-lg font-bold text-[#F6F1E8] leading-tight">
                {currentHost === "gia_yen"
                  ? "Quản Trị Thư Mời · Lê Gia Yến (Én)"
                  : "Quản Trị Thư Mời · Phan Thành Hưng"}
              </h1>
              <p className="text-[11px] text-[#9DAABD] flex items-center gap-2">
                <span>
                  {currentHost === "gia_yen"
                    ? "ĐH Cần Thơ · 02.11.2026"
                    : "ĐH FPT Cần Thơ · 25.10.2026"}
                </span>
                <span className="text-[#D6B675]">·</span>
                <span className="inline-flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#D6B675]" />
                  {isSupabase ? "Supabase PostgreSQL" : "Local Storage Mode"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Dual Profile Switcher Pill */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <div className="flex items-center bg-[#071324] p-1 rounded-xl border border-[#D6B675]/30">
            <button
              type="button"
              onClick={() => handleSwitchHost("thanh_hung")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                currentHost === "thanh_hung"
                  ? "bg-[#D6B675] text-[#0B1930] shadow-md"
                  : "text-[#9DAABD] hover:text-[#F6F1E8]"
              }`}
            >
              <span>🎓 Phan Thành Hưng</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchHost("gia_yen")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                currentHost === "gia_yen"
                  ? "bg-[#7D1A2A] text-[#FAF5EE] shadow-md"
                  : "text-[#9DAABD] hover:text-[#F6F1E8]"
              }`}
            >
              <span>🌸 Lê Gia Yến</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D6B675]/30 text-xs text-[#9DAABD] hover:text-[#F6F1E8] hover:border-[#D6B675] hover:bg-[#172A46] transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-[#D6B675]/15 bg-[#0B1930] px-4 sm:px-8 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {[
            { id: "overview", label: "Tổng Quan", icon: BarChart3 },
            { id: "guests", label: "Khách Mời", icon: Users, badge: guests.length },
            { id: "bulk", label: "Tạo Hàng Loạt", icon: UserPlus },
            { id: "rsvps", label: "Quản Lý RSVP", icon: Send },
            { id: "designer", label: "Thiết Kế Thư Mời", icon: Palette },
            { id: "settings", label: "Cài Đặt Sự Kiện", icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "guests"
                      | "bulk"
                      | "rsvps"
                      | "designer"
                      | "settings"
                  )
                }
                className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-xs font-medium border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#D6B675] text-[#D6B675] font-semibold"
                    : "border-transparent text-[#9DAABD] hover:text-[#F6F1E8]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#172A46] text-[10px] text-[#D6B675] border border-[#D6B675]/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="navy-card p-4 rounded-xl flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#9DAABD]">Tổng Thư Mời</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F1E8] mt-2">
                  {stats.totalInvitations}
                </p>
              </div>

              <div className="navy-card p-4 rounded-xl flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#9DAABD]">Đã Mở Thư</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D6B675] mt-2">
                  {stats.openedInvitations}
                </p>
              </div>

              <div className="navy-card p-4 rounded-xl flex flex-col justify-between border-emerald-500/30">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400">Sẽ Tham Dự</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 mt-2">
                  {stats.confirmedAttendance}
                </p>
              </div>

              <div className="navy-card p-4 rounded-xl flex flex-col justify-between border-amber-500/30">
                <span className="text-[11px] uppercase tracking-wider text-amber-300">Chưa Chắc Chắn</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 mt-2">
                  {stats.maybeAttending}
                </p>
              </div>

              <div className="navy-card p-4 rounded-xl flex flex-col justify-between border-rose-500/30">
                <span className="text-[11px] uppercase tracking-wider text-rose-300">Từ Chối</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-rose-300 mt-2">
                  {stats.declinedInvitations}
                </p>
              </div>

              <div className="navy-card p-4 rounded-xl flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#9DAABD]">Chưa Phản Hồi</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9DAABD] mt-2">
                  {stats.pendingResponses}
                </p>
              </div>
            </div>

            {/* Attendance Progress Bar */}
            <div className="navy-card p-6 rounded-2xl">
              <h3 className="font-serif text-lg font-bold text-[#F6F1E8] mb-3">
                Tỷ Lệ Phản Hồi Khách Mời
              </h3>
              <div className="h-4 rounded-full bg-[#0F1E33] overflow-hidden flex">
                <div
                  style={{
                    width: `${stats.totalInvitations > 0 ? (stats.confirmedAttendance / stats.totalInvitations) * 100 : 0}%`,
                  }}
                  className="bg-emerald-500 transition-all duration-500"
                  title="Sẽ tham dự"
                />
                <div
                  style={{
                    width: `${stats.totalInvitations > 0 ? (stats.maybeAttending / stats.totalInvitations) * 100 : 0}%`,
                  }}
                  className="bg-amber-400 transition-all duration-500"
                  title="Chưa chắc chắn"
                />
                <div
                  style={{
                    width: `${stats.totalInvitations > 0 ? (stats.declinedInvitations / stats.totalInvitations) * 100 : 0}%`,
                  }}
                  className="bg-rose-500 transition-all duration-500"
                  title="Từ chối"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[#F6F1E8]">Tham dự: {stats.confirmedAttendance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-[#F6F1E8]">Chưa chắc chắn: {stats.maybeAttending}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-[#F6F1E8]">Từ chối: {stats.declinedInvitations}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F1E33] border border-[#9DAABD]/40" />
                  <span className="text-[#9DAABD]">Chưa phản hồi: {stats.pendingResponses}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Guests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="navy-card p-6 rounded-2xl">
                <h3 className="font-serif text-lg font-bold text-[#F6F1E8] mb-4">
                  Thao Tác Nhanh
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("guests");
                      setIsAddModalOpen(true);
                    }}
                    className="p-4 rounded-xl bg-[#172A46] border border-[#D6B675]/30 hover:border-[#D6B675] text-left transition-all cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5 text-[#D6B675] mb-2" />
                    <p className="font-semibold text-sm text-[#F6F1E8]">Thêm Khách Mới</p>
                    <p className="text-xs text-[#9DAABD] mt-1">Tạo 1 thư mời với link riêng</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("bulk")}
                    className="p-4 rounded-xl bg-[#172A46] border border-[#D6B675]/30 hover:border-[#D6B675] text-left transition-all cursor-pointer"
                  >
                    <Users className="w-5 h-5 text-[#D6B675] mb-2" />
                    <p className="font-semibold text-sm text-[#F6F1E8]">Tạo Hàng Loạt</p>
                    <p className="text-xs text-[#9DAABD] mt-1">Dán danh sách hoặc import Excel</p>
                  </button>

                  <button
                    onClick={handleExportGuests}
                    className="p-4 rounded-xl bg-[#172A46] border border-[#D6B675]/30 hover:border-[#D6B675] text-left transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-[#D6B675] mb-2" />
                    <p className="font-semibold text-sm text-[#F6F1E8]">Xuất Excel</p>
                    <p className="text-xs text-[#9DAABD] mt-1">Tải danh sách khách & RSVP</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("designer")}
                    className="p-4 rounded-xl bg-[#172A46] border border-[#D6B675]/30 hover:border-[#D6B675] text-left transition-all cursor-pointer"
                  >
                    <Palette className="w-5 h-5 text-[#D6B675] mb-2" />
                    <p className="font-semibold text-sm text-[#F6F1E8]">Đổi Ảnh & Lời Mời</p>
                    <p className="text-xs text-[#9DAABD] mt-1">Tùy chỉnh ảnh và thông điệp</p>
                  </button>
                </div>
              </div>

              {/* Recent RSVPs */}
              <div className="navy-card p-6 rounded-2xl flex flex-col justify-between">
                <h3 className="font-serif text-lg font-bold text-[#F6F1E8] mb-4">
                  Phản Hồi Mới Nhất
                </h3>
                <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
                  {guests.filter((g) => g.rsvp).length === 0 ? (
                    <p className="text-xs text-[#9DAABD] py-6 text-center italic">
                      Chưa có khách mời nào gửi phản hồi RSVP.
                    </p>
                  ) : (
                    guests
                      .filter((g) => g.rsvp)
                      .slice(0, 5)
                      .map((g) => (
                        <div
                          key={g.id}
                          className="p-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/20 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-[#F6F1E8]">{g.name}</p>
                            {g.rsvp?.personal_message && (
                              <p className="text-[11px] text-[#9DAABD] italic line-clamp-1 mt-0.5">
                                &ldquo;{g.rsvp.personal_message}&rdquo;
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full font-medium ${
                              g.rsvp?.response_status === "attending"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                : g.rsvp?.response_status === "maybe"
                                ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                                : "bg-rose-950 text-rose-300 border border-rose-500/40"
                            }`}
                          >
                            {g.rsvp?.response_status === "attending"
                              ? "Tham dự"
                              : g.rsvp?.response_status === "maybe"
                              ? "Chưa chắc"
                              : "Từ chối"}
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: GUEST MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "guests" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Tìm khách mời..."
                  value={guestSearch}
                  onChange={(e) => setGuestSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0F1E33] border border-[#D6B675]/25 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                />
                <Search className="w-4 h-4 text-[#9DAABD] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Filters & Actions */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <select
                  value={rsvpFilter}
                  onChange={(e) =>
                    setRsvpFilter(
                      e.target.value as "all" | RsvpStatus | "pending"
                    )
                  }
                  className="py-2 px-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/25 text-xs text-[#F6F1E8] focus:outline-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="attending">Sẽ tham dự</option>
                  <option value="maybe">Chưa chắc chắn</option>
                  <option value="declined">Từ chối</option>
                  <option value="pending">Chưa phản hồi</option>
                </select>

                <button
                  onClick={handleExportGuests}
                  className="py-2 px-3 rounded-xl bg-[#172A46] border border-[#D6B675]/30 text-[#D6B675] hover:bg-[#1E365A] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Excel</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#D6B675] to-[#E8D19F] text-[#0B1930] font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Thêm Khách Mời</span>
                </button>
              </div>
            </div>

            {/* Guests Table */}
            <div className="navy-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0F1E33] border-b border-[#D6B675]/20 text-[#D6B675] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Tên Khách Mời</th>
                      <th className="py-3 px-4">Link Thư Mời</th>
                      <th className="py-3 px-4">Đã Mở Thư</th>
                      <th className="py-3 px-4">RSVP</th>
                      <th className="py-3 px-4">Lời Nhắn</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6B675]/10 text-[#F6F1E8]">
                    {filteredGuests.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#9DAABD] italic">
                          Không tìm thấy khách mời nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      filteredGuests.map((g) => (
                        <tr key={g.id} className="hover:bg-[#172A46]/50 transition-colors">
                          <td className="py-3.5 px-4 font-medium">
                            {editingGuest?.id === g.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editingGuest.name}
                                  onChange={(e) =>
                                    setEditingGuest({ id: g.id, name: e.target.value })
                                  }
                                  className="px-2 py-1 bg-[#0B1930] border border-[#D6B675] rounded text-xs text-[#F6F1E8]"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleUpdateGuestName(g.id, editingGuest.name)}
                                  className="text-emerald-400 hover:text-emerald-300 font-bold"
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={() => setEditingGuest(null)}
                                  className="text-[#9DAABD] hover:text-[#F6F1E8]"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-sm font-semibold">{g.name}</span>
                                <button
                                  onClick={() => setEditingGuest({ id: g.id, name: g.name })}
                                  className="text-[#9DAABD] hover:text-[#D6B675]"
                                  title="Đổi tên"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#D6B675]">
                            <div className="flex items-center gap-1.5">
                              <span>/i/{g.invitation_token}</span>
                              <button
                                onClick={() => copyLink(g.invitation_token)}
                                className="text-[#9DAABD] hover:text-[#D6B675] cursor-pointer"
                                title="Sao chép liên kết"
                              >
                                {copiedToken === g.invitation_token ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <a
                                href={`/i/${g.invitation_token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9DAABD] hover:text-[#D6B675]"
                                title="Xem trước thư mời"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            {g.first_opened_at ? (
                              <span className="text-emerald-400 font-medium">Đã mở</span>
                            ) : (
                              <span className="text-[#9DAABD]">Chưa</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            {g.rsvp ? (
                              <span
                                className={`px-2 py-0.5 rounded-full font-medium ${
                                  g.rsvp.response_status === "attending"
                                    ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                    : g.rsvp.response_status === "maybe"
                                    ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                                    : "bg-rose-950 text-rose-300 border border-rose-500/40"
                                }`}
                              >
                                {g.rsvp.response_status === "attending"
                                  ? "Tham dự"
                                  : g.rsvp.response_status === "maybe"
                                  ? "Chưa chắc"
                                  : "Từ chối"}
                              </span>
                            ) : (
                              <span className="text-[#9DAABD] italic">Chờ phản hồi</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs truncate text-[11px] text-[#F6F1E8]/80">
                            {g.rsvp?.personal_message || "—"}
                          </td>

                          <td className="py-3.5 px-4">
                            {g.is_active ? (
                              <span className="text-emerald-400 text-[11px]">Hoạt động</span>
                            ) : (
                              <span className="text-rose-400 text-[11px]">Đã thu hồi</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleActive(g.id, g.is_active)}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  g.is_active
                                    ? "border-amber-500/30 text-amber-400 hover:bg-amber-950/40"
                                    : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/40"
                                }`}
                                title={g.is_active ? "Thu hồi liên kết" : "Kích hoạt lại"}
                              >
                                {g.is_active ? (
                                  <Lock className="w-3.5 h-3.5" />
                                ) : (
                                  <Unlock className="w-3.5 h-3.5" />
                                )}
                              </button>

                              <button
                                onClick={() => handleDeleteGuest(g.id, g.name)}
                                className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                                title="Xóa thư mời"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Add Single Guest */}
            {isAddModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                <div className="navy-card rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#D6B675]/40 shadow-2xl">
                  <h3 className="font-serif text-lg font-bold text-[#F6F1E8] mb-1">
                    Thêm Khách Mời Mới
                  </h3>
                  <p className="text-xs text-[#9DAABD] mb-4">
                    Hệ thống sẽ tạo tự động một liên kết thư mời ngẫu nhiên, an toàn.
                  </p>

                  <form onSubmit={handleAddGuest} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1.5">
                        Họ và tên khách mời
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Nguyễn Minh Anh"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-sm text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                        autoFocus
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs text-[#9DAABD] hover:text-[#F6F1E8]"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        disabled={isPending || !newGuestName.trim()}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D6B675] to-[#E8D19F] text-[#0B1930] font-semibold text-xs cursor-pointer disabled:opacity-50"
                      >
                        {isPending ? "Đang tạo..." : "Tạo Thư Mời"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: BULK INVITATION GENERATOR */}
        {/* ==================================================== */}
        {activeTab === "bulk" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="navy-card p-6 sm:p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F1E8]">
                    Tạo Thư Mời Hàng Loạt
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9DAABD] mt-1">
                    Nhập nhiều tên cùng lúc qua dán văn bản hoặc tải file Excel/CSV.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#0F1E33] p-1 rounded-xl border border-[#D6B675]/20">
                  <button
                    onClick={() => setBulkMode("paste")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      bulkMode === "paste"
                        ? "bg-[#D6B675] text-[#0B1930] font-semibold"
                        : "text-[#9DAABD] hover:text-[#F6F1E8]"
                    }`}
                  >
                    Dán Danh Sách
                  </button>
                  <button
                    onClick={() => setBulkMode("file")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      bulkMode === "file"
                        ? "bg-[#D6B675] text-[#0B1930] font-semibold"
                        : "text-[#9DAABD] hover:text-[#F6F1E8]"
                    }`}
                  >
                    Tải File Excel/CSV
                  </button>
                </div>
              </div>

              {bulkMode === "paste" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-2">
                      Nhập danh sách tên (Mỗi dòng một tên khách mời)
                    </label>
                    <textarea
                      rows={8}
                      placeholder={`Nguyễn Minh Anh\nTrần Gia Bảo\nLê Ngọc Hân\nPhạm Quốc Huy`}
                      value={pasteNamesText}
                      onChange={(e) => {
                        setPasteNamesText(e.target.value);
                        handleAnalyzeNames(e.target.value);
                      }}
                      className="w-full rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 p-4 text-sm text-[#F6F1E8] placeholder-[#9DAABD]/40 focus:outline-none focus:border-[#D6B675] font-sans"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-[#D6B675]/30 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Upload className="w-10 h-10 text-[#D6B675] mb-3" />
                  <p className="text-sm font-semibold text-[#F6F1E8]">
                    Tải lên file Excel (.xlsx) hoặc CSV
                  </p>
                  <p className="text-xs text-[#9DAABD] mt-1 max-w-sm">
                    File chỉ cần chứa cột đầu tiên là họ tên khách mời (hỗ trợ đầy đủ tiếng Việt có dấu).
                  </p>
                  <label className="mt-4 px-5 py-2.5 rounded-full bg-[#172A46] border border-[#D6B675] text-xs font-semibold text-[#D6B675] hover:bg-[#D6B675] hover:text-[#0B1930] transition-colors cursor-pointer">
                    <span>Chọn file từ máy tính</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Analysis and Preview */}
              {parsedBulkNames.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#D6B675]/20 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#F6F1E8]">
                        Số lượng phát hiện: <span className="text-[#D6B675]">{parsedBulkNames.length}</span> khách mời
                      </span>
                      {bulkDuplicates.length > 0 && (
                        <span className="text-xs text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{bulkDuplicates.length} tên trùng lặp (vẫn tạo link riêng biệt nếu bạn muốn)</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleExecuteBulkCreate}
                      disabled={isPending}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-xs tracking-wider uppercase shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isPending
                        ? "Đang tạo hàng loạt..."
                        : `Tạo ${parsedBulkNames.length} Thư Mời Ngay`}
                    </button>
                  </div>

                  <div className="max-h-40 overflow-y-auto p-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {parsedBulkNames.map((name, i) => (
                      <div
                        key={i}
                        className={`p-1.5 rounded px-2.5 truncate ${
                          bulkDuplicates.includes(name)
                            ? "bg-amber-950/50 text-amber-300 border border-amber-500/30"
                            : "text-[#F6F1E8]/90"
                        }`}
                      >
                        {i + 1}. {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generated Links Result Box */}
            {createdBulkGuests.length > 0 && (
              <div className="navy-card p-6 sm:p-8 rounded-2xl border-emerald-500/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Đã tạo thành công {createdBulkGuests.length} thư mời!</span>
                    </h3>
                    <p className="text-xs text-[#9DAABD] mt-1">
                      Mỗi khách mời đã có một đường dẫn riêng biệt, ngẫu nhiên.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBulkCopyLinks(createdBulkGuests)}
                      className="px-4 py-2 rounded-xl bg-[#172A46] border border-[#D6B675] text-xs font-semibold text-[#D6B675] hover:bg-[#D6B675] hover:text-[#0B1930] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép Toàn Bộ Links</span>
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {createdBulkGuests.map((g) => (
                    <div
                      key={g.id}
                      className="p-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/20 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-[#F6F1E8]">{g.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#D6B675]">
                          {window.location.origin}/i/{g.invitation_token}
                        </span>
                        <button
                          onClick={() => copyLink(g.invitation_token)}
                          className="p-1 text-[#9DAABD] hover:text-[#D6B675]"
                          title="Sao chép"
                        >
                          {copiedToken === g.invitation_token ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <a
                          href={`/i/${g.invitation_token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[#9DAABD] hover:text-[#D6B675]"
                          title="Xem trước"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: RSVP RESPONSES */}
        {/* ==================================================== */}
        {activeTab === "rsvps" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F1E8]">
                  Chi Tiết Phản Hồi RSVP
                </h2>
                <p className="text-xs sm:text-sm text-[#9DAABD] mt-1">
                  Theo dõi danh sách khách xác nhận tham dự và lời nhắn gửi đến Hưng.
                </p>
              </div>

              <button
                onClick={handleExportGuests}
                className="py-2 px-4 rounded-xl bg-[#172A46] border border-[#D6B675] text-[#D6B675] hover:bg-[#D6B675] hover:text-[#0B1930] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Báo Cáo RSVP</span>
              </button>
            </div>

            {/* Response Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guests.filter((g) => g.rsvp).length === 0 ? (
                <div className="col-span-full navy-card p-12 text-center rounded-2xl text-[#9DAABD] italic">
                  Chưa có phản hồi nào được gửi.
                </div>
              ) : (
                guests
                  .filter((g) => g.rsvp)
                  .map((g) => (
                    <div
                      key={g.id}
                      className="navy-card p-5 rounded-2xl flex flex-col justify-between border-t-2"
                      style={{
                        borderTopColor:
                          g.rsvp?.response_status === "attending"
                            ? "#10B981"
                            : g.rsvp?.response_status === "maybe"
                            ? "#F59E0B"
                            : "#F43F5E",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-serif text-base font-bold text-[#F6F1E8]">
                            {g.name}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              g.rsvp?.response_status === "attending"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                : g.rsvp?.response_status === "maybe"
                                ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                                : "bg-rose-950 text-rose-300 border border-rose-500/40"
                            }`}
                          >
                            {g.rsvp?.response_status === "attending"
                              ? "Sẽ tham dự 🎉"
                              : g.rsvp?.response_status === "maybe"
                              ? "Chưa chắc 🤔"
                              : "Từ chối 💌"}
                          </span>
                        </div>

                        {g.rsvp?.personal_message ? (
                          <div className="p-3 rounded-xl bg-[#0F1E33] border border-[#D6B675]/15 text-xs text-[#F6F1E8]/90 italic my-3 leading-relaxed">
                            &ldquo;{g.rsvp.personal_message}&rdquo;
                          </div>
                        ) : (
                          <p className="text-xs text-[#9DAABD]/60 italic my-3">
                            Không có lời nhắn kèm theo.
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#D6B675]/15 flex items-center justify-between text-[11px] text-[#9DAABD]">
                        <span>Cập nhật: {new Date(g.rsvp!.updated_at).toLocaleDateString("vi-VN")}</span>
                        <a
                          href={`/i/${g.invitation_token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D6B675] hover:underline"
                        >
                          Xem thư mời
                        </a>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: INVITATION DESIGNER */}
        {/* ==================================================== */}
        {activeTab === "designer" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="navy-card p-6 rounded-2xl space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#F6F1E8]">
                    Ảnh Cử Nhân & Thông Điệp
                  </h3>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1.5">
                      Ảnh Toàn Thân Phan Thành Hưng
                    </label>

                    {/* Direct File Upload Button */}
                    <div className="mb-3 p-3.5 rounded-xl border border-dashed border-[#D6B675]/40 bg-[#0F1E33] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left">
                        <p className="text-xs font-semibold text-[#F6F1E8]">
                          Tải ảnh từ máy tính (PNG / JPEG / WebP)
                        </p>
                        <p className="text-[11px] text-[#9DAABD] mt-0.5">
                          Khuyến nghị ảnh toàn thân đứng thẳng từ đầu tới chân
                        </p>
                      </div>
                      <label className="px-4 py-2 rounded-xl bg-[#172A46] border border-[#D6B675] text-[#D6B675] hover:bg-[#D6B675] hover:text-[#0B1930] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploadingPhoto ? "Đang tải lên..." : "Chọn ảnh từ máy"}</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handlePhotoUpload}
                          disabled={isUploadingPhoto}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <label className="block text-[11px] text-[#9DAABD] mb-1">
                      Hoặc nhập URL ảnh trực tiếp:
                    </label>
                    <input
                      type="url"
                      placeholder="https://.../photo.png"
                      value={settingsForm.graduate_photo_url || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          graduate_photo_url: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1.5">
                      Lời Mời Tốt Nghiệp
                    </label>
                    <textarea
                      rows={4}
                      value={settingsForm.invitation_message}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          invitation_message: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1.5">
                      Lời Cảm Ơn Cuối Thư
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.thank_you_message}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          thank_you_message: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1.5">
                      Khách Mời Mẫu Để Xem Trước
                    </label>
                    <input
                      type="text"
                      value={designerSampleGuest}
                      onChange={(e) => setDesignerSampleGuest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    disabled={isPending}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D6B675] to-[#E8D19F] text-[#0B1930] font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? "Đang lưu..." : "Lưu Thay Đổi Thiết Kế"}
                  </button>
                </div>
              </div>

              {/* Preview Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-center">
                {/* Device switch */}
                <div className="flex items-center gap-2 mb-4 bg-[#0F1E33] p-1 rounded-xl border border-[#D6B675]/25">
                  <button
                    onClick={() => setDesignerPreviewDevice("desktop")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                      designerPreviewDevice === "desktop"
                        ? "bg-[#D6B675] text-[#0B1930] font-semibold"
                        : "text-[#9DAABD]"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Máy Tính</span>
                  </button>
                  <button
                    onClick={() => setDesignerPreviewDevice("mobile")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                      designerPreviewDevice === "mobile"
                        ? "bg-[#D6B675] text-[#0B1930] font-semibold"
                        : "text-[#9DAABD]"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Điện Thoại</span>
                  </button>
                </div>

                {/* Frame Mockup */}
                <div
                  className={`w-full transition-all duration-300 rounded-2xl border border-[#D6B675]/35 p-6 bg-[#0B1930] shadow-2xl flex flex-col items-center text-center ${
                    designerPreviewDevice === "mobile"
                      ? "max-w-[360px] aspect-[9/16] overflow-y-auto"
                      : "max-w-2xl"
                  }`}
                >
                  <MonogramSeal size={50} className="mb-3" />
                  <span className="text-[10px] uppercase tracking-widest text-[#D6B675]">
                    Lễ Tốt Nghiệp · 25.10.2026
                  </span>
                  <h3 className="font-serif text-xl font-bold gold-gradient-text mt-1">
                    {settingsForm.graduate_name}
                  </h3>

                  {/* Render photo in designer mockup */}
                  {settingsForm.graduate_photo_url ? (
                    <div className="relative w-44 h-60 rounded-xl overflow-hidden border border-[#D6B675]/40 my-3 shadow-xl bg-[#172A46]">
                      <Image
                        src={settingsForm.graduate_photo_url}
                        alt="Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="my-3 py-6 px-4 rounded-xl border border-dashed border-[#D6B675]/30 text-[11px] text-[#9DAABD] max-w-xs">
                      Chưa tải ảnh lên. Hệ thống sẽ hiển thị Monogram hoàng gia PTH thay thế.
                    </div>
                  )}

                  <div className="my-2 py-2 border-y border-[#D6B675]/30 w-full max-w-xs">
                    <p className="text-[11px] text-[#9DAABD] uppercase tracking-wider">
                      Trân trọng kính mời
                    </p>
                    <p className="font-serif text-lg font-bold text-[#F6F1E8]">
                      {designerSampleGuest}
                    </p>
                  </div>

                  <p className="text-xs text-[#F6F1E8]/80 leading-relaxed font-light my-2 max-w-sm whitespace-pre-line">
                    {settingsForm.invitation_message}
                  </p>

                  <div className="mt-4 p-3 rounded-lg bg-[#0F1E33] border border-[#D6B675]/20 text-[11px] text-[#D6B675] w-full max-w-xs">
                    {settingsForm.university}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: EVENT SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="navy-card p-6 sm:p-8 rounded-2xl">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F1E8] mb-1">
                Cài Đặt Sự Kiện Tốt Nghiệp
              </h2>
              <p className="text-xs text-[#9DAABD] mb-6">
                Mọi thay đổi sẽ được cập nhật đồng bộ trực tiếp lên toàn bộ các liên kết thư mời khách.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Tên Tân Cử Nhân
                    </label>
                    <input
                      type="text"
                      value={settingsForm.graduate_name}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, graduate_name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Chuyên Ngành
                    </label>
                    <input
                      type="text"
                      value={settingsForm.major}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, major: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Khóa
                    </label>
                    <input
                      type="text"
                      value={settingsForm.cohort}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, cohort: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Trường Đại Học
                    </label>
                    <input
                      type="text"
                      value={settingsForm.university}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, university: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Ngày Lễ Tốt Nghiệp
                    </label>
                    <input
                      type="date"
                      value={settingsForm.event_date}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, event_date: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Giờ Khai Mạc Lễ (Tùy chọn)
                    </label>
                    <input
                      type="time"
                      value={settingsForm.event_start_time || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          event_start_time: e.target.value || null,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Giờ Đón Khách (Tùy chọn)
                    </label>
                    <input
                      type="time"
                      value={settingsForm.guest_meeting_time || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          guest_meeting_time: e.target.value || null,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Tên Địa Điểm
                    </label>
                    <input
                      type="text"
                      value={settingsForm.location_name}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, location_name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                    Đường Dẫn Google Maps Chính Thức
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.app.goo.gl/..."
                    value={settingsForm.maps_url || ""}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, maps_url: e.target.value || null })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                  />
                  <p className="text-[11px] text-[#9DAABD] mt-1">
                    Khi điền link này, nút &ldquo;Xem vị trí trên Google Maps&rdquo; trên thư mời của khách sẽ kích hoạt.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                    File Nhạc Nền Sự Kiện (Audio)
                  </label>
                  <div className="mb-2 p-3 rounded-xl border border-dashed border-[#D6B675]/40 bg-[#0F1E33] flex items-center justify-between gap-3">
                    <p className="text-xs text-[#9DAABD]">
                      Tải file âm thanh (.mp3 / .wav / .m4a)
                    </p>
                    <label className="px-3.5 py-1.5 rounded-lg bg-[#172A46] border border-[#D6B675] text-[#D6B675] text-xs font-semibold cursor-pointer shrink-0 hover:bg-[#D6B675] hover:text-[#0B1930] transition-colors">
                      <span>{isUploadingAudio ? "Đang tải..." : "Tải từ máy"}</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        disabled={isUploadingAudio}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    placeholder="https://.../music.mp3"
                    value={settingsForm.background_music_url || ""}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        background_music_url: e.target.value || null,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                  />
                  <p className="text-[11px] text-[#9DAABD] mt-1">
                    Link trực tiếp đến file âm thanh hoặc file đã tải lên từ máy tính.
                  </p>
                </div>

                {/* Additional Details for Phone & Parking */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Số Điện Thoại Cử Nhân
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 0907 612 060"
                      value={settingsForm.contact_phone || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          contact_phone: e.target.value || null,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                      Số Điện Thoại Trợ Lý / Hỗ Trợ
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 0772 967 049"
                      value={settingsForm.assistant_phone || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          assistant_phone: e.target.value || null,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6B675] font-semibold mb-1">
                    Chỉ Dẫn Cổng Vào & Bãi Gửi Xe
                  </label>
                  <textarea
                    rows={2}
                    placeholder="VD: Đi từ cổng B vào 50m bên tay trái là hội trường Rùa..."
                    value={settingsForm.parking_guide || ""}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        parking_guide: e.target.value || null,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1E33] border border-[#D6B675]/30 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#D6B675] resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D6B675] via-[#E8D19F] to-[#D6B675] text-[#0B1930] font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? "Đang lưu..." : "Lưu Toàn Bộ Cài Đặt Sự Kiện"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
