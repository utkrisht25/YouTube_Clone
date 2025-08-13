import { handleError } from "../helpers/handleError.js";
import { Video } from "../models/video.model.js";

// Get all videos with basic information (for homepage)
export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({})
      .populate({
        path: "channel",
        select: "name avatar subscribersCount",
      })
      .sort({ createdAt: -1 }); // Latest videos first

    if (!videos.length) {
      return next(handleError(404, "No videos found"));
    }

    res.status(200).json({
      success: true,
      videos,
      message: "Videos fetched successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get a single video by ID with full details
export const getVideoById = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate({
      path: "channel",
      select: "name avatar subscribersCount",
    });

    if (!video) {
      return next(handleError(404, "Video not found"));
    }

    // Optional: Increment views dynamically (uncomment if needed)
    // video.views = (parseInt(video.views) || 0) + 1;
    // await video.save();

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
