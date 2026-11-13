import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);

  await saveShortUrl(shortUrl, url);

  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId) => {
  const shortUrl = generateNanoId(7);

  await saveShortUrl(shortUrl, url, userId);

  return shortUrl;
};
