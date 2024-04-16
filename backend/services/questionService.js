import questionModel from "../models/questionModel.js";

class QuestionService {
  async create(question) {
    const newQuestion = await questionModel.create(question);
    // const savedQuestion = await newQuestion.save();
    return newQuestion;
  }

  async getAll() {
    const questions = await questionModel.find();
    return questions;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("ID not defiened");
    }
    const question = await questionModel.findById(id);
    return question;
  }
  async update(question) {
    if (!question._id) {
      throw new Error("Not found ID");
    }
    const updatedQuestion = await questionModel.findByIdAndUpdate(question._id, question, {
      new: true,
    });
    return updatedQuestion;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Not found ID");
    }
    const question = await questionModel.findByIdAndDelete(id);
    return question;
  }
}

export default new QuestionService();
