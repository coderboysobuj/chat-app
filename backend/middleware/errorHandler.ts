import { Request, Response, NextFunction } from "express";
import { logEvens } from "./logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvens(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = req.statusCode ? req.statusCode : 500;

  res.status(status);
  res.json({ message: err.message });
};

export default errorHandler;
