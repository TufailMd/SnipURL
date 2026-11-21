import mongoose from "mongoose";
import dotenv from "dotenv";
import Url from "../src/models/short_url.model.js";

dotenv.config();

const TOTAL_URLS = 50_000;
const BATCH_SIZE = 1_000;

async function seedLoadTestData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    for (let start = 0; start < TOTAL_URLS; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE, TOTAL_URLS);

      const urls = [];

      for (let i = start; i < end; i++) {
        urls.push({
          short_url: `loadtest-${i}`,
          full_url: `https://example.com/page/${i}`,
          clicks: 0,
        });
      }

      await Url.insertMany(urls, { ordered: false });

      console.log(`Inserted ${end}/${TOTAL_URLS}`);
    }

    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedLoadTestData();
