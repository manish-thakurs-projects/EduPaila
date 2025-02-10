import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createQuiz,
  deleteQuiz,
  getQuizzes,
  updateQuiz,
  submitQuiz,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createQuiz);
router.get("/getquizzes", getQuizzes);
router.delete("/deletequiz/:quizId/:userId", verifyToken, deleteQuiz);
router.put("/updatequiz/:quizId/:userId", verifyToken, updateQuiz);
router.post("/submitquiz", verifyToken, submitQuiz);

export default router;
