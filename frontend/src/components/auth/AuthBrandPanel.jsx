import { ArrowLeft, CheckCircle2, Globe2, Link2, ShieldCheck, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden bg-[#251914] px-10 py-8 text-[#fff8f6] lg:flex lg:w-[46%] lg:flex-col xl:px-14">
      <div className="absolute -left-32 top-36 size-96 rounded-full bg-[#ae2900]/35 blur-3xl" />
      <div className="absolute -right-32 bottom-16 size-80 rounded-full bg-[#59614a]/45 blur-3xl" />
      <div className="relative flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-[#ae2900]">
            <Link2 size={18} />
          </span>
          SnipURL
        </Link>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#eedbd3] hover:text-white">
          <ArrowLeft size={15} /> Back
        </Link>
      </div>
      <div className="relative my-auto max-w-xl">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.13em] text-[#ffd4c5]">
          Vol. IV — System Release
        </p>
        <p className="mt-7 text-xs uppercase tracking-[.16em] text-[#cdb9ae]">
          Node: IN-MUM-01 / ARCHIVAL
        </p>
        <h1 className="font-display mt-4 text-6xl font-bold leading-[.94] tracking-[-.055em]">
          Every link has a <em className="font-editor font-normal text-[#ffd3c5]"> journey.</em>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-[#e7d5ce]">
          A more intentional way to move through the web—calmly routed, carefully protected, and ready for every audience.
        </p>
        <div className="relative mt-10 aspect-[1.35] max-w-xl overflow-hidden rounded-4xl border border-white/15 bg-[linear-gradient(135deg,#ae2900_0%,#d53d12_42%,#59614a_100%)] p-6 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[12px_12px]" />
          <div className="relative flex h-full flex-col justify-between">
            <span className="w-fit rounded-full bg-[#fff8f6] px-3 py-1.5 text-xs font-bold text-[#251914]">
              <ShieldCheck className="mr-1 inline" size={14} /> Verified route
            </span>
            <p className="font-editor text-4xl italic text-white">
              “Signal, refined.”
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[[Zap, "42 ms", "Average latency"], [ShieldCheck, "A+", "Safety rating"], [Globe2, "174", "Global mesh"]].map(([Icon, value, label]) =>
            <div key={label} className="rounded-xl border border-white/10 bg-white/8 p-3">
              <Icon size={16} className="text-[#ffd3c5]" />
              <p className="mt-3 font-bold">
                {value}</p>
              <p className="text-xs text-[#cfbbb2]">
                {label}</p>
            </div>)
          }
        </div>
        <blockquote className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-[#e7d5ce]">
          “The most considered link layer we’ve used.”
          <footer className="mt-2 font-semibold text-white">
            — Vera Voss, Studio Kin
          </footer>
        </blockquote>
      </div>
      <p className="relative text-xs text-[#bca79e]">
        © 2026 SnipURL · A quieter internet, by design.
      </p>
    </aside>
  );
}
