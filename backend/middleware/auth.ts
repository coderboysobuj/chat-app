import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = {
        username: decoded.username as string,
        id: decoded.id as string,
      };
      next();
    }
  );
};
