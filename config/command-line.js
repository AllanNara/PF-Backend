import { Command } from "commander";
import logger from "../lib/winston.js";
import { transports } from "winston";

const program = new Command();

program
	.name("e-commerce-pf")
	.description("CLI to define project settings")
	.version("1.0.0");

const persistence = ["mongo", "fs", "memory"];
const sessionStorage = ["redis", "mongo", "fs", "memory"];
program
	.option("--dao <dao>", "DAO selected " + persistence, "memory")
	.option(
		"--sstorage <sstorage>",
		"Session storage selected " + sessionStorage,
		"memory"
	)
	.option("--debug", "Debug mode", false)
	.option("--display", "Display Routes", false)
	.action(actionCb)
	.parse();

export default program.opts();

function actionCb({ dao, debug, sstorage }) {
	if (!persistence.includes(dao)) {
		logger.warn(
			`DAO "%s" not supported. Choose between: [${persistence}]`,
			dao
		);
		process.exit(1);
	}
	logger.verbose(`DAO selected: %s${dao === "memory" ? "(default)" : ""}`, dao);
	logger.verbose(
		`Store selected: %s${sstorage === "memory" ? "(default)" : ""}`,
		sstorage
	);

	if (debug) {
		logger.clear();
		logger.add(
			new transports.Console({
				level: "debug"
			})
		);
		logger.debug("----------------------");
		logger.debug("--- **DEBUG MODE** ---");
		logger.debug("----------------------");
	}
}
