import { Request, Response } from "express";
import prisma from "../utils/prisma";
import Jwt from "../services/jwt";
import bcrypt from "bcrypt";
import { JwtPayload, verify } from "jsonwebtoken";
import { sendResponseWithJwt } from "../utils/functions";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password not enterd!" });
  try {
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashPassword },
    });
    if (!user) return res.sendStatus(500);
    sendResponseWithJwt(
      res,
      user,
      `Hi, ${user.username} you account has heen created!`
    );
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password missing" });

  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) return res.status(400).json({ message: "User not found" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res.status(400).json({ message: "Invalid Password" });

  sendResponseWithJwt(res, user, `Hi ${user.username} user are loggged In!`);
};

export const refresh = async (req: Request, res: Response) => {
  if (!req.cookies?.token)
    return res.status(401).json({ message: "Unauthorized" });

  const token = req.cookies.token;
  try {
    verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const user = await prisma.user.findUnique({
          select: { id: true, username: true, image: true },
          where: { username: decoded.username },
        });
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const payload: JwtPayload = { id: user.id, username: user.username };

        const accessToken = Jwt.generateAccessToken(payload);
        res.json({ accessToken, user });
      }
    );
  } catch (error) {
    res.sendStatus(500);
  }
};

export const logout = async (req: Request, res: Response) => {
  if (!req.cookies?.token) return res.sendStatus(204);

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "You are logged out" });
};
