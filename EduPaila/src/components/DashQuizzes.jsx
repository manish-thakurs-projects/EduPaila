import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashQuizzes() {
  const { currentUser } = useSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(
          `/api/quiz/getquizzes?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setQuizzes(data.quizzes);
          if (data.quizzes.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchQuizzes();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = quizzes.length;
    try {
      const res = await fetch(
        `/api/quiz/getquizzes?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setQuizzes((prev) => [...prev, ...data.quizzes]);
        if (data.quizzes.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteQuiz = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/quiz/deletequiz/${quizIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setQuizzes((prev) =>
          prev.filter((quiz) => quiz._id !== quizIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && quizzes.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Quiz title</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {quizzes.map((quiz) => (
                <Table.Row
                  key={quiz._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(quiz.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/quiz/${quiz.slug}`}
                    >
                      {quiz.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    {quiz.description}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setQuizIdToDelete(quiz._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-quiz/${quiz._id}`}
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>No quizzes available yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this quiz?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteQuiz}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex justify-center items-center mt-5">
        <Button className="w-4/5" color="blue" pill outline>
          <Link to="/createquiz" className="flex justify-center items-center">
            Create New Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}
