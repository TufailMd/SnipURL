import { axiosInstance } from "../utils/axiosInstance.js";

export const createShortUrl = async (url, customSlug) => {
  const { data } = await axiosInstance.post("/api/create", { url, slug: customSlug });
  return data;
};
