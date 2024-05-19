import { Router } from "express";
import { allQuestions, addQuestion } from "../controllers/questions_controller.mjs";

const courseRouter = Router();

// ADD validation for both APIs
courseRouter.get(
    "/filter_questions",
    allQuestions
); //to get the list of courses

courseRouter.post(
    "/question",
    addQuestion
); //to get the list of courses

export default courseRouter;
