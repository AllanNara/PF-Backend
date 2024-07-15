import fs from "fs/promises";
import path from "path";

let swaggerSpec;

try {
	const path_apidoc = path.resolve(
		import.meta.dirname,
		"..",
		"..",
		"docs",
		"openapi.json"
	);
	const json = await fs.readFile(path_apidoc, "utf-8");
	swaggerSpec = JSON.parse(json);
} catch (error) {
	console.error({ openapi: `Error to read openapi.json: ${error}` });
	throw new Error("Error reading file openapi.json");
}

export default swaggerSpec;
