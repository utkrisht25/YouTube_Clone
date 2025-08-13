import { handleError } from "../helpers/handleError.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js"; // For validation

// Add a comment (POST /comments)
export const addComment = async (req, res, next) => {
  try {
    const { videoId, content } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return next(handleError(404, "Video not found"));

    const comment = await Comment.create({
      content,
      video: videoId,
      user: req.user?._id, // Assumes authenticated user; adjust if needed
    });

    // Add comment reference to video
    video.comments.push(comment._id);
    await video.save();

    // Populate user details if needed
    const populatedComment = await Comment.findById(comment._id).populate('user', 'username avatar');

    res.status(201).json({
      success: true,
      comment: populatedComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Edit a comment (PATCH /comments/:commentId)
export const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return next(handleError(404, "Comment not found"));

    // Optional: Check if user owns the comment
    // if (comment.user.toString() !== req.user._id.toString()) return next(handleError(403, "Unauthorized"));

    comment.content = content;
    await comment.save();

    res.status(200).json({
      success: true,
      comment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Delete a comment (DELETE /comments/:commentId)
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return next(handleError(404, "Comment not found"));

    // Optional: Check ownership
    // if (comment.user.toString() !== req.user._id.toString()) return next(handleError(403, "Unauthorized"));

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
