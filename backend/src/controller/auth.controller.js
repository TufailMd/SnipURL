import tryCatchWrapper from "../utils/tryCatchWrapper.js";
import {
  registerUser,
  loginUser,
  refreshUserTokens,
} from "../services/auth.service.js";

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
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

  return res.status(201).json({
    message: "User registered successfully",
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

  return res.status(200).json({
    message: "User logged in successfully",
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
      message: "Refresh token not found",
    });
  }

  const { accessToken, refreshToken } = await refreshUserTokens(token);

  setRefreshTokenCookie(res, refreshToken);

  return res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken,
  });
});
