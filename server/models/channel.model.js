import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate channel names
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' // Default avatar URL
    },
    subscribersCount: {
      type: Number,
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
