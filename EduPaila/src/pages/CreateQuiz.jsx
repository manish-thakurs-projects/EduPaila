import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { FaCheck } from "react-icons/fa";


const CreateQuiz = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'uncategorized',
    questions: [
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
      },
    ],
  });

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: '',
          options: [
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
          ],
        },
      ],
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = formData.questions.filter(
      (_, index) => index !== questionIndex
    );
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({
      optionText: '',
      isCorrect: false,
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.filter((_, index) => index !== optionIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].questionText = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.title || formData.questions.length === 0) {
        throw new Error('Title and at least one question are required');
      }

      const res = await axios.post('/api/quiz/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      if (res.status === 201) {
        toast.success('Quiz created successfully!');
        navigate(`/quiz/${res.data.slug}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-slate-900 rounded-lg shadow-2xl bg-slate-100 my-20 ">
      <h1 className="text-3xl font-bold mb-6 dark:text-slate-300 text-gray-800">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium dark:text-slate-300 text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-2xl focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-slate-300 text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-2xl focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-slate-300  text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md shadow-sm dark:bg-slate-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="English">English</option>
          </select>
        </div>

        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="border p-4 rounded-lg dark:bg-slate-900 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium dark:text-slate-300 text-gray-800">Question {questionIndex + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove Question
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question Text</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-4">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={option.optionText}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, 'optionText', e.target.value)
                    }
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Option text"
                    required
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correct-answer-${questionIndex}`}
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, 'isCorrect', e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700"><FaCheck /></span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddOption(questionIndex)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Option
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Question
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateQuiz;