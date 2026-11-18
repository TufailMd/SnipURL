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
