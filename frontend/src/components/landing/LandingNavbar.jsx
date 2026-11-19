import { Link, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

const links = [
  ["Home", "home"],
  ["Features", "features"],
  ["How It Works", "how-it-works"],
  ["Pricing", "cta"],
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead9d1]/80 bg-[#fff8f6]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 text-[#251914]" aria-label="Go to SnipURL homepage">
          <span className="grid size-9 place-items-center rounded-xl bg-[#ae2900] text-white shadow-lg shadow-[#ae2900]/20">
            <Link size={18} />
          </span>
          <span className="text-xl font-bold tracking-tight">SnipURL</span>
        </button>
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#5b403a] md:flex" aria-label="Main navigation">
          {links.map(([label, id]) =>
            <button key={id} onClick={() => scrollTo(id)} className="transition hover:text-[#ae2900]">
              {label}
            </button>)
          }
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <RouterLink to="/auth" className="rounded-full px-4 py-2 text-sm font-semibold text-[#5b403a] transition hover:bg-[#fff1ec]">
            Sign In
          </RouterLink>
          <RouterLink to="/auth" className="rounded-full bg-[#ae2900] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ae2900]/20 transition hover:bg-[#d53d12]">
            Get Started
          </RouterLink>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full text-[#251914] hover:bg-[#fff1ec] md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <div className="border-t border-[#ead9d1] bg-[#fff8f6] px-5 py-5 md:hidden">
        <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
          {links.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-4 py-3 text-left font-medium text-[#5b403a] hover:bg-[#fff1ec]">
            {label}

          </button>)}
          <RouterLink to="/auth" onClick={() => setOpen(false)} className="mt-2 rounded-xl px-4 py-3 font-semibold text-[#5b403a]">
            Sign In
          </RouterLink>
          <RouterLink to="/auth" onClick={() => setOpen(false)} className="rounded-xl bg-[#ae2900] px-4 py-3 text-center font-semibold text-white">
            Get Started
          </RouterLink>
        </nav>
      </div>}
    </header>
  );
}
