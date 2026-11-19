import { Check, Clipboard, Link2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { createShortUrl } from "../../api/shortUrl.api";

const isValidUrl = (value) => {
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
};

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!isValidUrl(url)) {
      setError("Enter a complete URL beginning with http:// or https://."); return;
    }
    setLoading(true); setError("");
    setShortUrl("");
    setCopied(false);
    try {
      setShortUrl(await createShortUrl(url.trim(), slug.trim()));
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "We couldn't create that short link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the link. Please copy it manually.");
    }
  };

  return (
    <section aria-labelledby="shortener-title" className="rounded-4xl border border-[#ead9d1] bg-[#fffdfc] p-5 shadow-[0_24px_70px_-35px_rgba(74,30,14,.45)] sm:p-7">

      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#ffe9e2] text-[#ae2900]">
          <Link2 size={20} />
        </span>
        <div>
          <h2 id="shortener-title" className="font-display text-lg font-bold">
            Craft a shorter path
          </h2>
          <p className="text-sm text-[#765d56]">
            One link, beautifully considered.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4" noValidate>

        <label className="block text-sm font-semibold text-[#5b403a]">
          Original destination URL
          <input type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-long-destination.com"
            className="mt-2 h-12 w-full rounded-xl border border-[#e4cfc6] bg-[#fff8f6] px-4 text-[#251914] outline-none transition placeholder:text-[#a68c85] focus:border-[#ae2900] focus:ring-4 focus:ring-[#ae2900]/10"
            required />
        </label>

        <label className="block text-sm font-semibold text-[#5b403a]">
          Custom slug alias
          <span className="font-normal text-[#91756d]">
            (optional)
          </span>

          <div className="mt-2 flex h-12 items-center rounded-xl border border-[#e4cfc6] bg-[#fff8f6] focus-within:border-[#ae2900] focus-within:ring-4 focus-within:ring-[#ae2900]/10">
            <span className="pl-4 text-sm text-[#91756d]">
              snipurl/
            </span>
            <input value={slug} onChange={(e) => setSlug(e.target.value.replace(/\s/g, ""))} placeholder="your-alias" className="min-w-0 flex-1 bg-transparent px-1 pr-4 text-[#251914] outline-none placeholder:text-[#a68c85]" />
          </div>

        </label>

        <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ae2900] px-5 font-bold text-white shadow-lg shadow-[#ae2900]/20 transition hover:bg-[#d53d12] disabled:cursor-not-allowed disabled:opacity-65">

          {loading ? <>
            <LoaderCircle className="animate-spin" size={18} />
            Shortening…</>
            : "Shorten URL"}
        </button>

      </form>

      {error &&
        <p role="alert" className="mt-4 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#ae2900]">
          {error}
        </p>
      }

      {shortUrl && <div className="mt-5 rounded-2xl bg-[#fff1ec] p-4" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#91756d]">
          Your new destination
        </p>
        <div className="mt-2 flex items-center gap-2">
          <a href={shortUrl} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-semibold text-[#ae2900] hover:underline">
            {shortUrl}
          </a>
          <button onClick={copy} type="button" aria-label="Copy shortened URL" className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#ae2900] shadow-sm hover:bg-[#ffe9e2]">
            {copied ? <Check size={17} /> : <Clipboard size={17} />
            }
          </button>
        </div>
        <p className="mt-2 truncate text-xs text-[#765d56]">
          Original: {url}
        </p>
      </div>
      }
    </section>
  );
}
