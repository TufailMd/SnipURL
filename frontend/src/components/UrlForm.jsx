
import { useState } from "react";
import { Link2, Copy, Check, ArrowRight, Loader2, Sparkles } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ShortUrlForm = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setShortUrl("");
        setCopied(false);

        try {
            const parsedUrl = new URL(url);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                throw new Error("Please enter a valid HTTP or HTTPS URL.");
            }

            setLoading(true);

            const response = await fetch(`${API_URL}/api/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to generate short URL");
            }

            const code = data.shortUrl;

            if (!code) {
                throw new Error("Short URL was not returned by the server.");
            }

            const generatedUrl = code.startsWith("http")
                ? code
                : `${API_URL}/${code}`;

            setShortUrl(generatedUrl);

        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setError("Unable to copy URL. Please copy it manually.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter your long URL
                    </label>

                    <div className="relative">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/your-long-url"
                            required
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-800"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !url.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            Shorten URL
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {shortUrl && (
                <div className="mt-6 p-5 rounded-xl bg-indigo-50 border border-indigo-200">

                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-800">
                            Your short URL is ready!
                        </h3>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-indigo-200">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-indigo-600 font-medium truncate"
                        >
                            {shortUrl}
                        </a>

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="shrink-0 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
                            title="Copy short URL"
                        >
                            {copied ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <p className="text-sm text-green-700 mt-3">
                        {copied
                            ? "Copied to clipboard!"
                            : "Your link is ready to share."}
                    </p>
                </div>
            )}

        </>
    );
};

export default ShortUrlForm;
