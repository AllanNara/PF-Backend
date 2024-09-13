import { Command } from "commander";
import fs from "fs/promises";
import { join } from "path";
import logger from "../../lib/winston.js";

const program = new Command();

// We define the version and a description of our cli
program
	.version("1.0.0")
	.description("Script to load products in different databases");

// Command for Mongodb
program
	.command("mongo")
	.description("Load products in Mongodb")
	.action(async () => {
		try {
			const { default: seedProductsMongo } = await import(
				"./products-seed-mongo.js"
			);
			const data = await readMockFile();
			await seedProductsMongo(data);
			logger.info("Products loaded in Mongodb successfully.");
		} catch (error) {
			logger.error("Error loading products in Mongodb:", error);
			process.exit(1);
		}
	});

// Command for the file system
program
	.command("fs")
	.description("Loads products in the file system")
	.action(async () => {
		try {
			const { default: seedProductsFile } = await import(
				"./products-seed-fs.js"
			);
			const data = await readMockFile();
			await seedProductsFile(data);
			logger.info("Products loaded in the file system successfully.");
		} catch (error) {
			logger.error("Error loading products in the file system:", error);
			process.exit(1);
		}
	});

// If the command is not recognized, it shows a help message
program.parse(process.argv);

// If no command is passed, show the help automatically
if (!process.argv.slice(2).length) {
	program.outputHelp();
}

async function readMockFile() {
	try {
		const pathFile = join(import.meta.dirname, "json", "MOCK_PRODUCTS.json");
		const json = await fs.readFile(pathFile, "utf-8");
		const data = JSON.parse(json);
		return data;
	} catch (err) {
		console.error("Read mock file failed\n", err);
	}
}
