import {
  Bell,
  ChartNoAxesCombined,
  LayoutDashboard,
  Link as LinkIcon,
  Link2,
  Menu,
  Plus,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

// Dashboard navigation items
const items = [
  ["Overview", LayoutDashboard, "/dashboard"],
  ["My Links", LinkIcon, "/dashboard/links"],
  ["Analytics", ChartNoAxesCombined, "/dashboard/analytics"],
  ["Settings", Settings, "/dashboard/settings"],
];

// Generate user initials
const initials = (name) =>
  name
    ?.trim()
    ?.split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "SU";

// Avatar Component
function Avatar({ user, small = false }) {
  return (
    <span
      aria-label={`${user?.username || "SnipURL"} profile`}
      className={`grid shrink-0 place-items-center rounded-full bg-[#59614a] font-bold text-[#fff8f6] ${small ? "size-8 text-xs" : "size-10 text-sm"
        }`}
    >
      {initials(user?.username)}
    </span>
  );
}

// Mobile Bottom Navigation
export function MobileBottomNavigation({ onCreate }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex h-17 items-center justify-around border-t border-[#e5dcce] bg-[#fff8f6]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile dashboard navigation"
    >
      <Link
        to="/dashboard"
        className="grid place-items-center gap-1 text-xs font-bold text-[#ae2900]"
      >
        <LayoutDashboard size={19} />
        Overview
      </Link>

      <a
        href="#recent-links"
        className="grid place-items-center gap-1 text-xs text-[#765d56]"
      >
        <LinkIcon size={19} />
        My Links
      </a>

      <button
        onClick={onCreate}
        aria-label="Create link"
        className="-mt-7 grid size-14 place-items-center rounded-full bg-[#ae2900] text-white shadow-lg shadow-[#ae2900]/30"
      >
        <Plus size={24} />
      </button>

      <a
        href="#analytics-overview"
        className="grid place-items-center gap-1 text-xs text-[#765d56]"
      >
        <ChartNoAxesCombined size={19} />
        Analytics
      </a>

      <a
        href="#profile"
        className="grid place-items-center gap-1 text-xs text-[#765d56]"
      >
        <UserRound size={19} />
        Profile
      </a>
    </nav>
  );
}

// Dashboard Layout
export default function DashboardLayout({ children, onCreate }) {
  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff8f6] font-body text-[#251914]">

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-70 grid size-10 place-items-center rounded-full bg-[#ae2900] text-white shadow-lg md:hidden"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      {/* Mobile Overlay */}
      {open && (
        <button
          className="fixed inset-0 z-50 bg-black/25 md:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-60 flex w-[256px] flex-col justify-between border-r border-[#e5dcce] bg-[#f3ebdd] px-4 py-6 transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 text-xl font-bold"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#ae2900] text-white">
              <Link2 size={18} />
            </span>

            SnipURL
          </Link>

          {/* Navigation Links */}
          <nav
            className="mt-10 space-y-1"
            aria-label="Dashboard navigation"
          >
            {items.map(([name, Icon, path], i) => (
              <Link
                key={name}
                to={path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${i === 0
                  ? "bg-[#ae2900] font-bold text-white shadow-lg shadow-[#ae2900]/20"
                  : "font-medium text-[#5b403a] hover:bg-[#ffe9e2]"
                  }`}
              >
                <Icon size={19} />
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div id="profile" className="border-t border-[#e5dcce] pt-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#e5dcce] bg-[#fff8f6] p-2">
            <Avatar user={user} />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {user?.username || "Your workspace"}
              </p>

              <p className="truncate text-xs text-[#765d56]">
                {user?.email || "Signed in"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-30 flex h-18 items-center justify-between border-b border-[#e5dcce] bg-[#fff8f6]/92 px-5 pl-16 backdrop-blur md:left-64 md:px-8">

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3847a]"
            size={17}
          />

          <input
            readOnly
            aria-label="Link search unavailable"
            title="Link search is not available from the current API"
            placeholder="Search links, tags, domains..."
            className="h-10 w-full cursor-not-allowed rounded-full border border-[#e5dcce] bg-white pl-10 pr-4 text-sm text-[#806860]"
          />
        </div>

        {/* Header Actions */}
        <div className="ml-3 flex items-center gap-2">
          <button
            type="button"
            title="Notifications are not available"
            aria-label="Notifications unavailable"
            className="grid size-10 place-items-center rounded-full text-[#5b403a] hover:bg-[#fff1ec]"
          >
            <Bell size={19} />
          </button>

          <button
            onClick={onCreate}
            className="hidden h-10 items-center gap-2 rounded-full bg-[#ae2900] px-4 text-sm font-bold text-white shadow-md shadow-[#ae2900]/20 hover:bg-[#d53d12] sm:flex"
          >
            <Plus size={17} />
            Create Link
          </button>

          <Avatar user={user} small />
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 pt-18 md:ml-64 md:pb-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileBottomNavigation onCreate={onCreate} />

    </div>
  );
}
