import allRoutes from "./routes/index.js";
import displayRoutes from "express-routemap";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", allRoutes);

app.listen(8080, () => {
	displayRoutes(app);
	console.log("listening on port 8080"); // eslint-disable-line
});
