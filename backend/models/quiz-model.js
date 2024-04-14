const mongoose = require("mongoose");

const QuestionModel = new mongoose.Schema({
  question: { type: String, required: true },
  answers: { type: String, required: true },
  correct_answer: { type: String, required: true },
});

module.exports = mongoose.model("QuestionModel", QuestionModel);
