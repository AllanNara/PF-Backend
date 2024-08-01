import { app, httpServer } from "./src/app.js";
import displayRoutes from "express-routemap";
import logger from "./src/utils/winston.js";

httpServer.listen(8080, () => {
	displayRoutes(app);
	logger.info(`Listening on port %d`, 8080);
});
