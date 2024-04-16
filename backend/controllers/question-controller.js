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

  async getAll(req, res) {
    try {
      const questions = await questionModel.find();
      return res.json(questions);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Not found ID" });
      }
      const question = await questionModel.findById(id);
      return res.json(question);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
  async update(req, res) {
    try {
      const question = req.body;
      if (!question._id) {
        res.status(400).json({ message: "Not found ID" });
      }
      const updatedQuestion = await questionModel.findByIdAndUpdate(question._id, question, {
        new: true,
      });
      return res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Not found ID" });
      }
      const question = await questionModel.findByIdAndDelete(id);
      return res.json(question);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
}

export default new QuestionController();
