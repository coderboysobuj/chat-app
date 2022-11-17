import { User } from "@prisma/client";
import { Request, Response } from "express";
import { SocketServer } from "../socket";
import prisma from "../utils/prisma";

export const createChat = async (req: Request, res: Response) => {
  console.log("Create user");
  const { users } = req.body;
  if (!Array.isArray(users) || !users.length) {
    return res.status(400).json({ message: "Select someone" });
  }

  const members = [...users, req.user];
  console.log(members);

  try {
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: members.map((u) => ({ username: u.username })),
        },
      },
      select: {
        id: true,
        lastMessage: true,
        users: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        createAt: true,
        updatedAt: true,
      },
    });
    res.json(chat);
    users.map((u) => {
      SocketServer.instance.socket?.to(u.id).emit("new_chat", chat);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong try again later" });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    if (req.user?.username) {
      const chats = await prisma.chat.findMany({
        where: {
          users: { some: { username: req.user.username } },
        },
        select: {
          id: true,
          users: { select: { id: true, username: true } },
          updatedAt: true,
          lastMessage: true,
          createAt: true,
        },

        orderBy: {
          updatedAt: "desc",
        },
      });

      res.json(chats);
    } else {
      res.sendStatus(400);
    }
  } catch (error: any) {
    res.sendStatus(500);
  }
};
