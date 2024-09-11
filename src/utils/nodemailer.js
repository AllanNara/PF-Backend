import config from "../../config/index.js";
import logger from "../../lib/winston.js";
import nodemailer from "nodemailer";
import path from "path";

let fakeTransport;
try {
	const fakeAccount = await nodemailer.createTestAccount();
	fakeTransport = nodemailer.createTransport({
		host: fakeAccount.smtp.host,
		port: fakeAccount.smtp.port,
		secure: fakeAccount.smtp.secure,
		auth: {
			user: fakeAccount.user,
			pass: fakeAccount.pass
		}
	});
} catch (error) {
	logger.error("Error to create fake account", {
		error: error.message || error
	});
}

const googleTransport = nodemailer.createTransport({
	service: "Gmail",
	hots: "smtp.gmail.com",
	port: 587,
	auth: {
		user: config.NODEMAILER.GOOGLE.EMAIL_USER,
		pass: config.NODEMAILER.GOOGLE.EMAIL_PASS
	}
});

async function sendEmail(mailOptions) {
	let transport;
	if (config.NODEMAILER.TRANSPORT === "google") {
		transport = googleTransport;
	} else {
		transport = fakeTransport;
	}

	const { to, subject, html } = mailOptions;
	const attachments = [
		{
			filename: "banner.png",
			path: path.resolve("src", "public", "assets", "images", "banner-min.png"),
			cid: "banner"
		}
	];

	try {
		const result = await transport.sendMail({
			from: `E-ComMercy Store <${config.NODEMAILER.GOOGLE.EMAIL_USER}>`,
			to,
			subject,
			html,
			attachments
		});
		return result;
	} catch (error) {
		logger.error("Error to send email", {
			error: error.message || error
		});
		return null;
	}
}

export function compileTemplateHTML(app, template, data) {
	return new Promise((resolve, reject) => {
		app.render(
			`mail/${template}`,
			{
				...data,
				siteOrigin: config.ORIGIN
			},
			(err, html) => {
				if (err) {
					logger.error("Error to render template");
					reject(err);
				}
				resolve(html);
			}
		);
	});
}

export default sendEmail;
