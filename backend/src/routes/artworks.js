import express from "express";
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from "../controllers/artworkController.js";
import authMiddleware from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
router.post("/", authMiddleware, upload.single("image"), createArtwork);
router.put("/:id", authMiddleware, upload.single("image"), updateArtwork);
router.delete("/:id", authMiddleware, deleteArtwork);

export default router;
