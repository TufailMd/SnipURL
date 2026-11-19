import { Activity, ArrowRight, BarChart3, CheckCircle2, Clipboard, Clock3, Globe2, Layers3, MousePointer2, Palette, QrCode, Route, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import UrlShortener from "./UrlShortener";

const featureData = [
  [Zap, "Instant Shortening", "Turn a winding web address into a composed, shareable link in a moment.", "Fast by design"],
  [Route, "Custom Short Links", "Choose a memorable destination that feels native to your campaign.", "Made distinct"],
  [BarChart3, "Smart Analytics", "Find the signals behind every share with clear, considerate reporting.", "See the journey"],
  [Layers3, "Link Lifecycle", "Keep every launch, redirect, and destination under calm control.", "Built to last"],
];

export function HeroSection() {
  return <section id="home" className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pb-28">

    <div className="absolute inset-x-0 top-0 -z-10 h-140 bg-[radial-gradient(circle_at_16%_16%,#ffe0d5,transparent_27%),radial-gradient(circle_at_86%_34%,#f8dfc3,transparent_24%)]" />

    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">

      <div>

        <p className="inline-flex items-center gap-2 rounded-full border border-[#e7c8bc] bg-[#fff1ec] px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-[#ae2900]">

          <Sparkles size={14} />
          The Creative URL Shortener — Version 2.4
        </p>

        <h1 className="font-display mt-6 max-w-3xl text-5xl font-bold leading-[.96] tracking-[-.055em] text-[#251914] sm:text-6xl lg:text-7xl">

          Every link has a <em className="font-editor font-normal text-[#ae2900]">
            journey.</em>

        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-[#5b403a]">

          Turn long, complicated URLs into beautiful, memorable short links. Share smarter, protect your aesthetic, and understand every click.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-[#ae2900] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#ae2900]/20 transition hover:bg-[#d53d12]">

            Start creating <ArrowRight size={18} />

          </Link>

          <button onClick={() =>
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-5 py-3.5 font-semibold text-[#5b403a] hover:bg-[#fff1ec]">

            Explore the craft
          </button>

        </div>

      </div>

      <div className="relative">
        <UrlShortener />
        <TelemetryCard />
      </div>

    </div>
  </section>
    ;
}

function TelemetryCard() {
  return (
    <aside className="relative mx-auto -mt-2 w-[88%] rounded-2xl border border-[#d8d4c4] bg-[#59614a] p-5 text-[#fff8f6] shadow-xl shadow-[#59614a]/20 sm:-mt-5 sm:ml-auto sm:mr-0 sm:w-[78%]">

      <div className="flex items-center justify-between">

        <p className="font-display font-bold">

          Node telemetry
        </p>

        <span className="flex items-center gap-1 text-xs text-[#e1e5cd]">

          <span className="size-2 rounded-full bg-[#d7e09f]" />

          Live preview
        </span>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-white/10 p-3">

          <p className="text-xs text-[#dfe3cf]">

            Edge region
          </p>

          <p className="mt-1 font-semibold">

            Mumbai, IN
          </p>

        </div>


        <div className="rounded-xl bg-white/10 p-3">

          <p className="text-xs text-[#dfe3cf]">

            Avg. latency
          </p>

          <p className="mt-1 font-semibold">

            42 ms
          </p>

        </div>

        <div className="rounded-xl bg-white/10 p-3">

          <p className="text-xs text-[#dfe3cf]">

            Global uptime
          </p>

          <p className="mt-1 font-semibold">

            99.99%
          </p>

        </div>

        <div className="rounded-xl bg-white/10 p-3">

          <p className="text-xs text-[#dfe3cf]">

            Last click origin
          </p>

          <p className="mt-1 font-semibold">

            Lisbon, PT
          </p>

        </div>

      </div>

      <p className="mt-3 text-xs leading-5 text-[#dfe3cf]">

        Illustrative network preview — not live account data.
      </p>

    </aside>
  );
}

export function TrustedBrands() {
  return (
    <section className="border-y border-[#ead9d1] bg-[#fff1ec] px-5 py-9">

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 text-lg font-bold tracking-[.12em] text-[#806860] sm:justify-between">

        <span className="text-sm font-medium tracking-normal text-[#9b7c73]">

          Trusted by thoughtful teams
        </span>

        {["Studio Kin", "VESPER", "M/FORM", "Field Notes.", "KINFOLK"].map((brand) =>
          <span key={brand}>
            {brand}</span>
        )}
      </div>

    </section>

  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-20 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-bold uppercase tracking-[.14em] text-[#ae2900]">

          The art of the route
        </p>

        <h2 className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-[-.04em] text-[#251914] sm:text-5xl">

          Precision craft for digital pathways
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {featureData.map(([Icon, title, description, label], index) =>

            <article key={title} className={`min-h-64 rounded-[1.7rem] p-6 ${index === 1 ? "bg-[#ae2900] text-white" : "bg-[#fff1ec] text-[#251914]"}`}>

              <Icon className={index === 1 ? "text-[#ffd3c5]" : "text-[#ae2900]"} />

              <p className={`mt-10 text-xs font-bold uppercase tracking-[.14em] ${index === 1 ? "text-[#ffd3c5]" : "text-[#ae2900]"}`}>

                {label}
              </p>

              <h3 className="font-display mt-2 text-xl font-bold">

                {title}
              </h3>

              <p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-[#ffe9e2]" : "text-[#765d56]"}`}>

                {description}
              </p>

            </article>
          )
          }
        </div>

      </div>

    </section>

  );
}

export function HowItWorks() {
  const steps = [
    ["01", Clipboard, "Paste your long URL.", "Bring any destination to the table."],
    ["02", Palette, "Generate & customize.", "Shape a clear, branded route in seconds."],
    ["03", Globe2, "Share & monitor anywhere.", "Follow the footprint of every meaningful click."]
  ];

  return (
    <section id="how-it-works" className="bg-[#59614a] px-5 py-20 text-[#fff8f6] lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-bold uppercase tracking-[.14em] text-[#dfe3cf]">

          Simple by nature
        </p>

        <h2 className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-[-.04em] sm:text-5xl">

          Three steps from clutter to clarity
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {steps.map(([num, Icon, title, text]) =>

            <article key={num} className="rounded-[1.7rem] border border-white/15 bg-white/8 p-6">

              <p className="text-sm font-bold text-[#d7e09f]">

                {num}
              </p>

              <Icon className="mt-12 text-[#ffe0d5]" />

              <h3 className="font-display mt-5 text-xl font-bold">

                {title}
              </h3>

              <p className="mt-3 leading-6 text-[#e2e5d5]">

                {text}
              </p>

            </article>
          )
          }
        </div>

      </div>

    </section>

  );
}

export function AnalyticsShowcase() {
  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">


      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">


        <div>


          <p className="text-sm font-bold uppercase tracking-[.14em] text-[#ae2900]">


            See the signal

          </p>


          <h2 className="font-display mt-3 text-4xl font-bold tracking-[-.04em] text-[#251914] sm:text-5xl">


            Campaign velocity, in focus.

          </h2>


          <p className="mt-5 max-w-md leading-7 text-[#5b403a]">

            A calm, human view of the activity around every thoughtful route.
          </p>

          <p className="mt-5 text-xs text-[#91756d]">

            Illustrative sample data — not live analytics.
          </p>

        </div>

        <div className="rounded-4xl border border-[#ead9d1] bg-[#fffdfc] p-5 shadow-[0_24px_70px_-40px_rgba(74,30,14,.45)] sm:p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="font-display text-xl font-bold text-[#251914]">

                Campaign Velocity
              </p>

              <p className="text-sm text-[#806860]">

                Last 30 days
              </p>

            </div>

            <Activity className="text-[#ae2900]" />

          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

            {
              [["Total engagements", "18,492"], ["Unique reach", "12,084"], ["Top channel", "Instagram"], ["Avg. device", "Mobile 72%"]].map(([label, value]) =>
                <div key={label} className="rounded-xl bg-[#fff1ec] p-3">
                  <p className="text-xs text-[#806860]">
                    {label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-[#251914]">
                    {value}</p>
                </div>
              )}</div>
          <div className="mt-6 rounded-2xl bg-[#fff1ec] p-4">
            <div className="flex justify-between text-sm font-semibold text-[#5b403a]">
              <span>
                Daily click stream</span>
              <span className="text-[#ae2900]">
                +18.4%</span>
            </div>
            <div className="mt-5 flex h-28 items-end gap-2">
              {[30, 42, 35, 58, 46, 67, 61, 83, 62, 94, 72, 88].map((h, i) =>
                <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-[#d53d12] opacity-[.82]" />
              )
              }
            </div>

          </div>

          <div className="mt-5 flex items-center justify-between text-sm">

            <span className="font-semibold text-[#5b403a]">

              Global routing
            </span>

            <span className="text-[#806860]">

              Europe 41% · North America 32% · Asia Pacific 27%
            </span>

          </div>

        </div>

      </div>

    </section>

  );
}

export function QRShowcase() {
  return (
    <section className="bg-[#fff1ec] px-5 py-20 lg:px-8 lg:py-28">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-square max-w-xl overflow-hidden rounded-4xl bg-[#ae2900] p-8 shadow-xl shadow-[#ae2900]/20">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[14px_14px]" />
          <div className="relative flex h-full items-center justify-center rounded-3xl border border-white/30 bg-[#fff8f6] p-8">
            <QrCode size={220} strokeWidth={1.15} className="max-h-full max-w-full text-[#251914]" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-1 rounded-full bg-[#59614a] px-3 py-1.5 text-xs font-bold text-white">
              <ShieldCheck size={14} />Verified destination
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[.14em] text-[#ae2900]">
            Made for touchpoints
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-[-.04em] text-[#251914] sm:text-5xl">
            Tailored QR matrices for your luxury packaging & print editions
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-[#5b403a]">
            Carry a considered digital destination from the shelf to the screen, with codes that belong in your world.
          </p>
          <ul className="mt-7 space-y-3 text-[#5b403a]">
            {["Brand-considered colour and contrast", "Confident scanning across print surfaces", "One destination, beautifully connected"].map(point =>
              <li key={point} className="flex gap-3">
                <CheckCircle2 className="shrink-0 text-[#ae2900]" size={20} /> {point}
              </li>
            )}</ul>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return <section id="cta" className="px-5 py-20 lg:px-8">
    <div className="mx-auto max-w-7xl rounded-4xl bg-[#ae2900] px-6 py-14 text-center text-white sm:px-12 lg:py-20">
      <p className="text-sm font-bold uppercase tracking-[.14em] text-[#ffd3c5]">
        Your next link awaits
      </p>
      <h2 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-[-.04em] sm:text-5xl">
        Ready to give your links a better destination?
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[#ffe9e2]">
        Create your first elegant short link free. Bring the rest of your campaign along when you’re ready.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/auth" className="rounded-full bg-[#fff8f6] px-6 py-3.5 font-bold text-[#ae2900] transition hover:bg-white">
          Get Started Free
        </Link>
        <a href="mailto:hello@snipurl.io?subject=Enterprise%20SnipURL" className="rounded-full border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">
          Talk to enterprise
        </a>
      </div>
    </div>
  </section>
    ;
}

export function Footer() {
  const groups = [
    ["Product", ["Shorten links", "Custom domains", "Analytics"]],
    ["Resources", ["Help centre", "Guides", "Status"]],
    ["Company", ["About", "Contact", "Careers"]],
    ["Legal", ["Privacy", "Terms", "Cookies"]]
  ];
  return (
    <footer className="border-t border-[#ead9d1] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2 text-[#251914]">
            <span className="grid size-8 place-items-center rounded-lg bg-[#ae2900] text-white">
              <Route size={16} />
            </span>
            <span className="text-lg font-bold">
              SnipURL
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#765d56]">
            Beautifully direct journeys for every destination you share.
          </p>
        </div>
        {groups.map(([heading, items]) =>
          <div key={heading}>
            <h3 className="font-bold text-[#251914]">
              {heading}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#765d56]">
              {items.map(item =>
                <li key={item}>
                  <a href="#" className="hover:text-[#ae2900]">
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>)
        }
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#ead9d1] pt-6 text-sm text-[#806860] sm:flex-row sm:justify-between">
        <span>
          © 2026 SnipURL. Made for clearer connections.
        </span>
        <span>
          Designed with intention.
        </span>
      </div>
    </footer>
  );
}
