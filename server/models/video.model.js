import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "Channel", // References your Channel model
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
