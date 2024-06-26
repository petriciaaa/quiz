import mongoose from "mongoose";
const QuestionModel = new mongoose.Schema({
  title: { type: String, required: true },
  answers: { type: [], required: true },
  correct_answer: { type: String, required: true },
  category: { type: String, required: false },
});

export default mongoose.model("QuestionModel", QuestionModel);
