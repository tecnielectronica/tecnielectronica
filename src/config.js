import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || 
  "mongodb://mongo:iwMepxKRTzetTCPunjSndmWCTKwWeRQG@junction.proxy.rlwy.net:45558";
export const PORT = process.env.PORT || 45558;
export const SECRET = "yoursecretkey";