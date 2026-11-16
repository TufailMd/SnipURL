import { nanoid } from "nanoid";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = (payload, expiresIn) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};
