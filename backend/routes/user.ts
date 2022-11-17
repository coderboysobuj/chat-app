import { Router } from "express";
import { searchUsers } from "../controllers/userController";

import { authentication } from "../middleware/auth";

const router = Router();

router.post("/search", authentication, searchUsers);

export default router;
