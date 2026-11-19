import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const authMiddleware = tryCatchWrapper(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token not found",
    });
  }

  try {
    const decoded = verifyToken(token);

    if (decoded.type !== "access") {
      const error = new Error("Invalid access token");
      error.statusCode = 401;
      throw error;
    }

    const user = await findUserById(decoded.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
});

// Link creation is public, but an authenticated request should retain ownership
// and be allowed to use a custom alias. Invalid bearer tokens remain rejected.
export const optionalAuthMiddleware = tryCatchWrapper(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next();
  }

  const decoded = verifyToken(token);

  if (decoded.type !== "access") {
    const error = new Error("Invalid access token");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
});
