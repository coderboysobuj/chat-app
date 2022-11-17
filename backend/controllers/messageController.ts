import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getMessage = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: req.params.chatId },
      select: {
        id: true,
        text: true,
        createdAt: true,
        userId: true,
      },
    });
    res.json(messages);
  } catch (error) {
    res.sendStatus(500);
  }
};
