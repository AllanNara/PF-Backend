import sendEmail, { compileTemplateHTML } from "../../utils/nodemailer.js";
import { Router } from "express";
import logger from "../../../lib/winston.js";

const router = Router();

router.get("/send/:template", async (req, res) => {
	const to = req.query.to;
	if (!to) {
		return res
			.status(400)
			.json({ status: "error", message: "Missing email to" });
	}
	const { template } = req.params;
	const templates = [
		"confirm-registration",
		"password-changed",
		"purchase-complete",
		"registration-complete",
		"reset-password"
	];

	if (!templates.includes(template)) {
		return res.status(400).json({
			status: "error",
			message: "Template not found"
		});
	}

	const userName = req.query.user || "John Doe";
	const confirmationLink = req.query.confirmation || "localhost:8080/";
	const resetLink = req.query.reset || "localhost:8080/";
	const orderNumber = req.query.order || "AC-123456";
	const trackingLink = req.query.tracking || "localhost:8080/";

	try {
		const html = await compileTemplateHTML(req.app, template, {
			userName,
			confirmationLink,
			resetLink,
			orderNumber,
			trackingLink
		});

		const response = await sendEmail({
			to,
			subject: `E-ComMercy API: ${template}`,
			html
		});

		if (!response) {
			return res
				.status(500)
				.json({ status: "error", message: "Email not sent" });
		}

		res.json({
			status: "success",
			message: "Email sent",
			payload: {
				response
			}
		});
	} catch (error) {
		logger.warn("Error in route /test/mail", { error });
		res.status(500).json({
			status: "error",
			message: error.message || "Something went wrong"
		});
	}
});

export default router;
