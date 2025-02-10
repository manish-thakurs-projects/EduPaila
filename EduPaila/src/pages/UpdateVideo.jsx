import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";
import ReactQuill from "react-quill";

const UpdateVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    category: "",
  });
  const [thumbnail, setThumbnail] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/video/details/${videoId}`);
      const videoData = response.data.video;
      setFormData(videoData);
      if (videoData.youtubeUrl) {
        const videoId = extractVideoIdFromUrl(videoData.youtubeUrl);
        if (videoId)
          setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };
  const handleDescriptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const extractVideoIdFromUrl = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "youtubeUrl") {
      const videoId = extractVideoIdFromUrl(value);
      if (videoId) {
        setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        setUrlError("");
      } else {
        setThumbnail("");
        setUrlError("Please enter a valid YouTube URL.");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/video/update/${videoId}`, formData);
      navigate("/video");
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter the video title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleDescriptionChange}
          className="mb-4 bg-white dark:bg-slate-900 rounded"
          placeholder="Enter the video description"
        />
        <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">
          YouTube URL
        </label>
        <input
          id="youtubeUrl"
          type="url"
          name="youtubeUrl"
          placeholder="Enter the YouTube URL"
          value={formData.youtubeUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        {thumbnail && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Thumbnail Preview:</h3>
            <img
              src={thumbnail}
              alt="Video Thumbnail"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Category</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="english">English</option>
          <option value="computer">Computer</option>
        </select>
        <Button
          type="submit"
          color="blue"
          pill
          outline
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Video"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateVideo;
