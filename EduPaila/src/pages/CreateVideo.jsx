import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'flowbite-react';

const CreateVideo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: '',
  });
  const [thumbnail, setThumbnail] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoIdFromUrl = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'youtubeUrl') {
      const videoId = extractVideoIdFromUrl(value);
      if (videoId) {
        setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        setUrlError('');
      } else {
        setThumbnail('');
        setUrlError('Please enter a valid YouTube URL.');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/video/create', formData);
      navigate('/video');
    } catch (error) {
      console.error('Error creating video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
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

        {/* Description Field */}
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter the video description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* YouTube URL Field */}
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

        {/* Thumbnail Preview */}
        {thumbnail && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Thumbnail Preview:</h3>
            <img src={thumbnail} alt="Video Thumbnail" className="w-full h-48 object-cover rounded" />
          </div>
        )}

        {/* Category Dropdown */}
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-11 border rounded-2xl dark:bg-slate-900"
          required
        >
          <option value="">Select a Category</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="english">English</option>
          <option value="computer">Computer</option>
        </select>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          color='green'
          pill
          outline
          className='w-full'
        >
          {isLoading ? 'Creating...' : 'Create Video'}
        </Button>
      </form>
    </div>
  );
};

export default CreateVideo;