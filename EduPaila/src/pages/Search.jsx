import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { HiFilter, HiX, HiSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchBarRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        setShowMore(data.posts.length === 9);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (res.ok) {
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const searchBarVariants = {
    open: { y: 0, opacity: 1, scale: 1 },
    closed: { y: 20, opacity: 0, scale: 0.95 },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
          className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 hidden rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 "
        >
          <HiSearch className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          {isSidebarOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <HiFilter className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isSearchBarOpen && (
          <motion.div
            ref={searchBarRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={searchBarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-32 right-8 z-50 bg-white dark:bg-gray-800 hidden p-4 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90"
          >
            <TextInput
              placeholder="Search posts..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-64 px-4 py-3 rounded-xl border-0 ring-2 ring-gray-200 hidden focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-800 shadow-2xl backdrop-blur-lg bg-opacity-95"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Refine Results
              </h2>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <TextInput
                    placeholder="Search posts..."
                    id="searchTerm"
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className="rounded-lg hover:ring-2 hover:ring-blue-100 transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id="sort"
                    className="rounded-lg hover:ring-2 hover:ring-purple-100 transition-all"
                  >
                    <option value="desc">Latest First</option>
                    <option value="asc">Oldest First</option>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id="category"
                    className="rounded-lg hover:ring-2 hover:ring-pink-100 transition-all"
                  >
                    <option value="uncategorized">All Categories</option>
                    <option value="Notes">Notes</option>
                    <option value="Mcq">MCQs</option>
                    <option value="Numericals">Numericals</option>
                  </Select>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                  >
                    Apply Filters
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6">
        <div className="flex justify-center align-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-gray-800 to-blue-800 dark:from-gray-100 dark:to-blue-200 bg-clip-text text-transparent px-6"
          >
            {posts.length} Resources Found
          </motion.h1>
        </div>
        <div className="px-6">
          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No posts match your search criteria
              </p>
            </div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-12"
            >
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard
                    post={post}
                    className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={handleShowMore}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
