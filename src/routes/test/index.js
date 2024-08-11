import { Router } from "express";
// import cookieRoutes from "./cookies.js";
import sessionRoutes from "./session.js";

const router = Router();

// router.use("/cookies", cookieRoutes);
router.use("/session", sessionRoutes);

router.use("*", (req, res) => {
	req.logger.verbose("Route " + req.originalUrl + " not found");
	res.status(404).json({ message: "testing route not found" });
});

export default router;
