import {
    BarChart3,
    Check,
    Clipboard,
    ExternalLink,
    Link2,
    SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../../api/user.api";

function Skeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-[#f3ebdd] ${className}`}
        />
    );
}

export function WelcomeSection({ user }) {
    const date = new Intl.DateTimeFormat(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date());

    return (
        <section className="flex flex-wrap items-end justify-between gap-5">
            <div>
                <p className="text-sm text-[#806860]">
                    Workspace <span className="mx-1">/</span> Overview
                </p>

                <h1 className="font-display mt-2 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
                    Good to see you, {user?.username || "there"}.
                </h1>

                <p className="mt-2 text-[#765d56]">
                    Here’s a clear view of your link activity.
                </p>
            </div>

            <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#e5dcce] bg-white px-3 py-2 text-sm text-[#5b403a]">
                    {date}
                </span>

                <button
                    type="button"
                    title="Filtering is not available from the current API"
                    className="grid size-10 place-items-center rounded-full border border-[#e5dcce] bg-white text-[#5b403a]"
                >
                    <SlidersHorizontal size={18} />
                </button>
            </div>
        </section>
    );
}

export function Metrics({ urls, loading }) {
    const total = urls?.length || 0;

    const clicks =
        urls?.reduce(
            (sum, url) => sum + (Number(url.clicks) || 0),
            0
        ) || 0;

    const data = [
        ["Total Links", loading ? null : total, Link2],
        ["Total Clicks", loading ? null : clicks, BarChart3],
        ["Active Links", null, null],
        ["Clicks Today", null, null],
    ];

    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.map(([label, value, Icon]) => (
                <article
                    key={label}
                    className="rounded-2xl border border-[#e5dcce] bg-white p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#765d56]">
                            {label}
                        </p>

                        {Icon && <Icon className="text-[#ae2900]" size={18} />}
                    </div>

                    {loading ? (
                        <Skeleton className="mt-5 h-8 w-20" />
                    ) : (
                        <p className="font-display mt-5 text-3xl font-bold">
                            {value === null ? "—" : value.toLocaleString()}
                        </p>
                    )}

                    <p className="mt-2 text-xs text-[#91756d]">
                        {value === null
                            ? "Unavailable from current API"
                            : "From your saved links"}
                    </p>
                </article>
            ))}
        </section>
    );
}

export function AnalyticsOverview({ urls, loading }) {
    const top = urls
        ? [...urls]
            .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
            .slice(0, 3)
        : [];

    return (
        <section
            id="analytics-overview"
            className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]"
        >
            {/* Click Activity */}
            <article className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-display text-xl font-bold">
                            Click activity
                        </p>

                        <p className="mt-1 text-sm text-[#806860]">
                            Traffic-over-time data is not available yet.
                        </p>
                    </div>

                    <BarChart3 className="text-[#ae2900]" />
                </div>

                <div className="mt-7 grid min-h-48 place-items-center rounded-2xl bg-[#fff1ec] text-center">
                    <div>
                        <BarChart3 className="mx-auto text-[#ae2900]" />

                        <p className="mt-3 font-semibold text-[#5b403a]">
                            Analytics will appear here
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-[#806860]">
                            The current backend provides aggregate click counts only.
                        </p>
                    </div>
                </div>
            </article>

            {/* Top Performing Links */}
            <article className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6">
                <p className="font-display text-xl font-bold">
                    Top-performing links
                </p>

                <p className="mt-1 text-sm text-[#806860]">
                    Ranked by total clicks
                </p>

                <div className="mt-5 space-y-4">
                    {loading ? (
                        [1, 2, 3].map((item) => (
                            <Skeleton key={item} className="h-10" />
                        ))
                    ) : top.length ? (
                        top.map((url, index) => (
                            <div
                                key={url._id}
                                className="flex items-center gap-3"
                            >
                                <span className="grid size-7 place-items-center rounded-full bg-[#fff1ec] text-xs font-bold text-[#ae2900]">
                                    {index + 1}
                                </span>

                                <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                                    /{url.short_url}
                                </span>

                                <span className="text-sm text-[#765d56]">
                                    {url.clicks || 0}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="rounded-xl bg-[#fff1ec] p-4 text-sm text-[#765d56]">
                            Create your first link to see it here.
                        </p>
                    )}
                </div>
            </article>
        </section>
    );
}

export function RecentLinks({ urls, loading, error }) {
    const [copied, setCopied] = useState(null);

    const copy = async (url) => {
        try {
            await navigator.clipboard.writeText(url.short_url);

            setCopied(url._id);

            window.setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopied(null);
        }
    };

    return (
        <section
            id="recent-links"
            className="rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="font-display text-xl font-bold">
                        Your links
                    </h2>

                    <p className="mt-1 text-sm text-[#806860]">
                        Saved destinations and total click counts
                    </p>
                </div>

                <a
                    href="#recent-links"
                    title="Full My Links page is not available yet"
                    className="text-sm font-bold text-[#ae2900]"
                >
                    View all links
                </a>
            </div>

            {error ? (
                <p className="mt-5 rounded-xl bg-[#fff0ed] p-4 text-sm text-[#a22a09]">
                    Unable to load your links: {error.message}
                </p>
            ) : loading ? (
                <div className="mt-5 space-y-3">
                    {[1, 2, 3].map((item) => (
                        <Skeleton key={item} className="h-16" />
                    ))}
                </div>
            ) : !urls?.length ? (
                <div className="mt-5 rounded-2xl bg-[#fff1ec] p-8 text-center">
                    <Link2 className="mx-auto text-[#ae2900]" />

                    <p className="mt-3 font-semibold">
                        No links in this workspace yet.
                    </p>

                    <p className="mt-1 text-sm text-[#765d56]">
                        Use Quick Create above to make your first one.
                    </p>
                </div>
            ) : (
                <div className="mt-5 divide-y divide-[#f0e4dd]">
                    {urls.slice(0, 5).map((url) => (
                        <article
                            key={url._id}
                            className="flex items-center gap-3 py-4"
                        >
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff1ec] text-[#ae2900]">
                                <Link2 size={18} />
                            </span>

                            <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold">
                                    /{url.short_url}
                                </p>

                                <p className="truncate text-sm text-[#806860]">
                                    {url.full_url}
                                </p>
                            </div>

                            <span className="hidden text-sm text-[#5b403a] sm:block">
                                {url.clicks || 0} clicks
                            </span>

                            <button
                                onClick={() => copy(url)}
                                aria-label={`Copy ${url.short_url}`}
                                className="grid size-9 place-items-center rounded-lg text-[#ae2900] hover:bg-[#fff1ec]"
                            >
                                {copied === url._id ? (
                                    <Check size={17} />
                                ) : (
                                    <Clipboard size={17} />
                                )}
                            </button>

                            <a
                                href={url.full_url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Visit original destination"
                                className="grid size-9 place-items-center rounded-lg text-[#5b403a] hover:bg-[#fff1ec]"
                            >
                                <ExternalLink size={17} />
                            </a>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export function DashboardData({ children }) {
    const query = useQuery({
        queryKey: ["userUrls"],
        queryFn: getAllUserUrls,
        staleTime: 0,
    });

    return children({
        urls: query.data?.urls || [],
        loading: query.isLoading,
        error: query.isError ? query.error : null,
    });
}
