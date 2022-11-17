import { rateLimit, Options } from "express-rate-limit";
import { logEvens } from "./logger";
import { Request, Response, NextFunction } from "express";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts from this IP, Please try again later",
  },
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    options: Options
  ) => {
    logEvens(
      `Too many requests : ${options.message?.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errorLog.log"
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
