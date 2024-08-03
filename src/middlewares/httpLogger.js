import { colorizeMethodHttp, colorizeStatusCode } from "../utils/colorize.js";
import chalk from "chalk";

const httpLogger = (req, res, next) => {
	const start = process.hrtime();

	res.on("finish", () => {
		const [seconds, nanoseconds] = process.hrtime(start);
		const durationInMs = seconds * 1000 + nanoseconds / 1e6;

		const statusCode = colorizeStatusCode(res.statusCode);
		const method = colorizeMethodHttp(req.method);
		const duration = chalk.white(durationInMs.toFixed(3) + " ms");

		req.logger.http(
			`${method} ${req.originalUrl.split("?")[0]}  ${statusCode} - ${duration}`
		);
		req.logger.debug("Additional info for debug:", {
			query: req.query,
			params: req.params,
			body: req.body,
			files: req.files?.length,
			host: req.headers.host,
			["content-type"]: req.headers["content-type"]?.split(";")[0]
		});
	});

	next();
};

export default httpLogger;
