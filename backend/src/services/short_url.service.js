import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);

  await saveShortUrl(shortUrl, url);

  return shortUrl;
};

export const createShortUrlWithUser = async (url, slug, userId = null) => {
  const shortUrl = slug || generateNanoId(7);
  const existSlug = await getCustomShortUrl(slug);

  if (existSlug) {
    const err = new Error("Custom short URL already exists");
    err.statusCode = 409;
    throw err;
  }

  await saveShortUrl(shortUrl, url, userId);

  return shortUrl;
};
