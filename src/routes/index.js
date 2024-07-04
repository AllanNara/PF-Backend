import { Router } from "express";
import apiRoutes from "./api/index.js";
import webRoutes from "./web/index.js";

const router = Router();

router.use("/api", apiRoutes);
router.use("/", webRoutes);

// Error catching endware.
// eslint-disable-next-line
router.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

export default router;
