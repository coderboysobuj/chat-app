import * as dotenv from "dotenv";
dotenv.config();
const allowedOrigins: Array<string> = [process.env.CLIENT_URL as string];

export default allowedOrigins;
