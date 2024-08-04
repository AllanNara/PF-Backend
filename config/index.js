import { dao } from "./command-line.js";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
	path: resolve(
		process.cwd(),
		`.env.${process.env.NODE_ENV || "development"}.local`
	)
});

export const {
	DB = dao,
	MONGO_URI = "mongodb://127.0.0.1:27017/pf-backend",
	PORT = 8080,
	HOST = "http://localhost:8080",
	NODE_ENV
} = process.env;
