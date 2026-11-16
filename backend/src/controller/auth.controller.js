import tryCatchWrapper from "../utils/tryCatchWrapper.js";

import {
  registerUser,
  loginUser,
  refreshUserTokens,
} from "../services/auth.service.js";

import { sendResponse } from "../utils/responseHandler.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
};

// REGISTER
export const register = tryCatchWrapper(async (req, res) => {
  const { username, email, password } = req.body;

  const { user, accessToken, refreshToken } = await registerUser({
    username,
    email,
    password,
  });

  setRefreshTokenCookie(res, refreshToken);

  return sendResponse(res, 201, "User registered successfully", {
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
});

// LOGIN
export const login = tryCatchWrapper(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });

  setRefreshTokenCookie(res, refreshToken);

  return sendResponse(res, 200, "User logged in successfully", {
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
});

// REFRESH TOKEN
export const refreshToken = tryCatchWrapper(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }

  const { accessToken, refreshToken } = await refreshUserTokens(token);

  setRefreshTokenCookie(res, refreshToken);

  return sendResponse(res, 200, "Access token refreshed successfully", {
    accessToken,
  });
});

export const logout = tryCatchWrapper(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return sendResponse(res, 200, "Logout successful");
});

export const getCurrentUser = tryCatchWrapper(async (req, res) => {
  res.status(200).json({ user: req.user });
});
