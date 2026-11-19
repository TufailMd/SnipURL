
import {
    BarChart3,
    Check,
    ChevronDown,
    Clipboard,
    Download,
    FileJson,
    Globe2,
    Laptop,
    MapPin,
    RefreshCw,
    Users,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

// ==================== Export Utilities ====================

const exportFile = (content, name, type) => {
    const blob = new Blob([content], { type });

    const href = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = name;
    anchor.click();

    URL.revokeObjectURL(href);
};

const toCsv = (urls) =>
    [
        ["Short URL", "Original destination", "Total clicks"],
        ...urls.map((url) => [
            url.short_url,
            url.full_url,
            url.clicks || 0,
        ]),
    ]
        .map((row) =>
            row
                .map(
                    (value) =>
                        `"${String(value).replaceAll('"', '""')}"`
                )
                .join(",")
        )
        .join("\n");

// ==================== Analytics Header ====================

export function AnalyticsHeader({ urls }) {
    const [open, setOpen] = useState(false);

    const exportData = (type) => {
        setOpen(false);

        if (type === "csv") {
            exportFile(
                toCsv(urls),
                "snipurl-all-time-link-engagements.csv",
                "text/csv;charset=utf-8"
            );
        } else {
            exportFile(
                JSON.stringify(
                    urls.map(({ short_url, full_url, clicks }) => ({
                        short_url,
                        full_url,
                        clicks: clicks || 0,
                    })),
                    null,
                    2
                ),
                "snipurl-all-time-link-engagements.json",
                "application/json"
            );
        }
    };

    return (
        <section className="flex flex-wrap items-end justify-between gap-5">
            <div>
                <p className="text-sm font-bold uppercase tracking-[.14em] text-[#ae2900] md:hidden">
                    Telemetry &amp; Growth
                </p>

                <p className="hidden text-sm text-[#806860] md:block">
                    Workspace <span className="mx-1">/</span> Analytics
                </p>

                <h1 className="font-display mt-2 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
                    <span className="md:hidden">Performance</span>
                    <span className="hidden md:inline">
                        Link Analytics
                    </span>
                </h1>

                <p className="mt-2 max-w-2xl text-[#765d56]">
                    Understand how your audience navigates and interacts
                    with your journeys across global touchpoints.
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled
                    title="Click timestamps are not recorded by the current API"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5dcce] bg-white px-4 text-sm font-semibold text-[#806860] disabled:cursor-not-allowed"
                >
                    <span className="hidden sm:inline">
                        All recorded clicks
                    </span>

                    <span className="sm:hidden">All time</span>

                    <ChevronDown size={16} />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        disabled={!urls.length}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#ae2900] px-4 text-sm font-bold text-white shadow-md shadow-[#ae2900]/20 disabled:opacity-50"
                    >
                        <Download size={17} />
                        Export
                    </button>

                    {open && (
                        <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-xl border border-[#e5dcce] bg-white p-1 shadow-xl">
                            <button
                                onClick={() => exportData("csv")}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[#fff1ec]"
                            >
                                <Download size={16} />
                                Download CSV
                            </button>

                            <button
                                onClick={() => exportData("json")}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[#fff1ec]"
                            >
                                <FileJson size={16} />
                                Export JSON
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// ==================== Analytics Metrics ====================

export function AnalyticsMetrics({ urls, loading }) {
    const total = urls.reduce(
        (sum, url) => sum + (Number(url.clicks) || 0),
        0
    );

    const cards = [
        [
            "Total Engagements",
            total,
            BarChart3,
            "All recorded clicks",
        ],
        [
            "Unique Reach",
            null,
            Users,
            "Visitor identity is not collected",
        ],
        [
            "Clicks Today",
            null,
            RefreshCw,
            "Click timestamps are not recorded",
        ],
        [
            "Daily Median",
            null,
            BarChart3,
            "Daily history is not recorded",
        ],
    ];

    return (
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {cards.map(([label, value, Icon, note]) => (
                <article
                    key={label}
                    className="rounded-2xl border border-[#e5dcce] bg-white p-4 shadow-sm sm:p-5"
                >
                    <Icon className="text-[#ae2900]" size={18} />

                    <p className="mt-5 text-sm font-medium text-[#765d56]">
                        {label}
                    </p>

                    {loading ? (
                        <span className="mt-2 block h-8 w-16 animate-pulse rounded bg-[#f3ebdd]" />
                    ) : (
                        <p className="font-display mt-2 text-3xl font-bold">
                            {value === null ? "—" : value.toLocaleString()}
                        </p>
                    )}

                    <p className="mt-2 text-xs leading-4 text-[#91756d]">
                        {note}
                    </p>
                </article>
            ))}
        </section>
    );
}

// ==================== Unavailable State ====================

function Unavailable({ icon: Icon, title, description }) {
    return (
        <div className="grid min-h-44 place-items-center rounded-2xl bg-[#fff1ec] p-5 text-center">
            <div>
                <Icon className="mx-auto text-[#ae2900]" size={22} />

                <p className="mt-3 font-semibold text-[#5b403a]">
                    {title}
                </p>

                <p className="mt-1 max-w-xs text-sm leading-5 text-[#806860]">
                    {description}
                </p>
            </div>
        </div>
    );
}

// ==================== Clicks Chart ====================

export function ClicksChart() {
    return (
        <section className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-display text-xl font-bold">
                        Clicks Over Time
                    </h2>

                    <p className="mt-1 text-sm text-[#806860]">
                        All-time timeline
                    </p>
                </div>

                <BarChart3 className="text-[#ae2900]" />
            </div>

            <div className="mt-6">
                <Unavailable
                    icon={BarChart3}
                    title="Time-series telemetry is unavailable"
                    description="The backend stores total clicks per link, but not individual click dates or times."
                />
            </div>
        </section>
    );
}

// ==================== Breakdown Panels ====================

export function BreakdownPanels() {
    return (
        <section className="grid gap-5 lg:grid-cols-2">
            {/* Device Breakdown */}

            <article className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
                <h2 className="font-display text-xl font-bold">
                    Device Breakdown
                </h2>

                <p className="mt-1 text-sm text-[#806860]">
                    Audience devices
                </p>

                <div className="mt-5">
                    <Unavailable
                        icon={Laptop}
                        title="Device analytics unavailable"
                        description="Device type is not collected during redirects."
                    />
                </div>
            </article>

            {/* Top Locations */}

            <article className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
                <h2 className="font-display text-xl font-bold">
                    Top Locations
                </h2>

                <p className="mt-1 text-sm text-[#806860]">
                    Geographic click distribution
                </p>

                <div className="mt-5">
                    <Unavailable
                        icon={MapPin}
                        title="Location analytics unavailable"
                        description="Geographic information is not collected during redirects."
                    />
                </div>
            </article>
        </section>
    );
}

// ==================== Top Performing Links ====================

export function TopLinks({ urls, loading }) {
    const [copied, setCopied] = useState(null);

    const total = urls.reduce(
        (sum, url) => sum + (Number(url.clicks) || 0),
        0
    );

    const top = [...urls]
        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
        .slice(0, 5);

    const copy = async (link) => {
        try {
            await navigator.clipboard.writeText(link.short_url);

            setCopied(link._id);

            window.setTimeout(() => setCopied(null), 2000);
        } catch {
            // Clipboard operation failed.
        }
    };

    return (
        <section className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-display text-xl font-bold">
                        Top Performing Links
                    </h2>

                    <p className="mt-1 text-sm text-[#806860]">
                        Ranked by all recorded clicks
                    </p>
                </div>

                <Link
                    to="/dashboard/links"
                    className="shrink-0 text-sm font-bold text-[#ae2900]"
                >
                    View all
                </Link>
            </div>

            <div className="mt-5 space-y-3">
                {loading ? (
                    [1, 2, 3].map((item) => (
                        <span
                            key={item}
                            className="block h-14 animate-pulse rounded-xl bg-[#f3ebdd]"
                        />
                    ))
                ) : !top.length ? (
                    <Unavailable
                        icon={Globe2}
                        title="No links to rank yet"
                        description="Create a short link to begin collecting aggregate clicks."
                    />
                ) : (
                    top.map((link, index) => (
                        <article
                            key={link._id}
                            className="flex items-center gap-3 rounded-xl bg-[#fffaf8] p-3"
                        >
                            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#ffe9e2] text-xs font-bold text-[#ae2900]">
                                {index + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-[#ae2900]">
                                    /{link.short_url}
                                </p>

                                <p className="truncate text-xs text-[#806860]">
                                    {link.full_url}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-bold">
                                    {link.clicks || 0}
                                </p>

                                <p className="text-xs text-[#806860]">
                                    {total
                                        ? `${(
                                            ((link.clicks || 0) / total) *
                                            100
                                        ).toFixed(1)}%`
                                        : "0%"}
                                </p>
                            </div>

                            <button
                                onClick={() => copy(link)}
                                aria-label={`Copy ${link.short_url}`}
                                className="grid size-9 shrink-0 place-items-center rounded-lg text-[#ae2900] hover:bg-[#fff1ec]"
                            >
                                {copied === link._id ? (
                                    <Check size={17} />
                                ) : (
                                    <Clipboard size={17} />
                                )}
                            </button>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

// ==================== Traffic Momentum ====================

export function Momentum() {
    return (
        <section className="rounded-3xl bg-[#59614a] p-6 text-[#fff8f6]">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-[#dfe3cf]">
                Traffic Momentum
            </p>

            <h2 className="font-editor mt-3 text-3xl italic">
                Insights, when the signal is ready.
            </h2>

            <p className="mt-3 max-w-xl leading-6 text-[#e2e5d5]">
                Insights will appear when enough time-based traffic data
                is available. Current reporting is limited to aggregate
                click counts by link.
            </p>
        </section>
    );
}

// ==================== Analytics Data Error ====================

export function AnalyticsDataError({ error }) {
    return (
        <p
            role="alert"
            className="rounded-xl bg-[#fff0ed] p-4 text-sm text-[#a22a09]"
        >
            Unable to load link totals: {error.message}
        </p>
    );
}
