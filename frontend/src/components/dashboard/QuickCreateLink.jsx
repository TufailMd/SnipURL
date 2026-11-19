
import {
    Check,
    Clipboard,
    Link2,
    LoaderCircle,
} from "lucide-react";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../../api/shortUrl.api";

// Validate destination URL
const validUrl = (value) => {
    try {
        return ["http:", "https:"].includes(
            new URL(value).protocol
        );
    } catch {
        return false;
    }
};

// Quick Create Link Component
export default function QuickCreateLink({ formRef }) {
    const [url, setUrl] = useState("");
    const [slug, setSlug] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const client = useQueryClient();

    // Handle link creation
    const submit = async (e) => {
        e.preventDefault();

        if (!validUrl(url)) {
            return setError(
                "Enter a complete destination URL beginning with http:// or https://."
            );
        }

        setLoading(true);
        setError("");
        setShortUrl("");

        try {
            const data = await createShortUrl(
                url.trim(),
                slug.trim()
            );

            setShortUrl(data);

            await client.invalidateQueries({
                queryKey: ["userUrls"],
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to create this link."
            );
        } finally {
            setLoading(false);
        }
    };

    // Copy generated short URL
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);

            setCopied(true);

            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setError("Unable to copy the short link.");
        }
    };

    return (
        <section
            ref={formRef}
            className="rounded-[1.65rem] bg-[#ae2900] p-5 text-white shadow-xl shadow-[#ae2900]/20 sm:p-7"
        >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#ffd3c5]">
                        Quick create
                    </p>

                    <h2 className="font-display mt-1 text-2xl font-bold">
                        Make a new connection.
                    </h2>
                </div>

                <span className="grid size-10 place-items-center rounded-xl bg-white/12">
                    <Link2 size={20} />
                </span>
            </div>

            {/* Link Creation Form */}
            <form
                onSubmit={submit}
                className="mt-6 grid gap-3 lg:grid-cols-[1.5fr_1fr_auto]"
            >
                {/* Destination URL */}
                <label className="sr-only" htmlFor="destination">
                    Destination URL
                </label>

                <input
                    id="destination"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste a destination URL"
                    className="h-12 min-w-0 rounded-xl border border-white/25 bg-white px-4 text-[#251914] outline-none placeholder:text-[#9c7e75] focus:ring-4 focus:ring-white/25"
                    required
                />

                {/* Custom Alias */}
                <label className="sr-only" htmlFor="alias">
                    Custom alias
                </label>

                <input
                    id="alias"
                    value={slug}
                    onChange={(e) =>
                        setSlug(e.target.value.replace(/\s/g, ""))
                    }
                    placeholder="Custom alias (optional)"
                    className="h-12 min-w-0 rounded-xl border border-white/25 bg-white/10 px-4 text-white outline-none placeholder:text-[#ffd3c5] focus:ring-4 focus:ring-white/20"
                />

                {/* Submit Button */}
                <button
                    disabled={loading}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#fff8f6] px-6 font-bold text-[#ae2900] transition hover:bg-white disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <LoaderCircle
                                className="animate-spin"
                                size={18}
                            />
                            Snipping…
                        </>
                    ) : (
                        "Snip Link"
                    )}
                </button>
            </form>

            {/* Feature Information */}
            <p className="mt-3 text-xs text-[#ffd3c5]">
                Expiration, UTM building, password protection, and QR
                export are not available from the current API.
            </p>

            {/* Error Message */}
            {error && (
                <p
                    role="alert"
                    className="mt-4 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#a22a09]"
                >
                    {error}
                </p>
            )}

            {/* Generated Short URL */}
            {shortUrl && (
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-white/12 p-3">
                    <span className="min-w-0 flex-1 truncate font-semibold">
                        {shortUrl}
                    </span>

                    <button
                        type="button"
                        onClick={copy}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#ae2900]"
                    >
                        {copied ? (
                            <Check size={16} />
                        ) : (
                            <Clipboard size={16} />
                        )}

                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            )}
        </section>
    );
}
