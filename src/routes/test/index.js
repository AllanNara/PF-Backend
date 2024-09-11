import { Router } from "express";
import cookieRoutes from "./cookies.js";
import mailRoutes from "./mail.js";
import processRoutes from "./process.js";
import sessionRoutes from "./session.js";

const router = Router();

router.use("/cookies", cookieRoutes);
router.use("/session", sessionRoutes);
router.use("/process", processRoutes);
router.use("/mail", mailRoutes);

router.use("*", (req, res) => {
	req.logger.verbose("Route " + req.originalUrl + " not found");
	res.status(404).json({ message: "testing route not found" });
});

export default router;
