import { Command } from "commander";
import logger from "../lib/winston.js";

const program = new Command();

program
	.name("e-commerce-pf")
	.description("CLI to define project settings")
	.version("1.0.0");

program
	.option("--dao <dao>", "DAO selected [mongo, fs]", "fs")
	.action((options) => {
		const persistence = ["mongo", "fs"];
		if (!persistence.includes(options.dao)) {
			logger.warn(
				'DAO "%s" not supported. Choose between: ["mongo", "fs"]',
				options.dao
			);
			process.exit(1);
		}
		logger.info("DAO selected: %s", options.dao);
	})
	.parse();

export const { dao } = program.opts();
