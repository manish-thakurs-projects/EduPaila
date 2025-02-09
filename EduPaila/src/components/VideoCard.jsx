import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlayCircle } from 'react-icons/fi';
import { MdMoreVert } from 'react-icons/md';
import moment from 'moment';
import axios from 'axios';
import { LuDot } from "react-icons/lu";
import { FaLink } from 'react-icons/fa';
import { CiFlag1 } from "react-icons/ci";
import { Button } from 'flowbite-react';

const VideoCard = ({ video }) => {
  const [videoData, setVideoData] = useState(video);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState('');

  const dropdownRef = useRef(null);
  const reportPopupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (reportPopupRef.current && !reportPopupRef.current.contains(event.target)) {
        setIsReportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleVideoClick = async () => {
    if (!video || !video._id) {
      console.error("Error: video._id is missing or undefined");
      return;
    }

    try {
      await axios.put(`/api/video/increment-views/${video._id}`);
      navigate(`/video/${video._id}`);
    } catch (error) {
      console.error("Error tracking video view:", error.response || error);
      navigate(`/video/${video._id}`); 
    }
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownVisible((prevState) => !prevState);
  };

  const handleCopyLink = async (event) => {
    event.stopPropagation();
    const videoUrl = `${window.location.origin}/video/${videoData._id}`;
    await navigator.clipboard.writeText(videoUrl);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const handleReport = (event) => {
    event.stopPropagation();
    setIsReportOpen(true);
  };

  const handleSendReport = () => {
    const message = encodeURIComponent(`Report for video: ${videoData.title}\n\nIssue: ${reportMessage}`);
    const whatsappUrl = `https://wa.me/9779801996736?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsReportOpen(false);
  };

  return (
    <div
      className="group rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-out cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div onClick={handleVideoClick} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <FiPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <div className="w-full">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 line-clamp-2 mb-1 leading-tight">
                {videoData.title}
              </h3>
            </div>

            <div className="relative flex items-center justify-center">
              <MdMoreVert
                className="text-gray-600 cursor-pointer text-2xl hover:text-gray-800"
                onClick={handleDropdownToggle}
              />
              {dropdownVisible && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-gray-700">
                  <div onClick={handleReport} className="px-4 flex py-2 cursor-pointer hover:bg-gray-100 justify-center items-center">
                    <CiFlag1 className="text-gray-600 text-xl mr-4" />
                    <span className='font-medium'>Report</span>
                  </div>
                  <div onClick={handleCopyLink} className="px-4 flex py-2 cursor-pointer hover:bg-gray-100 justify-center items-center">
                    <FaLink className="text-gray-600 text-sm mr-2" />
                    <span className="font-medium">{isLinkCopied ? 'Copied!' : 'Copy link'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <span className="text-xs">{videoData.category}</span>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <span>{formatViews(videoData.views)}</span>
              <span>views</span>
              <span><LuDot /></span>
              <span>{moment(videoData.createdAt).fromNow()}</span>
             </div>
            </div>
          </div>
        </div>
      </div>

      {isReportOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div ref={reportPopupRef} className="bg-slate-200 dark:bg-slate-900 rounded-lg p-6 max-w-sm w-full">
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

export default VideoCard;
