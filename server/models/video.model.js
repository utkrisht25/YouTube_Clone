import mongoose from "mongoose";
import { Channel } from './channel.model.js';

const videoSchema = new mongoose.Schema(
  {
    title: String,
    thumbnailUrl: String,
    duration: String,
    uploadTime: String,
    views: String, // Consider changing to Number for easier calculations/sorting
    author: String,
    videoUrl: String,
    description: String,
    likes: Number,
    dislikes: Number,
    commentsCount: Number,
    isLive: Boolean,
    isVerified: Boolean,
    tags: [String],
    category: String,
    language: String,
    resolution: String,
    isHD: Boolean,
    license: String,
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel", // References your Channel model
    },
     comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);