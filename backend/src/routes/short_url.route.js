import express from "express";
import { createShortUrl } from "../controller/short_url.controller.js";
import { optionalAuthMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", optionalAuthMiddleware, createShortUrl);

export default router;
