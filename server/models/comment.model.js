import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes you have a User model; remove if not
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
