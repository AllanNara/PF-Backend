import MongoSingleton from "./src/utils/mongoose.js";
import config from "./config/index.js";
import { httpServer } from "./src/app.js";
import logger from "./lib/winston.js";

httpServer.listen(config.PORT, async () => {
	if (config.DAO === "mongo" || config.SESSION.STORE === "mongo") {
		await MongoSingleton.connect();
	}
	logger.info(`Listening on port %d in mode %s`, config.PORT, config.NODE_ENV);
});

httpServer.on("close", () => {
	logger.info("Server HTTP closed...");
});

process.on("SIGINT", () => {
	console.info("\n");
	httpServer.close();
	MongoSingleton.close().then(() => {
		config.NODE_ENV !== "production" && console.info("\nBye bye!\n");
		process.exit(0);
	});
});

process.on("uncaughtException", (error) => {
	logger.error("FATAL: Uncaught Exception", { info: error.message });
	logger.debug("Error stack", { stack: error.stack });
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	logger.error("Unhandled Rejection", {
		promise: "rejected",
		reason: reason.message
	});
	process.exit(1);
});
