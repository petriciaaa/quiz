import questionModel from "../models/questionModel.js";
import QuestionService from "../services/questionservice.js";

class QuestionController {
  async create(req, res) {
    try {
      const question = QuestionService.create(req.body);
      res.json(question);
      res.status(200);
      return res.json(question);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const questions = await QuestionService.getAll();
      return res.json(questions);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const question = await QuestionService.getOne(id);
      return res.json(question);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
  async update(req, res) {
    try {
      const question = req.body;

      const updatedQuestion = await QuestionService.update(question);
      return res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      const question = await QuestionService.delete(id);
      return res.json(question);
    } catch (error) {
      res.status(500).json({ error: "500" });
    }
  }
}

export default new QuestionController();
