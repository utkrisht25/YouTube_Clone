import { Video } from "../models/video.model.js";
import { Channel } from "../models/channel.model.js";
import { handleError } from "../helpers/handleError.js";

// Get all unique video categories
export const getVideoCategories = async (req, res, next) => {
  try {
    const categories = await Video.distinct('category');
    
    res.status(200).json({
      success: true,
      categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


// Get all videos with basic information (for homepage)
export const getAllVideos = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    
    console.log('Category filter:', filter); // Debug log
    
    const videos = await Video.find(filter)
      .populate({
        path: "channel",
        select: "name avatar subscribersCount",
      })
      .sort({ createdAt: -1 }); // Latest videos first

    // Always return a 200 status, even if no videos are found
    res.status(200).json({
      success: true,
      videos,
      message: "Videos fetched successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get a single video by ID with full details (includes comments)
export const getVideoById = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
      .populate({
        path: "channel",
        select: "name avatar subscribersCount"
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } }, // Show newest comments first
        populate: {
          path: "user",
          select: "username avatar"
        }
      });

    if (!video) {
      return next(handleError(404, "Video not found"));
    }

    res.status(200).json({
      success: true,
      video,
      message: "Video fetched successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get trending videos (based on views in last 7 days)
export const getTrendingVideos = async (req, res, next) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const videos = await Video.find({
            createdAt: { $gte: sevenDaysAgo }
        })
            .populate({
                path: 'channel',
                select: 'name avatar subscribersCount'
            })
            .select('title thumbnailUrl views duration createdAt channel')
            .sort({ views: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            videos,
            message: "Trending videos fetched successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// Search videos by title
export const searchVideos = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return next(handleError(400, "Search query is required"));
        }

        const videos = await Video.find({
            title: { $regex: query, $options: 'i' }
        })
            .populate({
                path: 'channel',
                select: 'name avatar subscribersCount'
            })
            .select('title thumbnailUrl views duration createdAt channel')
            .sort({ views: -1 });

        res.status(200).json({
            success: true,
            videos,
            message: "Search results fetched successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
