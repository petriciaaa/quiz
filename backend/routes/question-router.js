import Router from "express";
import questionController from "../controllers/question-controller.js";

const questionRouter = new Router();

questionRouter.post("/questions", questionController.create);

export default questionRouter;
