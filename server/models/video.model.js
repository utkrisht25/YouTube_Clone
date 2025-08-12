import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        // CHANGED: The video is now owned by a Channel, not a User directly.
        channel: {
            type: Schema.Types.ObjectId,
            ref: "Channel",
            required: true,
        },
        // NEW: Storing who liked/disliked the video prevents multiple votes.
        // The total count is simply the length of these arrays.
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Video = mongoose.model("Video", videoSchema);