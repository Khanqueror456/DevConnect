import express from "express";
import {createPost, getPost, getPosts, deletePost, toggleLike, toggleCommentLike, addComent, deleteComment, addCommentReply} from "../controllers/post.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/:postId", protect, getPost);
router.put("/:postId/like", protect, toggleLike);
router.put("/:postId/like/:commentId", protect, toggleCommentLike)
router.post("/:postId/comment", protect, addComent);
router.post("/:postId/comment/:commentId", protect, addCommentReply);
router.delete("/:postId", protect, deletePost);
router.delete("/:postId/comment/:commentId", protect, deleteComment);

export default router;