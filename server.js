import MongoSingleton from "./src/utils/mongoose.js";
import { availableParallelism } from "os";
import cluster from "cluster";
import config from "./config/index.js";
import { httpServer } from "./src/app.js";
import logger from "./lib/winston.js";

const numCPUs = availableParallelism();

// :: Controlar errores: reinicio de servidor descontrolado al entrar en un bucle de forks
// :: Visualizar de otra forma los mensajes en consola
// :: Verificación de puerto en uso y alternativas
// :: Mensaje despedida cierre de cluster

if (cluster.isPrimary) {
	logger.verbose(`Environment: %s`, config.NODE_ENV);
	logger.info(`Primary ${process.pid} is running`);
}

if (cluster.isPrimary && config.CLUSTER) {
	// Fork workers
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		logger.info(`worker ${worker.process.pid} died`, { code, signal });
		cluster.fork();
	});
} else {
	httpServer.listen(config.PORT, async () => {
		if (config.DAO === "mongo" || config.SESSION.STORE === "mongo") {
			await MongoSingleton.connect();
		}

		logger.info(
			"PID %d - Server HTTP started on port %d...",
			process.pid,
			config.PORT
		);
	});

	httpServer.on("close", () => {
		logger.info("PID %d - Server HTTP closed...", process.pid);
	});
}

process.on("SIGINT", () => {
	console.info("\n");
	cluster.isPrimary && console.info("\nBye bye!\n");
	httpServer.close(() => {
		MongoSingleton.close().then(() => {
			process.exit(0);
		});
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
