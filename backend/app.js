import express from "express";
import { nanoid } from "nanoid";

import connectDB from "./src/config/db.config.js";
import urlSchema from "./src/models/short_url.model.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET - Redirection
app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await urlSchema.findOne({ short_url: id });
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("Not Found");
  }
});

// POST - Create short url
app.post("/api/create", (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(7);

  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  newUrl.save();
  res.send({ Url: newUrl });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on 3000");
});
