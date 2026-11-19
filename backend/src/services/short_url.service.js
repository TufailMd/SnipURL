import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  validateDestinationUrl(url);
  const shortUrl = generateNanoId(7);

  await saveShortUrl(shortUrl, url);

  return shortUrl;
};

export const createShortUrlWithUser = async (url, slug, userId = null) => {
  validateDestinationUrl(url);
  const normalizedSlug = slug?.trim();

  if (normalizedSlug && !/^[A-Za-z0-9_-]{3,64}$/.test(normalizedSlug)) {
    const error = new Error("Custom alias must be 3-64 letters, numbers, hyphens, or underscores");
    error.statusCode = 400;
    throw error;
  }

  const shortUrl = normalizedSlug || generateNanoId(7);
  const existSlug = normalizedSlug
    ? await getCustomShortUrl(normalizedSlug)
    : null;

  if (existSlug) {
    const err = new Error("Custom short URL already exists");
    err.statusCode = 409;
    throw err;
  }

  await saveShortUrl(shortUrl, url, userId);

  return shortUrl;
};

const validateDestinationUrl = (url) => {
  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Unsupported URL protocol");
    }
  } catch {
    const error = new Error("A valid http:// or https:// destination URL is required");
    error.statusCode = 400;
    throw error;
  }
};
