import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, getConnectionRequests } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/connect/:userId", protect, sendConnectionRequest);
router.post("/accept/:userId", protect, acceptConnectionRequest);
router.post("/reject/:userId", protect, rejectConnectionRequest);
router.get("/requests", protect, getConnectionRequests);

export default router;