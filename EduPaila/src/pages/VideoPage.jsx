import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./video.css"
import { FaThumbsUp, FaShare, FaLink, FaWhatsapp, FaTimes, FaFlag } from 'react-icons/fa';
import { Button } from 'flowbite-react';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const [animateLike, setAnimateLike] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const reportPopupRef = useRef(null);
  

  useEffect(() => {
    fetchVideo();
    trackView();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/video/details/${videoId}`);
      setVideo(response.data.video);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const trackView = async () => {
    try {
      await axios.post(`/api/video/view/${videoId}`);
    } catch (error) {
      console.error('Error tracking video view:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(`/api/video/like/${videoId}`);
      setVideo((prev) => ({ ...prev, likes: response.data.likes }));
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 600);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleReport = (event) => {
    event.stopPropagation();
    setIsReportOpen(true);
  };
  const handleSendReport = () => {
    const message = encodeURIComponent(`Report for video: ${video.title}\n\nIssue: ${reportMessage}`);
    const whatsappUrl = `https://wa.me/9779801996736?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsReportOpen(false);
  };
  

  const cleanDescription = video?.description ? video.description.replace(/<p><br><\/p>/g, "").trim() : '';

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleCopyLink = async () => {
    const videoUrl = `${window.location.origin}/video/${videoId}`;
    await navigator.clipboard.writeText(videoUrl);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const handleShareOnWhatsApp = () => {
    const videoUrl = `${window.location.origin}/video/${videoId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `Check out this video for ${video.title} on:\n${videoUrl}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const secondsAgo = Math.floor((now - createdAt) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }
  };

  
  const formatViews = (views) => {
    const numViews = Number(views) || 0;
    if (numViews >= 1e9) {
      const formatted = numViews / 1e9;
      return formatted.toFixed(1).replace(/\.0$/, '') + 'b';
    } else if (numViews >= 1e6) {
      const formatted = numViews / 1e6;
      return formatted.toFixed(1).replace(/\.0$/, '') + 'm';
    } else if (numViews >= 1e3) {
      const formatted = numViews / 1e3;
      return formatted.toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return numViews.toString();
    }
  };

  if (!video)
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?autoplay=1`}
          title={video.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <h1 className="text-xl font-bold mt-4 mb-2">{video.title}</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4 border-b pb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{formatViews(video.views)} views</span>
          <span className="text-sm text-gray-600">{formatTimeAgo(video.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
        <button
      onClick={handleLike}
      className="flex items-center gap-2 px-4 focus:outline-none py-2 dark:bg-slate-900 bg-gray-300 hover:bg-gray-200 rounded-full"
    >
      <FaThumbsUp className={`text-gray-600 transition-colors ${
        animateLike ? 'text-blue-500 animate-celebrate' : ''
      }`} />
      <span className="text-sm font-medium">{video.likes?.length || 0}</span>
    </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 focus:outline-none dark:bg-slate-900 bg-gray-300 hover:bg-gray-200 rounded-full"
          >
            <FaShare className="text-gray-600" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button
            onClick={handleReport}
            className="flex items-center gap-2 px-4 py-2 focus:outline-none dark:bg-slate-900 bg-gray-300 hover:bg-gray-200 rounded-full"
          >
            <FaFlag  className="text-gray-600" />

            <span className="text-sm font-medium">Report</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-300 dark:bg-slate-900 p-4 rounded-lg">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-xs text-gray-600">#{video.category}</span>
  </div>
  
  <p
    className={`text-sm text-gray-300 ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}
    dangerouslySetInnerHTML={{ __html: cleanDescription || "No description available at the moment." }}
  />
  
  {video.description?.length > 200 && (
    <button
      onClick={toggleDescription}
      className="text-sm font-medium text-blue-600 mt-2 outline-none focus:outline-none hover:text-blue-700"
    >
      {isDescriptionExpanded ? 'Show less' : 'Show more'}
    </button>
  )}
  
  <style jsx>{`
    p a {
      color:rgb(0, 10, 22);
      text-decoration: none;
      background: gray;
      border-radius: 30px;
      padding-left: 10px;
      margin-top: 20px;
      padding-right: 10px;
    }

    p a:hover {
      color: darkblue; /* Darker blue on hover */
      text-decoration: underline; /* Add underline on hover */
    }
  `}</style>
</div>



      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl w-4/5 max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 hover:dark:bg-slate-600 rounded-full"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 hover:dark:bg-slate-950 hover:bg-gray-100 rounded-lg"
              >
                <FaLink className="text-gray-600 text-xl" />
                <span className="font-medium">{isLinkCopied ? 'Copied' : 'Copy link'}</span>
              </button>
              <button
                onClick={handleShareOnWhatsApp}
                className="w-full flex items-center gap-3 px-4 py-3 hover:dark:bg-slate-950 hover:bg-gray-100 rounded-lg"
              >
                <FaWhatsapp className="text-green-500 text-xl" />
                <span className="font-medium">Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
       {isReportOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div ref={reportPopupRef} className="bg-slate-200 dark:bg-slate-900 rounded-lg p-6 max-w-sm w-4/5">
                  <h3 className="text-lg font-semibold">Report Issue</h3>
                  <p className='text-red-400 p-5'>
                  Please be respectful when reporting issues. Abusive language will not be tolerated. Kindly note that your report may be recorded for quality and security purposes. Thank you for your cooperation.
                  </p>
                  <textarea
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Write your issue here..."
                    className="w-full p-2 border bg-slate-200 dark:bg-slate-950 border-gray-300 rounded-md mb-4"
                  />
                  <div className="flex justify-between">
                    <Button onClick={() => setIsReportOpen(false)} outline color='blue' pill>Cancel</Button>
                    <Button onClick={handleSendReport} outline color='green' pill>Send</Button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default VideoPage;
