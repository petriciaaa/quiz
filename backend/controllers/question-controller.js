import questionModel from "../models/question-model.js";

class QuestionController {
  async create(req, res) {
    try {
      const { title, answers, correct_answer } = req.body;

      const newQuestion = new questionModel({
        title,
        answers,
        correct_answer,
      });

      const savedQuestion = await newQuestion.save();

      res.json(savedQuestion);
      res.status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new QuestionController();
