import displayRoutes from "express-routemap";
import { app, httpServer } from "./src/app.js";

httpServer.listen(8080, () => {
	displayRoutes(app);
	console.log("listening on port 8080"); // eslint-disable-line
});
