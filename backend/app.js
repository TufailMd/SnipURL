import express from "express";
import connectDB from "./src/config/db.config.js";
import shortUrlRoute from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import dotenv from "dotenv";
import errorHandler from "./src/utils/error.middleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET - Redirection
app.get("/:id", redirectFromShortUrl);

// POST - Create short url
app.use("/api/create", shortUrlRoute);

app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on 3000");
});
