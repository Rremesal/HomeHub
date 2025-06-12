import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (e) {
    console.log(`MongoDB failed: ${e}`);
  }
};

export default connectDb;