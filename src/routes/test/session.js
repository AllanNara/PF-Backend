import { Router } from "express";
import logger from "../../../lib/winston.js";

const router = Router();

router.get("/", (req, res) => {
	res.send("Test sessions");
});

router.get("/visit-count", (req, res) => {
	const user = req.query.user || "user";
	if (!req.session.count) {
		req.session.count = 1;
		return res.send(
			`Hello ${user}! the counter is initialized, refresh the page!!`
		);
	}
	res.send(
		`Hi again ${user}! You visited this page ${req.session.count++} times`
	);
});

router.get("/destroy", (req, res) => {
	const sid = req.session.id;
	req.session.destroy((err) => {
		if (err) {
			logger.warn("Error to destroy session", { error: err });
			return res.json({ error: "view console on server" });
		}
		logger.verbose("Session with id %s deleted successfully!", sid);
		return res.send("Session destroyed successfully");
	});
});

export default router;
