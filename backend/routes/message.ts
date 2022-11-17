import { Router } from "express";
import { getMessage } from "../controllers/messageController";
import { authentication } from "../middleware/auth";
const router = Router();
router.get("/:chatId", authentication, getMessage);
export default router;
