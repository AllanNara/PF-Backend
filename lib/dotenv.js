import dotenv from "dotenv";
import fs from "fs";
import logger from "./winston.js";
import { resolve } from "path";

const { env } = process;

const envFile = resolve(
	process.cwd(),
	`.env.${env.NODE_ENV || "development"}.local`
);

if (fs.existsSync(envFile)) {
	dotenv.config({ path: envFile, encoding: "utf-8" });
	logger.info("Environment variables '%s' loaded", env.NODE_ENV, {
		from: envFile
	});
} else {
	logger.warn(
		`Warning: The file ${envFile} was not found. Some environment variables may not be defined.`
	);
}
