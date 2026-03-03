import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { sendConnectionRequest, acceptConnectionRequest } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/connect/:userId", protect, sendConnectionRequest);
router.post("/accept/:userId", protect, acceptConnectionRequest);

export default router;