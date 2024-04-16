import Router from "express";
import questionController from "../controllers/question-controller.js";

const questionRouter = new Router();

questionRouter.post("/questions", questionController.create);
questionRouter.get("/questions", questionController.getAll);
questionRouter.get("/questions/:id", questionController.getOne);
questionRouter.put("/questions/:id", questionController.update);
questionRouter.patch("/questions/:id", questionController.update);
questionRouter.delete("/questions/:id", questionController.delete);

export default questionRouter;
