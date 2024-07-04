import { Server } from "socket.io";
import { _dirname } from "../dirname.js";
import allRoutes from "./routes/index.js";
import { connectMongoDB } from "./utils/mongoose.js";
import { createServer } from "http";
import displayRoutes from "express-routemap";
import { engine } from "express-handlebars";
import errorHandler from "./middlewares/errorHandler.js";
import express from "express";
import path from "path";
import websockets from "./websockets.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(_dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(_dirname, "src", "public")));

app.use("/", allRoutes);
app.use(errorHandler);

connectMongoDB();
websockets(io);

httpServer.listen(8080, () => {
	displayRoutes(app);
	console.log("listening on port 8080"); // eslint-disable-line
});
