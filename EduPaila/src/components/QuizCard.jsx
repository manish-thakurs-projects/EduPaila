import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="dark:bg-slate-900 p-6 rounded-lg shadow-2xl">
      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span>For {quiz.category}</span>
        <Button color="blue" pill outline>
          <Link
            to={`/quiz/${quiz.slug}`}
            className="dark:text-white text-black hover:text-white"
          >
            Start test
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
