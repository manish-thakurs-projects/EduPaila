import Quiz from "../models/quiz.model.js";
import { errorHandler } from "../utils/error.js";

export const createQuiz = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a quiz"));
    }

    const { title, description, questions, category } = req.body;

    if (!title || !questions || questions.length === 0) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newQuiz = new Quiz({
      title,
      description,
      questions,
      category,
      slug,
      userId: req.user.id,
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return next(errorHandler(404, "Quiz not found"));

    if (!req.user.isAdmin && req.user.id !== quiz.userId) {
      return next(errorHandler(403, "You are not allowed to update this quiz"));
    }

    if (req.body.title && req.body.title !== quiz.title) {
      req.body.slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const quizzes = await Quiz.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.quizId && { _id: req.query.quizId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalQuizzes = await Quiz.countDocuments();

    res.status(200).json({
      quizzes,
      totalQuizzes,
    });
  } catch (error) {
    next(error);
  }
};

export const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return next(errorHandler(404, "Quiz not found"));
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find((opt) => opt.isCorrect);

      if (userAnswer === correctOption.optionText) {
        score++;
      }
    });

    res.status(200).json({
      score,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return next(errorHandler(404, "Quiz not found"));

    if (!req.user.isAdmin && req.user.id !== quiz.userId) {
      return next(errorHandler(403, "You are not allowed to delete this quiz"));
    }

    await Quiz.findByIdAndDelete(req.params.quizId);
    res.status(200).json("Quiz deleted successfully");
  } catch (error) {
    next(error);
  }
};
