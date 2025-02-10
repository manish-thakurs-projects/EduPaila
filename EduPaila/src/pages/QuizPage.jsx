import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Button } from "flowbite-react";

const QuizPage = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/getquizzes?slug=${slug}`);
        const data = await response.json();

        if (!response.ok || !data.quizzes.length) {
          throw new Error("Quiz not found");
        }

        setQuiz(data.quizzes[0]);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [slug]);

  const handleAnswerSelect = (selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      const correctAnswer =
        (question.options &&
          question.options.find((opt) => opt.isCorrect)?.optionText) ||
        "No correct answer";
      if (userAnswers[index] === correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/quizzes" className="text-blue-500 hover:underline">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Your Test Score For {quiz.title}
        </h1>
        <div className="dark:bg-slate-900 bg-slate-100 p-6 rounded-lg shadow-2xl max-w-md mx-auto">
          <div className="text-2xl font-semibold mb-8 flex">
            <div className="w-1/2">
              Your Score
              <div
                className={`${
                  (score / quiz.questions.length) * 100 < 40
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {score}/{quiz.questions.length}
              </div>
            </div>

            <div className="w-1/2">
              <div>Percentage</div>
              <div
                className={`${
                  (score / quiz.questions.length) * 100 < 40
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {((score / quiz.questions.length) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="mb-6">
            {quiz.questions.map((question, index) => {
              const correctAnswer =
                (question.options &&
                  question.options.find((opt) => opt.isCorrect)?.optionText) ||
                "No correct answer";
              return (
                <div key={index} className="mb-4 text-left border-b pb-4">
                  <p className="font-medium">{question.questionText}</p>
                  <p
                    className={`text-sm ${
                      userAnswers[index] === correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Your answer: {userAnswers[index] || "Not answered"}
                  </p>
                  <p className="text-sm text-green-600">
                    Correct answer: {correctAnswer}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex mt-12">
            <div className="w-1/2 flex justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                color="blue"
                pill
                outline
              >
                Retake Quiz
              </Button>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <Button color="blue" pill outline>
                <Link to="/quizzes">Back to Quizzes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="flex items-center gap-4 w-1/3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {currentQuestionIndex + 1}/{quiz.questions.length}
            </span>
          </div>
        </div>

        <div className="dark:bg-slate-900 bg-slate-100 p-6 rounded-lg shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.questionText}
          </h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.optionText)}
                className={`w-full p-4 text-left rounded-md transition-colors duration-200 ${
                  userAnswers[currentQuestionIndex] === option.optionText
                    ? "bg-slate-500 text-white"
                    : "dark:bg-slate-700 bg-slate-200 hover:bg-gray-400"
                }`}
              >
                {option.optionText}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            {currentQuestionIndex > 0 && (
              <Button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                color="gray"
                pill
                outline
              >
                Previous
              </Button>
            )}

            <div className="flex-grow"></div>

            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={!userAnswers[currentQuestionIndex]}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                color="blue"
                pill
                outline
              >
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleSubmitQuiz}
                disabled={!userAnswers[currentQuestionIndex]}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                color="green"
                pill
                outline
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
