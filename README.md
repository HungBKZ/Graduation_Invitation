# The Graduation of Phan Thành Hưng — Personalized Graduation Invitation Website

A luxury, cinematic, personalized Graduation Invitation web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion for React**.

Designed with a **Midnight Navy Luxury** aesthetic (`#0B1930`, `#172A46`, `#D6B675`, `#F6F1E8`), featuring an animated envelope-opening experience, full-body portrait showcase, real-time RSVP persistence, bulk invitation generator, single-password administrative dashboard, and high-resolution downloadable invitation cards.

---

## 🌟 Key Features

### Guest Experience
- **Unique Personalized Links:** Random, non-sequential tokens (`/i/[token]`) personalized for each individual guest without requiring login.
- **Envelope-Opening Animation:** Stationery navy envelope with 3D folding flap, sliding invitation card, and graceful transition into the graduation page.
- **Graduation Hero:** Centerpiece full-body photograph of Phan Thành Hưng with responsive split composition (desktop) and vertically stacked layout (mobile), with an elegant royal PTH monogram fallback.
- **Personal Invitation Letter:** Formal stationery letter with gold borders, dynamic guest name, formal Vietnamese message, and graduate signature.
- **Countdown Timer:** Accurate countdown configured in Vietnam timezone (`Asia/Ho_Chi_Minh` UTC+7).
- **Venue & Google Maps Integration:** FPT University Can Tho Campus location with configured Google Maps navigation button.
- **Interactive RSVP:** 3 attendance choices (Sẽ tham dự, Chưa chắc chắn, Từ chối), personal message field, confetti celebratory burst, and updateable responses.
- **Downloadable High-Res Invitation:** Dedicated 1080 × 1920 portrait PNG export for Instagram/Facebook Stories, completely free of buttons, controls, or browser toolbars.
- **Background Music Player:** Floating audio toggle with gold soundwave animations and session persistence.

### Private Admin Dashboard (`/manage-pth-x7k29m`)
- **Single-Password Security:** Protected by server-side `ADMIN_PASSWORD`, HTTP-only session cookie, rate limiting, and excluded from search engine indexing.
- **Module 1 — Overview:** Live attendance stats, response breakdown progress bar, and recent activity log.
- **Module 2 — Guest Management:** Search, RSVP filters, add guest, rename without changing token, copy invitation links, preview in new tab, revoke/reactivate access, and Excel export.
- **Module 3 — Bulk Invitation Generator:** Paste guest names (one per line) or import Excel/CSV files, automatic accent-preserving normalization, duplicate detection, bulk creation, and batch copy.
- **Module 4 — RSVP Management:** Dedicated response review, full personal messages, response timestamps, and CSV/XLSX export.
- **Module 5 — Invitation Designer:** Update graduate full-body photo URL, edit invitation & closing text, preview in desktop/mobile frames, and sample guest preview.
- **Module 6 — Event Settings:** Update ceremony times, guest arrival time, Google Maps URL, background audio URL, and venue details.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 2. Installation
```bash
# Clone the repository and navigate into it
cd invitation

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
# Admin Single-Password Authentication
ADMIN_PASSWORD=hungpth2026

# Website Public Base URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase PostgreSQL (Optional for local development; when omitted, uses local persistent JSON store)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage.

- **Demo Guest Invitation:** [http://localhost:3000/i/demoMinhAnh](http://localhost:3000/i/demoMinhAnh)
- **Private Admin Dashboard:** [http://localhost:3000/manage-pth-x7k29m](http://localhost:3000/manage-pth-x7k29m) (Password: `hungpth2026`)

---

## 🗄️ Database Setup (Supabase PostgreSQL)

When you are ready to connect real Supabase PostgreSQL:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase project.
3. Open and run the migration script located at `supabase/schema.sql`.
4. Copy your **Project URL**, **Anon Key**, and **Service Role Key** into `.env.local` (or Vercel environment variables).
5. The application will automatically switch from the local store to Supabase PostgreSQL without any code changes!

---

## 📦 Production Build & Deployment

To verify the production build:
```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Push the code to a Git repository (GitHub/GitLab).
2. Import the project in Vercel.
3. Add the environment variables:
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

---

## 🎓 Event Information
- **Event:** The Graduation of Phan Thành Hưng
- **University:** FPT University Can Tho Campus, Vietnam
- **Major:** Kỹ thuật phần mềm (Software Engineering) · Khóa K18
- **Date:** Sunday, October 25, 2026
