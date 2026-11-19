import bcryptjs from "bcryptjs";
import {
  findUserByUsernameOrEmail,
  findUserByEmail,
  createUser,
  findUserById,
} from "../dao/user.dao.js";
import { signToken, verifyToken } from "../utils/helper.js";

export const registerUser = async (userData) => {
  const username = userData.username?.trim();
  const email = userData.email?.trim().toLowerCase();
  const { password } = userData;

  validateRegistration({ username, email, password });

  const existingUser = await findUserByUsernameOrEmail(username, email);

  if (existingUser) {
    const error = new Error("Username or email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  const user = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = signToken({ id: user._id, type: "access" }, "15m");

  const refreshToken = signToken({ id: user._id, type: "refresh" }, "7d");

  return { user, accessToken, refreshToken };
};

export const loginUser = async (userData) => {
  const email = userData.email?.trim().toLowerCase();
  const { password } = userData;

  if (!isValidEmail(email) || typeof password !== "string" || !password) {
    const error = new Error("A valid email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = signToken({ id: user._id, type: "access" }, "15m");

  const refreshToken = signToken({ id: user._id, type: "refresh" }, "7d");

  return { user, accessToken, refreshToken };
};

// REFRESH TOKEN
export const refreshUserTokens = async (token) => {
  const decoded = verifyToken(token);

  if (decoded.type !== "refresh") {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = signToken({ id: user._id, type: "access" }, "15m");

  const refreshToken = signToken({ id: user._id, type: "refresh" }, "7d");

  return { accessToken, refreshToken };
};

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateRegistration = ({ username, email, password }) => {
  if (typeof username !== "string" || username.length < 2 || username.length > 80) {
    const error = new Error("Username must be between 2 and 80 characters");
    error.statusCode = 400;
    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error("A valid email address is required");
    error.statusCode = 400;
    throw error;
  }

  if (typeof password !== "string" || password.length < 8) {
    const error = new Error("Password must be at least 8 characters");
    error.statusCode = 400;
    throw error;
  }
};
