
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Clipboard,
    Download,
    ExternalLink,
    Link2,
    RefreshCw,
    Search,
    X,
} from "lucide-react";

import { useMemo, useState } from "react";

const PAGE_SIZES = [10, 25, 50];

const csvValue = (value) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`;

// ==================== Links Header ====================

export function LinksHeader({ onCreate, onExport, hasLinks }) {
    return (
        <section className="flex flex-wrap items-end justify-between gap-5">
            <div>
                <p className="text-sm text-[#806860]">
                    Workspace <span className="mx-1">/</span> Directory
                </p>

                <h1 className="font-display mt-2 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
                    My Links
                </h1>

                <p className="mt-2 max-w-xl text-[#765d56]">
                    Manage all your shortened links, tags, and custom domains in one
                    composed place.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={onExport}
                    disabled={!hasLinks}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5dcce] bg-white px-4 text-sm font-bold text-[#5b403a] hover:bg-[#fff1ec] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Download size={17} />
                    Export CSV
                </button>

                <button
                    onClick={onCreate}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[#ae2900] px-5 text-sm font-bold text-white shadow-md shadow-[#ae2900]/20 hover:bg-[#d53d12]"
                >
                    <Link2 size={17} />
                    Create New Link
                </button>
            </div>
        </section>
    );
}

// ==================== Links Metrics ====================

export function LinksMetrics({ urls, loading }) {
    const totalClicks = urls.reduce(
        (sum, url) => sum + (Number(url.clicks) || 0),
        0
    );

    const cards = [
        ["Total Click Volume", loading ? null : totalClicks, "Aggregate across saved links"],
        ["Active Endpoints", null, "Status is not available"],
        ["Top Geography", null, "Geography is not available"],
        ["Average Latency", null, "Latency is not available"],
    ];

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(([label, value, note]) => (
                <article
                    key={label}
                    className="rounded-2xl border border-[#e5dcce] bg-white p-5 shadow-sm"
                >
                    <p className="text-sm font-medium text-[#765d56]">{label}</p>

                    {loading ? (
                        <span className="mt-4 block h-8 w-20 animate-pulse rounded bg-[#f3ebdd]" />
                    ) : (
                        <p className="font-display mt-4 text-3xl font-bold">
                            {value === null ? "—" : value.toLocaleString()}
                        </p>
                    )}

                    <p className="mt-2 text-xs text-[#91756d]">{note}</p>
                </article>
            ))}
        </section>
    );
}

// ==================== Links Toolbar ====================

export function LinksToolbar({
    search,
    setSearch,
    sort,
    setSort,
    selected,
    clearSelected,
    refetching,
    onRefresh,
    disabledFilters,
}) {
    return (
        <section className="rounded-3xl border border-[#e5dcce] bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3847a]"
                        size={18}
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by original or short URL, tags, slug..."
                        className="h-11 w-full rounded-xl border border-[#e5dcce] bg-[#fff8f6] pl-10 pr-9 text-sm outline-none focus:border-[#ae2900] focus:ring-4 focus:ring-[#ae2900]/10"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                            className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-[#806860] hover:bg-[#fff1ec]"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 rounded-xl border border-[#e5dcce] bg-white px-3 text-sm font-semibold text-[#5b403a] outline-none"
                >
                    <option value="default">Default order</option>
                    <option value="clicks">Most clicks</option>
                    <option disabled>Newest first — unavailable</option>
                    <option disabled>Lowest velocity — unavailable</option>
                    <option disabled>Expiration date — unavailable</option>
                </select>

                <button
                    onClick={onRefresh}
                    disabled={refetching}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e5dcce] px-4 text-sm font-bold text-[#5b403a] hover:bg-[#fff1ec] disabled:opacity-60"
                >
                    <RefreshCw
                        className={refetching ? "animate-spin" : ""}
                        size={17}
                    />
                    Refresh
                </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {[
                    ["all", "All Links"],
                    ["active", "Active"],
                    ["expired", "Expired"],
                    ["protected", "Password Protected"],
                    ["qr", "With QR Codes"],
                ].map(([value, label]) => (
                    <button
                        key={value}
                        disabled={value !== "all"}
                        title={value === "all" ? "Show all loaded links" : disabledFilters}
                        className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${value === "all"
                            ? "bg-[#ae2900] text-white"
                            : "cursor-not-allowed border border-[#e5dcce] text-[#a68c85]"
                            }`}
                    >
                        {label}
                        {value === "all" ? "" : " · —"}
                    </button>
                ))}
            </div>

            {selected.size > 0 && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fff1ec] px-3 py-2 text-sm text-[#5b403a]">
                    <span>
                        <strong>{selected.size}</strong> selected
                    </span>

                    <button
                        onClick={clearSelected}
                        className="font-bold text-[#ae2900]"
                    >
                        Clear selection
                    </button>
                </div>
            )}
        </section>
    );
}

// ==================== Link Actions ====================

function LinkActions({ link, copied, onCopy }) {
    return (
        <div className="flex items-center justify-end gap-1">
            <button
                onClick={() => onCopy(link)}
                aria-label={`Copy ${link.short_url}`}
                className="grid size-9 place-items-center rounded-lg text-[#ae2900] hover:bg-[#fff1ec]"
            >
                {copied ? <Check size={17} /> : <Clipboard size={17} />}
            </button>

            <a
                href={link.full_url}
                target="_blank"
                rel="noreferrer"
                aria-label="Open original destination"
                className="grid size-9 place-items-center rounded-lg text-[#5b403a] hover:bg-[#fff1ec]"
            >
                <ExternalLink size={17} />
            </a>
        </div>
    );
}

// ==================== Links List ====================

export function LinksList({
    links,
    loading,
    error,
    selected,
    toggle,
    toggleAll,
    copiedId,
    onCopy,
}) {
    if (error) {
        return (
            <p className="rounded-xl bg-[#fff0ed] p-4 text-sm text-[#a22a09]">
                Unable to load links: {error.message}
            </p>
        );
    }

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="h-16 animate-pulse rounded-xl bg-[#f3ebdd]"
                    />
                ))}
            </div>
        );
    }

    if (!links.length) {
        return (
            <div className="rounded-2xl bg-[#fff1ec] p-10 text-center">
                <Link2 className="mx-auto text-[#ae2900]" />

                <p className="mt-3 font-semibold">
                    No links match this view.
                </p>

                <p className="mt-1 text-sm text-[#765d56]">
                    Try a different search or create a new short link.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table */}

            <div className="hidden overflow-hidden rounded-3xl border border-[#e5dcce] bg-white md:block">
                <table className="w-full text-left">
                    <thead className="border-b border-[#eee1da] bg-[#fffaf8] text-xs uppercase tracking-widest text-[#806860]">
                        <tr>
                            <th className="w-12 px-5 py-4">
                                <input
                                    type="checkbox"
                                    checked={
                                        links.length > 0 &&
                                        links.every((link) => selected.has(link._id))
                                    }
                                    onChange={() => toggleAll(links)}
                                    aria-label="Select visible links"
                                    className="size-4 accent-[#ae2900]"
                                />
                            </th>

                            <th className="px-3 py-4">Short URL</th>
                            <th className="px-3 py-4">Destination</th>
                            <th className="px-3 py-4">Clicks</th>
                            <th className="px-3 py-4">Created</th>
                            <th className="px-3 py-4">Status</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#f0e4dd]">
                        {links.map((link) => (
                            <tr key={link._id} className="hover:bg-[#fffaf8]">
                                <td className="px-5 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(link._id)}
                                        onChange={() => toggle(link._id)}
                                        aria-label={`Select ${link.short_url}`}
                                        className="size-4 accent-[#ae2900]"
                                    />
                                </td>

                                <td className="max-w-40 px-3 py-4 font-semibold text-[#ae2900]">
                                    <span className="block truncate">
                                        /{link.short_url}
                                    </span>
                                </td>

                                <td className="max-w-xs px-3 py-4 text-sm text-[#5b403a]">
                                    <span
                                        className="block truncate"
                                        title={link.full_url}
                                    >
                                        {link.full_url}
                                    </span>
                                </td>

                                <td className="px-3 py-4 text-sm font-semibold">
                                    {link.clicks || 0}
                                </td>

                                <td className="px-3 py-4 text-sm text-[#806860]">
                                    —
                                </td>

                                <td className="px-3 py-4 text-sm text-[#806860]">
                                    —
                                </td>

                                <td className="px-5 py-4">
                                    <LinkActions
                                        link={link}
                                        copied={copiedId === link._id}
                                        onCopy={onCopy}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}

            <div className="space-y-3 md:hidden">
                {links.map((link) => (
                    <article
                        key={link._id}
                        className="rounded-2xl border border-[#e5dcce] bg-white p-4"
                    >
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                checked={selected.has(link._id)}
                                onChange={() => toggle(link._id)}
                                aria-label={`Select ${link.short_url}`}
                                className="mt-1 size-4 accent-[#ae2900]"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="truncate font-bold text-[#ae2900]">
                                    /{link.short_url}
                                </p>

                                <p className="mt-1 truncate text-sm text-[#5b403a]">
                                    {link.full_url}
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-[#806860]">
                                        {link.clicks || 0} total clicks
                                    </span>

                                    <span className="text-xs text-[#91756d]">
                                        Date unavailable
                                    </span>
                                </div>
                            </div>

                            <LinkActions
                                link={link}
                                copied={copiedId === link._id}
                                onCopy={onCopy}
                            />
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}

// ==================== Links Pagination ====================

export function LinksPagination({
    total,
    page,
    setPage,
    size,
    setSize,
}) {
    const pages = Math.max(1, Math.ceil(total / size));

    return (
        <footer className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#765d56]">
            <span>
                Showing {total ? (page - 1) * size + 1 : 0} to{" "}
                {Math.min(page * size, total)} of {total} entries
            </span>

            <div className="flex items-center gap-2">
                <select
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value));
                        setPage(1);
                    }}
                    className="h-9 rounded-lg border border-[#e5dcce] bg-white px-2"
                >
                    {PAGE_SIZES.map((value) => (
                        <option key={value}>{value}</option>
                    ))}
                </select>

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="grid size-9 place-items-center rounded-lg border border-[#e5dcce] disabled:opacity-40"
                >
                    <ChevronLeft size={17} />
                </button>

                <span className="min-w-8 text-center font-semibold">
                    {page} / {pages}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === pages}
                    className="grid size-9 place-items-center rounded-lg border border-[#e5dcce] disabled:opacity-40"
                >
                    <ChevronRight size={17} />
                </button>
            </div>
        </footer>
    );
}

// ==================== Download Links CSV ====================

export function downloadLinksCsv(links) {
    const headers = [
        "Short URL",
        "Original destination",
        "Clicks",
    ];

    const rows = links.map((link) => [
        link.short_url,
        link.full_url,
        link.clicks || 0,
    ]);

    const blob = new Blob(
        [
            [headers, ...rows]
                .map((row) => row.map(csvValue).join(","))
                .join("\n"),
        ],
        { type: "text/csv;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "snipurl-links.csv";
    anchor.click();

    URL.revokeObjectURL(url);
}

// ==================== Link Controls Hook ====================

export function useLinkControls(urls) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [selected, setSelected] = useState(new Set());

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        const matches = query
            ? urls.filter((link) =>
                `${link.short_url} ${link.full_url}`
                    .toLowerCase()
                    .includes(query)
            )
            : urls;

        return sort === "clicks"
            ? [...matches].sort(
                (a, b) => (b.clicks || 0) - (a.clicks || 0)
            )
            : matches;
    }, [urls, search, sort]);

    const pageCount = Math.max(
        1,
        Math.ceil(filtered.length / size)
    );

    const safePage = Math.min(page, pageCount);

    const visible = filtered.slice(
        (safePage - 1) * size,
        safePage * size
    );

    const changeSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const changeSort = (value) => {
        setSort(value);
        setPage(1);
    };

    const toggle = (id) =>
        setSelected((current) => {
            const next = new Set(current);

            next.has(id) ? next.delete(id) : next.add(id);

            return next;
        });

    const toggleAll = (items) =>
        setSelected((current) => {
            const next = new Set(current);

            const selectAll = !items.every((item) =>
                next.has(item._id)
            );

            items.forEach((item) =>
                selectAll
                    ? next.add(item._id)
                    : next.delete(item._id)
            );

            return next;
        });

    return {
        search,
        setSearch: changeSearch,
        sort,
        setSort: changeSort,
        page: safePage,
        setPage,
        size,
        setSize,
        selected,
        setSelected,
        filtered,
        visible,
        toggle,
        toggleAll,
    };
}
