import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authMiddleware, authController.getCurrentUser);

export default authRouter;
