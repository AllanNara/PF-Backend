import { Router } from "express";
import { fork } from "child_process";

const router = Router();

router.get("/block", (req, res) => {
	const n = req.query.quantity || 3e8;
	const numbers = {};
	for (let i = 0; i < n; i++) {
		let randomNum = Math.floor(Math.random() * 1000);
		if (!numbers[randomNum]) numbers[randomNum] = 1;
		else numbers[randomNum]++;
	}

	res.json({ numbers });
});

router.get("/no-block", (req, res) => {
	const n = req.query.quantity || 3e7;
	const child = fork(import.meta.dirname + "/fork/computo.js", [n]);
	child.on("message", (message) => {
		res.json(message.numbers);
		child.disconnect();
	});
});

export default router;
