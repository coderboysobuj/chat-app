import { User } from "@prisma/client";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Jwt from "../services/jwt";

export const sendResponseWithJwt = (
  res: Response,
  user: User,
  message: string
) => {
  const payload: JwtPayload = { id: user.id, username: user.username };
  const accessToken = Jwt.generateAccessToken(payload);
  const refreshToken = Jwt.generateRefreshToken(payload);

  res.cookie("token", refreshToken, {
    maxAge: 24 * 60 * 60 * 1000, // 1d
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: message,
    accessToken,
    user: { id: user.id, username: user.username, image: user.image },
  });
};
