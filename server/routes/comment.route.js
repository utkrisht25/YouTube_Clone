import express from "express";
import { addComment, editComment, deleteComment } from "../controllers/comment.controller.js";
// Import auth middleware if needed (e.g., protect for authenticated users)

const router = express.Router();

router.post("/", addComment); // POST /comments { videoId, content }
router.patch("/:commentId", editComment); // PATCH /comments/:commentId { content }
router.delete("/:commentId", deleteComment); // DELETE /comments/:commentId

export default router;
