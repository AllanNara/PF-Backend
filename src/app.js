import { Server } from "socket.io";
import allRoutes from "./routes/index.js";
import { createServer } from "http";
import { engine } from "express-handlebars";
import errorHandler from "./middlewares/errorHandler.js";
import express from "express";
import path from "path";
import swaggerSpec from "./config/swagger-config.js";
import swaggerUi from "swagger-ui-express";
import websockets from "./websockets.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(import.meta.dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(import.meta.dirname, "public")));

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

export { app, httpServer };
