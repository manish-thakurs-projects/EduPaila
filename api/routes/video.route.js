import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createVideo,
  getVideos,
  getVideoDetails,
  updateVideo,
  deleteVideo,
  likeVideo,
  shareVideo,
  incrementViews,
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createVideo);
router.get("/getvideos", getVideos);
router.get("/details/:videoId", getVideoDetails);
router.put("/update/:videoId", verifyToken, updateVideo);
router.delete("/delete/:videoId", verifyToken, deleteVideo);
router.put("/like/:videoId", verifyToken, likeVideo);
router.put("/share/:videoId", verifyToken, shareVideo);
router.put("/increment-views/:videoId", verifyToken, incrementViews);

export default router;
