import { Command } from "commander";
import cluster from "cluster";
import logger from "../lib/winston.js";
import { transports } from "winston";

const program = new Command();
const { isPrimary } = cluster;

program
	.name("e-commerce-pf")
	.description("CLI to define project settings")
	.version("1.0.0");

const persistence = ["mongo", "fs", "memory"];
const sessionStore = ["redis", "mongo", "fs", "memory"];
program
	.option("--dao <dao>", "DAO selected " + persistence, "memory")
	.option(
		"--sstore <sstore>",
		"Session store selected " + sessionStore,
		"memory"
	)
	.option("--debug", "Debug mode", false)
	.option("--display", "Display Routes", false)
	.option("--cluster", "Mode Cluster", false)
	.action(actionCb)
	.parse();

export default program.opts();

function actionCb({ dao, debug, sstore, cluster }) {
	if (!persistence.includes(dao)) {
		logger.error(
			`DAO "%s" not supported. Choose between: [${persistence}]`,
			dao
		);
		process.exit(1);
	}

	if (isPrimary) {
		logger.verbose(`DAO selected: %s`, dao);
		logger.verbose(`Store selected: %s`, sstore);
		logger.verbose(`Cluster: ${cluster ? "on" : "off"}`);
	}

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
