import { _dirname } from "../dirname.js";
import allRoutes from "./routes/index.js";
import displayRoutes from "express-routemap";
import { engine } from "express-handlebars";
import express from "express";
import path from "path";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(_dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(_dirname, "src", "public")));

app.use("/api", allRoutes);

// eslint-disable-next-line -- 'next' param is needed for middleware errors
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

app.listen(8080, () => {
	displayRoutes(app);
	console.log("listening on port 8080"); // eslint-disable-line
});
