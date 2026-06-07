import express from "express";
import { login, changePassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);

export default router;
