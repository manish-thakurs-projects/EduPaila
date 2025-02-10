import Video from "../models/video.model.js";
import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

function extractVideoIdFromUrl(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function validateUserPermissions(video, userId, res, next) {
  if (!video) return next(errorHandler(404, "Video not found"));
  if (video.userId !== userId)
    return next(
      errorHandler(403, "You are not allowed to perform this action")
    );
}

export const createVideo = async (req, res, next) => {
  try {
    const { title, description, youtubeUrl, category } = req.body;
    if (!title || !youtubeUrl || !category)
      return next(
        errorHandler(400, "Title, YouTube URL, and Category are required")
      );

    const videoId = extractVideoIdFromUrl(youtubeUrl);
    if (!videoId) return next(errorHandler(400, "Invalid YouTube URL"));

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const newVideo = new Video({
      title,
      description,
      youtubeUrl,
      thumbnail,
      category,
      userId: req.user.id,
    });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const getVideoDetails = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return next(errorHandler(404, "Video not found"));

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({ videoId: req.params.videoId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username");

    res.status(200).json({ video, comments });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    validateUserPermissions(video, req.user.id, res, next);

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.videoId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    validateUserPermissions(video, req.user.id, res, next);

    await Video.findByIdAndDelete(req.params.videoId);
    res.status(200).json("The video has been deleted");
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return next(errorHandler(404, "Video not found"));

    const userIndex = video.likes.indexOf(req.user.id);
    userIndex === -1
      ? video.likes.push(req.user.id)
      : video.likes.splice(userIndex, 1);

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const shareVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return next(errorHandler(404, "Video not found"));

    video.shares += 1;
    await video.save();
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const incrementViews = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const viewerId = req.user ? req.user.id : req.ip;
    if (video.viewedBy.includes(viewerId)) return res.status(200).json(video);

    video.viewedBy.push(viewerId);
    video.views += 1;
    await video.save();
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
