import fs from "fs/promises";
import logger from "../lib/winston.js";
import path from "path";

let swaggerSpec;

try {
	const path_apidoc = path.resolve(process.cwd(), "docs", "openapi.json");
	const json = await fs.readFile(path_apidoc, "utf-8");
	swaggerSpec = JSON.parse(json);
} catch (error) {
	logger.error("Error to read openapi.json", {
		info: error.message || error
	});
	throw error;
}

export default swaggerSpec;
