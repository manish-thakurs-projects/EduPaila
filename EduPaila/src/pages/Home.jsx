import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "flowbite-react";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="overflow-hidden ">
      <section
        className="relative min-h-[70vh] flex items-center px-3 bg-black/40
       dark:bg-black/20"
      >
        <div className="max-w-6xl mx-auto text-center text-white space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg"
          >
            Unleash Your Potential with{" "}
            <span className="text-yellow-300">Edupaila</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Dive into a world of knowledge with our interactive courses, expert
            mentors, and vibrant community. Transform your curiosity into
            expertise!
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CallToAction />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-3 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 fire-text">
            Fresh from the Oven
          </h2>
          <p className="text-gray-600 mt-3 max-w-lg mx-auto">
            Explore our latest and most popular learning resources
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} height={300} className="rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="alert alert-error max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error loading posts: {error}</span>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.slice(0, 6).map((post) => (
              <motion.div key={post._id} variants={itemVariants}>
                <PostCard
                  post={post}
                  className="hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 flex justify-center items-center"
          >
            <Button color="blue" pill outline className="animate-pulse">
              <Link to="/search">Explore All Content</Link>
            </Button>
          </motion.div>
        )}
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-3 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl">
            <div className="text-blue-600 text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Expert-Led Courses</h3>
            <p className="text-gray-600">
              Learn from industry professionals and academic experts
            </p>
          </div>

          <div className="text-center p-6 rounded-xl">
            <div className="text-purple-600 text-5xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
            <p className="text-gray-600">
              Study at your own pace, anytime and anywhere
            </p>
          </div>

          <div className="text-center p-6 rounded-xl">
            <div className="text-pink-600 text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Vibrant Community</h3>
            <p className="text-gray-600">
              Connect with fellow learners and mentors
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
