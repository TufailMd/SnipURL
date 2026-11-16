import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const attachUser = tryCatchWrapper(async (req, res, next) => {
  console.log("attachUser middleware called");
  const token = req.cookies.refreshToken;

  // Anonymous user
  if (!token) {
    return next();
  }
  try {
    const decoded = verifyToken(token);

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
