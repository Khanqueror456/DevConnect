import express from "express";
import {createPost, getPost, getPosts, deletePost, toggleLike, addComent, deleteComment} from "../controllers/post.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/:postId", protect, getPost);
router.put("/:postId/like", protect, toggleLike);
router.post("/:postId/comment", protect, addComent);
router.delete("/:postId", protect, deletePost);
router.delete("/:postId/comment/:commentId", protect, deleteComment);

export default router;