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
import initializePassport from "./passport/index.js";
import logger from "../lib/winston.js";
import optionSession from "./utils/sessions.js";
import passport from "passport";
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

app.use(express.static(path.resolve(import.meta.dirname, "public")));
app.use((req, res, next) => (req.logger = logger && next()));
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(session(optionSession));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// OpenApi Documentation with Swagger UI & Redoc
app.use("/api", swaggerUi.serve);
app.get("/api", swaggerUi.setup(swaggerSpec));
app.get("/redoc", (req, res) =>
	res.sendFile(path.resolve(process.cwd(), "docs", "redoc-static.html"))
);
app.use("/", allRoutes);
app.use(errorHandler);

websockets(io);

config.DISPLAY && displayRoutes(app);
export { app, httpServer };
