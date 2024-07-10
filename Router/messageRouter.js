import express from "express";
import { getAllMessages, sendMessage } from "../Controllers/messageController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall",isAdminAuthenticated, getAllMessages);

export default router;
