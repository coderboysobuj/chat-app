import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";

const router = Router();
router.post("/register", register);

router.post("/login", loginLimiter, login);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
