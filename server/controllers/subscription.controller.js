import { handleError } from "../helpers/handleError.js";
import { Channel } from "../models/channel.model.js";
import User from "../models/user.model.js";

// Subscribe to a channel
export const subscribeChannel = async (req, res, next) => {
    try {
        const { channelId } = req.params;
        const userId = req.user._id;

        // Check if channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return next(handleError(404, "Channel not found"));
        }

        // Check if user is trying to subscribe to their own channel
        if (channel.owner && userId && channel.owner.toString() === userId.toString()) {
            return next(handleError(400, "You cannot subscribe to your own channel"));
        }

        // Check if user is already subscribed
        const user = await User.findById(userId);
        const isSubscribed = user.subscribedChannels.includes(channelId);

        if (isSubscribed) {
            // Unsubscribe
            await User.findByIdAndUpdate(userId, {
                $pull: { subscribedChannels: channelId }
            });
            await Channel.findByIdAndUpdate(channelId, {
                $inc: { subscribersCount: -1 }
            });

            res.status(200).json({
                success: true,
                subscribed: false,
                message: "Successfully unsubscribed from the channel"
            });
        } else {
            // Subscribe
            await User.findByIdAndUpdate(userId, {
                $addToSet: { subscribedChannels: channelId }
            });
            await Channel.findByIdAndUpdate(channelId, {
                $inc: { subscribersCount: 1 }
            });

            res.status(200).json({
                success: true,
                subscribed: true,
                message: "Successfully subscribed to the channel"
            });
        }
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Check if user is subscribed to a channel
export const checkSubscription = async (req, res, next) => {
    try {
        const { channelId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const isSubscribed = user.subscribedChannels.includes(channelId);

        res.status(200).json({
            success: true,
            isSubscribed
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
