// require("dotenv").config();
import { config } from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import questionRouter from "./routes/questionRouter.js";

config();

const DB_URL = `mongodb+srv://${process.env.USERNAME__MONGO__DB}:${process.env.PASSWORD__MONGO__DB}@cluster0.9bqw1wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api", questionRouter);

async function startServer() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`We on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
