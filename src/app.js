import { Server } from "socket.io";
import allRoutes from "./routes/index.js";
import config from "../config/index.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import displayRoutes from "express-routemap";
import { engine } from "express-handlebars";
import errorHandler from "./middlewares/errorHandler.js";
import express from "express";
import httpLogger from "./middlewares/httpLogger.js";
import logger from "../lib/winston.js";
import optionSession from "./utils/sessions.js";
import path from "path";
import session from "express-session";
import swaggerSpec from "./utils/swagger-config.js";
import swaggerUi from "swagger-ui-express";
import websockets from "./websockets.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(import.meta.dirname, "views"));

app.use(cookieParser());
app.use(session(optionSession));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(import.meta.dirname, "public")));

// Add logger with winston
app.use((req, res, next) => {
	req.logger = logger;
	next();
});
app.use(httpLogger);

// OpenApi Documentation with Swagger UI
app.use("/api", swaggerUi.serve);
app.get("/api", swaggerUi.setup(swaggerSpec));

// Documentation with Redocly
app.get("/redoc", (req, res) => {
	const redocFile = path.resolve(
		import.meta.dirname,
		"..",
		"docs",
		"redoc-static.html"
	);
	res.sendFile(redocFile);
});

app.use("/", allRoutes);
app.use(errorHandler);

websockets(io);

config.DISPLAY && displayRoutes(app);
export { app, httpServer };
