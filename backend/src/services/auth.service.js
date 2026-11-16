import bcryptjs from "bcryptjs";
import {
  findUserByUsernameOrEmail,
  findUserByEmail,
  createUser,
  findUserById,
} from "../dao/user.dao.js";
import { signToken, verifyToken } from "../utils/helper.js";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;

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
  const { email, password } = userData;

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
