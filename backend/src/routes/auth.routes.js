import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/refresh-token", authController.refreshToken);

export default authRouter;
