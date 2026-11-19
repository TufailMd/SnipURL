import { axiosInstance } from "../utils/axiosInstance.js";

export const createShortUrl = async (url, customSlug) => {
  const { data } = await axiosInstance.post("/api/create", { url, customSlug });
  console.log("Response from createShortUrl API:", data); // Log the response data
  return data;
};
