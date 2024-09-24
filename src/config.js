import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || 
  "mongodb://mongo:eOrYsPEcCUbHbFBcdNidHfshgzUPdTBk@autorack.proxy.rlwy.net:47971";
export const PORT = process.env.PORT || 47971;
export const SECRET = "yoursecretkey";