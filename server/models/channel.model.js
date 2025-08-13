import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate channel names
    },
    avatar: {
      type: String,
      required: true,
    },
    subscribersCount: {
      type: Number, //  parse it (e.g., 25254545)
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Add more fields as needed, e.g., bannerImage, totalVideos, joinedDate
  },
  {
    timestamps: true,
  }
);
export const Channel = mongoose.model('Channel', channelSchema);
