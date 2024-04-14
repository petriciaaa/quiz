require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QuestionModel = require("./models/quiz-model");

const DB_URL = `mongodb+srv://${process.env.USERNAME__MONGO__DB}:${process.env.PASSWORD__MONGO__DB}@cluster0.9bqw1wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post("/questions", async (req, res) => {
  try {
    const { question, answers, correct_answer } = req.body;

    const newQuestion = new QuestionModel({
      question,
      answers,
      correct_answer,
    });

    const savedQuestion = await newQuestion.save();

    res.json(savedQuestion);
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
