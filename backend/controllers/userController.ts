import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const searchUsers = async (req: Request, res: Response) => {
  const { searchTerm } = req.body;
  if (!searchTerm && typeof searchTerm !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        username: { startsWith: searchTerm },
        NOT: {
          username: req.user?.username,
        },
      },
      select: {
        username: true,
        id: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.sendStatus(500);
  }
};
