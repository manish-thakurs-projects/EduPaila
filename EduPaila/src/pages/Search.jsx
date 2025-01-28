import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react'; // Added useRef
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { HiFilter, HiX, HiSearch } from 'react-icons/hi'; // Added HiSearch

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false); // State for search bar visibility
  const searchBarRef = useRef(null); // Ref for the search bar

  const location = useLocation();
  const navigate = useNavigate();

  // Handle clicks outside the search bar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchBarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
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
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (res.ok) {
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating Search Button */}
      <button
        onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
        className="fixed bottom-8 right-24 z-50 p-4 bg-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <HiSearch className="w-6 h-6 text-white" />
      </button>

      {/* Search Bar */}
      {isSearchBarOpen && (
        <div
          ref={searchBarRef}
          className="fixed bottom-20 right-8 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <TextInput
            placeholder="Search posts..."
            id="searchTerm"
            type="text"
            value={sidebarData.searchTerm}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
                setIsSearchBarOpen(false); // Close search bar after submitting
              }
            }}
          />
        </div>
      )}

      {/* Floating Filter Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isSidebarOpen ? (
          <HiX className="w-6 h-6 text-white" />
        ) : (
          <HiFilter className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Collapsible Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:shadow-none`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Filter Posts</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search Term
              </label>
              <TextInput
                placeholder="Search posts..."
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort By
              </label>
              <Select onChange={handleChange} value={sidebarData.sort} id="sort">
                <option value="desc">Latest First</option>
                <option value="asc">Oldest First</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
              >
                <option value="uncategorized">All Categories</option>
                <option value="Notes">Notes</option>
                <option value="Mcq">MCQs</option>
                <option value="Numericals">Numericals</option>
              </Select>
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full mt-4"
            >
              Apply Filters
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-80 p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white px-4">
          {posts.length} Results Found
        </h1>

        <div className="px-4">
          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No posts match your search criteria
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  className="hover:shadow-lg transition-shadow duration-300"
                />
              ))}
            </div>
          )}

          {showMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}