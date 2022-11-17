import { Router } from "express";
import { createChat, getChats } from "../controllers/chatController";
import { authentication } from "../middleware/auth";
const router = Router();

router.post("/create", authentication, createChat);
router.get("/", authentication, getChats);

export default router;
