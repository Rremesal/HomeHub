import { config } from "dotenv";
import mongoose from "mongoose";

config();

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("[MONGODB] Connected")
} catch (error) {
  console.log(`[MONGODB] ${error}`)
}


