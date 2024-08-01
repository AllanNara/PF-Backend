import chalk from "chalk";
import logger from "../utils/winston.js";

const colorizeStatusCode = (statusCode) => {
	if (statusCode >= 100 && statusCode < 200) {
		return chalk.grey(statusCode);
	} else if (statusCode >= 200 && statusCode < 300) {
		return chalk.green(statusCode);
	} else if (statusCode >= 300 && statusCode < 400) {
		return chalk.cyan(statusCode);
	} else if (statusCode >= 400 && statusCode < 500) {
		return chalk.red(statusCode);
	} else if (statusCode >= 500) {
		return chalk.yellow(statusCode);
	}
	return statusCode;
};
const httpLogger = (req, res, next) => {
	const start = Date.now();
	const originalSend = res.send;

	/* eslint-disable-next-line */
	res.send = function (body) {
		const duration = chalk.white(Date.now() - start + "ms");
		const statusCode = colorizeStatusCode(res.statusCode);
		logger.http(
			`Request: ${req.method} ${req.originalUrl.split("?")[0]} - Status: ${statusCode} - Duration: ${duration}`
		);
		logger.debug("Additional info for debug:", {
			query: req.query,
			params: req.params,
			body: req.body,
			files: req.files?.length,
			host: req.headers.host,
			["content-type"]: req.headers["content-type"]?.split(";")[0]
		});
		// Llama a la respuesta original
		originalSend.apply(res, arguments);
	};

	next();
};

export default httpLogger;
