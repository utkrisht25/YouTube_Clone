import express from 'express';
import { 
    getAllVideos, 
    getVideoById, 
    getTrendingVideos, 
    searchVideos 
} from '../controllers/video.controller.js';

const router = express.Router();

// Get all videos (for homepage)
router.get('/', getAllVideos);

// Get trending videos
router.get('/trending', getTrendingVideos);

// Search videos
router.get('/search', searchVideos);

// Get single video by ID
router.get('/:videoId', getVideoById);

export default router;
