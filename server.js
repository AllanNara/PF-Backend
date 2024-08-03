import { NODE_ENV, PORT } from "./config/index.js";
import { closeMongoDB, connectMongoDB } from "./src/utils/mongoose.js";
import { httpServer } from "./src/app.js";
import logger from "./lib/winston.js";

httpServer.listen(PORT, async () => {
	await connectMongoDB();
	logger.info(`Listening on port %d in mode %s`, PORT, NODE_ENV);
});

httpServer.on("close", () => {
	logger.info("Server HTTP closed...");
});

process.on("SIGINT", () => {
	console.info("\n");
	httpServer.close();
	closeMongoDB().then(() => {
		NODE_ENV !== "production" && console.info("\nBye bye!\n");
		process.exit(0);
	});
});

process.on("uncaughtException", (error) => {
	logger.error("FATAL: Uncaught Exception", { info: error.message });
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	logger.error("Unhandled Rejection", {
		promise: "rejected",
		reason: reason.message
	});
	process.exit(1);
});
