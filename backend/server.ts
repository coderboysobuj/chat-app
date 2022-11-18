import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
console.log(process.env.CLIENT_URL);

import path from "path";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import routes from "./routes/root";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import corsOptions from "./config/corsOptions";
import { authRoutes, userRoutes, chatRoutes, messageRoutes } from "./routes";
import { User } from "./utils/types";
import { SocketServer } from "./socket";

console.log(process.env.CLIENT_URL);

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

const app = express();

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", routes);

// api routing
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

new SocketServer(server);

server.listen(PORT, () => {
  console.log(`🚀 Server started at post ${PORT}`);
});
