import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./src/config/db.config.js";
import shortUrlRoute from "./src/routes/short_url.route.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.route.js";

import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import errorHandler from "./src/utils/error.middleware.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user/", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/create", shortUrlRoute);

app.get("/:id", redirectFromShortUrl);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
