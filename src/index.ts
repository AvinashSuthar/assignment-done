import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", userRouter);

connectDB();
app.listen(3000, () => {
  console.log("Server is listening on prot ");
});
