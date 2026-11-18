import { axiosInstance, setAccessToken } from "../utils/axiosInstance.js";

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });

  setAccessToken(data.accessToken);

  return data;
};

export const registerUser = async (username, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    username,
    email,
    password,
  });

  setAccessToken(data.accessToken);

  return data;
};

export const refreshUserTokens = async () => {
  const { data } = await axiosInstance.post("/api/auth/refresh");

  setAccessToken(data.accessToken);

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");

  return data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/api/auth/logout");
  setAccessToken(null);
};
