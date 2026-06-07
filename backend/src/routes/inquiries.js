import express from "express";
import {
  createInquiry,
  getInquiries,
  markAsRead,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", authMiddleware, getInquiries);
router.patch("/:id/read", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteInquiry);

export default router;
