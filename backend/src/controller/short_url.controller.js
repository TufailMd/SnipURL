import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res, next) => {
  const data = req.body;

  // console.log(req.user);

  const shortUrl = req.user
    ? await createShortUrlWithUser(data.url, data.slug, req.user._id)
    : await createShortUrlWithoutUser(data.url);
  res.send(process.env.APP_URL + "/" + shortUrl);
});

// export const createCustomShortUrl = tryCatchWrapper(async (req, res, next) => {
//   const { url, slug } = req.body;
//   const shortUrl = await createShortUrlWithUser(url, slug, req.user._id);
//   res.send(process.env.APP_URL + shortUrl);
// });

export const redirectFromShortUrl = tryCatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) {
    const error = new Error("Short URL not found");
    error.statusCode = 404;
    throw error;
  }
  res.redirect(url.full_url);
});
