import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

// Core
import "./lib/mongoose/index.js";
import userRouter from "./routers/user.router.js";

config();

const app = express();

app.use(cors({
  origin: process.env.APP_DOMAIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`[BACKEND] Listening on http://localhost:${process.env.PORT}`)
});