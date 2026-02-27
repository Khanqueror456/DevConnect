import express from "express";
import {createPost, getPosts, toggleLike, addComent} from "../controllers/post.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.put("/:postId/like", protect, toggleLike);
router.post("/:postId/comment", protect, addComent);

export default router;