
import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../queryClient";

const UrlForm = () => {

    const [url, setUrl] = useState("https://www.google.com");
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setShortUrl("");
        setCopied(false);

        try {
            setIsLoading(true);

            const generatedUrl = await createShortUrl(
                url,
                isAuthenticated ? customSlug : ""
            );

            console.log("Generated Short URL:", generatedUrl);
            setShortUrl(generatedUrl);

            await queryClient.invalidateQueries({
                queryKey: ["userUrls"]
            });

        } catch (err) {
            setError(
                err.message || "Failed to generate short URL"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch {
            setError("Unable to copy URL");
        }
    };

    return (
        <div className="space-y-4">

            <form onSubmit={handleSubmit}>

                <div>
                    <label
                        htmlFor="url"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Enter your URL
                    </label>

                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {isAuthenticated && (
                    <div className="mt-4">
                        <label
                            htmlFor="customSlug"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Custom URL (optional)
                        </label>

                        <input
                            type="text"
                            id="customSlug"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            placeholder="Enter custom slug"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? "Generating..." : "Shorten URL"}
                </button>

            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {shortUrl && (
                <div className="mt-6">

                    <h2 className="text-lg font-semibold mb-2">
                        Your shortened URL:
                    </h2>

                    <div className="flex items-center">

                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
                        />

                        <button
                            type="button"
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${copied
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default UrlForm;
