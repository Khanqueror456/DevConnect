import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { sendConnectionRequest } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/connect/:userId", protect, sendConnectionRequest);

export default router;