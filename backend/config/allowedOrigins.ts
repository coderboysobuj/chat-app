import * as dotenv from "dotenv";
dotenv.config();
const allowedOrigins: Array<string> = [
  "https://chat-app-frontend.onrender.com",
  "www.chat-app-frontend.onrender.com",
  "http://chat-app-frontend.onrender.com",
];

export default allowedOrigins;
