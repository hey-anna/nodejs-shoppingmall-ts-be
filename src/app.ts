import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./routes/api.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRoutes);

const mongoURI = process.env.LOCAL_DB_ADDRESS as string;
if (!mongoURI) {
  throw new Error("LOCAL_DB_ADDRESS is not defined in environment variables.");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

export default app;
