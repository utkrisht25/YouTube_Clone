import { handleError } from "../helpers/handleError.js";
import { Channel } from "../models/channel.model.js";
import { Video } from "../models/video.model.js";

// Get all channels
export const getAllChannels = async (req, res, next) => {
    try {
        const channels = await Channel.find()
            .select('name avatar subscribersCount description isVerified owner')
            .populate('owner', '_id username avatar')
            .sort({ subscribersCount: -1 });

        res.status(200).json({
            success: true,
            channels,
            message: "Channels fetched successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Get single channel by ID
export const getChannelById = async (req, res, next) => {
    try {
        const { channelId } = req.params;

        const channel = await Channel.findById(channelId)
            .select('name avatar subscribersCount description isVerified owner')
            .populate('owner', '_id username');

        if (!channel) {
            return next(handleError(404, "Channel not found"));
        }

        res.status(200).json({
            success: true,
            channel,
            message: "Channel fetched successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Get videos by channel ID
export const getChannelVideos = async (req, res, next) => {
    try {
        const { channelId } = req.params;

        // First check if channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return next(handleError(404, "Channel not found"));
        }

        // Get videos for this channel
        const videos = await Video.find({ channel: channelId })
            .select('title thumbnailUrl views duration createdAt')
            .sort({ createdAt: -1 }); // Latest videos first

        res.status(200).json({
            success: true,
            videos,
            message: "Channel videos fetched successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Create new channel (protected route - only for logged in users)
export const createChannel = async (req, res, next) => {
    try {
        const { name, description, avatar } = req.body;
        const userId = req.user._id; // Will come from auth middleware

        // Check if user already has a channel
        const existingChannel = await Channel.findOne({ owner: userId });
        if (existingChannel) {
            return next(handleError(400, "You already have a channel"));
        }

        const channel = new Channel({
            name,
            description,
            avatar,
            owner: userId,
            subscribersCount: 0,
            isVerified: false
        });

        await channel.save();

        res.status(201).json({
            success: true,
            channel,
            message: "Channel created successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Update channel (protected route - only channel owner)
export const updateChannel = async (req, res, next) => {
    try {
        const { channelId } = req.params;
        const { name, description, avatar } = req.body;
        const userId = req.user._id;

        const channel = await Channel.findById(channelId);
        if (!channel) {
            return next(handleError(404, "Channel not found"));
        }

        // Check if user owns the channel
        if (channel.owner.toString() !== userId.toString()) {
            return next(handleError(403, "You can only update your own channel"));
        }

        channel.name = name || channel.name;
        channel.description = description || channel.description;
        channel.avatar = avatar || channel.avatar;

        await channel.save();

        res.status(200).json({
            success: true,
            channel,
            message: "Channel updated successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
