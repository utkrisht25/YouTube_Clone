 import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
    getAllChannels,
    getChannelById,
    getChannelVideos,
    createChannel,
    updateChannel
} from '../controllers/channel.controller.js';
import {
    subscribeChannel,
    checkSubscription
} from '../controllers/subscription.controller.js';

const ChannelRoute = express.Router();

// Public routes
ChannelRoute.get('/', getAllChannels);
ChannelRoute.get('/:channelId', getChannelById);
ChannelRoute.get('/:channelId/videos', getChannelVideos);

// Protected routes - requires authentication
ChannelRoute.post('/', verifyToken, createChannel);
ChannelRoute.put('/:channelId', verifyToken, updateChannel);
ChannelRoute.post('/:channelId/subscribe', verifyToken, subscribeChannel);
ChannelRoute.get('/:channelId/subscription', verifyToken, checkSubscription);

export default ChannelRoute;
