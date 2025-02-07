import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const Video = () => {
  const [videos, setVideos] = useState([]); // All videos fetched from the backend
  const [filteredVideos, setFilteredVideos] = useState([]); // Videos after applying filters
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter

  // Fetch all videos from the backend
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/video/getvideos");
      setVideos(response.data);
      setFilteredVideos(response.data); // Initialize filtered videos with all videos
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Function to filter videos based on search and category
  const filterVideos = (query, category) => {
    const filtered = videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(query);
      const matchesCategory = category ? video.category === category : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredVideos(filtered);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterVideos(query, selectedCategory);
  };

  // Handle category filter changes
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterVideos(searchQuery, category);
  };

  return (
    <div className="p-6">
      {/* Search & Category Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search videos..."
          className="flex-1 border rounded-2xl p-3 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {videos.length > 0 && (
          <select
            className="p-3 border rounded-2xl dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {[...new Set(videos.map((video) => video.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      </div>

      <h1 className="text-2xl text-center font-bold mb-8">All Videos</h1>

      {/* Display Filtered Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Video;
