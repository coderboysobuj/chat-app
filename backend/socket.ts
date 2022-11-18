import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
dotenv.config();
import { authencate } from "./middleware/socketMiddleware";

import prisma from "./utils/prisma";

export class SocketServer {
  public static instance: SocketServer;
  public io: Server;
  socket: Socket | null;

  constructor(server: HttpServer) {
    SocketServer.instance = this;

    this.io = new Server(server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    this.io.use(authencate);
    this.socket = null;
    console.log("Socket started");
    this.io.on("connect", this.StartListeners);
  }
  StartListeners = (socket: Socket) => {
    this.socket = socket;
    console.log(`Socket Connnected id: ${socket.data.user.username}`);
    socket.join(socket.data.user.id);

    socket.on("send_message", async (payload, cb) => {
      try {
        const message = await prisma.message.create({
          data: {
            text: payload.text,
            chatId: payload.chat.id,
            userId: socket.data.user.id,
          },
          select: {
            id: true,
            text: true,
            userId: true,
            createdAt: true,
          },
        });

        const chat = await prisma.chat.update({
          where: { id: payload.chat.id },
          data: { lastMessage: payload.text },
          select: {
            id: true,
            updatedAt: true,
            users: {
              select: { id: true, username: true },
            },
          },
        });

        payload?.chat?.users?.map((user: any) => {
          socket.broadcast.to(user.id).emit("reverse_message", { message });
          socket.broadcast.to(user.id).emit("update_chat", { chat });
        });

        cb({ message });
      } catch (error: any) {
        console.log("Create message socket or prisma error");
      }
    });

    socket.on("typing", ({ chat, isTyping }, cb) => {
      const chatMembers = chat.users.filter(
        (m: any) => m.id !== socket.data.user.id
      );
      chatMembers?.map((user: any) => {
        socket.broadcast.to(user.id).emit("typing", { typing: isTyping });
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconeted", socket.data.user.username);
    });
  };
}
