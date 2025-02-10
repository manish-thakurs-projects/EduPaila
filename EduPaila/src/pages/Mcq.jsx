import React, { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import Spinner from "../components/Spinner";

const McqPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          searchTerm,
          category,
          limit: 12,
        }).toString();

        const response = await fetch(`/api/quiz/getquizzes?${params}`);
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch quizzes");

        setQuizzes(data.quizzes);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchQuizzes, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="flex-1 border rounded-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-2xl dark:bg-slate-900"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(quizzes.map((quiz) => quiz.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-2xl text-center font-bold mb-8">All Quizzes</h1>

      {loading ? (
        <div className="flex justify-center mt-8">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      )}

      {!loading && !error && quizzes.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No quizzes found matching your criteria
        </div>
      )}
    </div>
  );
};

export default McqPage;
