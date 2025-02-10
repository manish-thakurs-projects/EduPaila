import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "https://img.youtube.com/vi/<videoId>/hqdefault.jpg",
    },
    likes: {
      type: [String],
      default: [],
    },
    shares: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
