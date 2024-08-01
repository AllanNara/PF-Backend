import chalk from "chalk";

const colorizeStatusCode = (statusCode) => {
	if (statusCode >= 100 && statusCode < 200) return chalk.grey(statusCode);
	if (statusCode >= 200 && statusCode < 300) return chalk.green(statusCode);
	if (statusCode >= 300 && statusCode < 400) return chalk.cyan(statusCode);
	if (statusCode >= 400 && statusCode < 500) return chalk.red(statusCode);
	if (statusCode >= 500) return chalk.yellow(statusCode);
	return statusCode;
};

const colorizeMethodHttp = (method) => {
	if (method === "GET") return chalk.green(method);
	if (method === "POST") return chalk.yellow(method);
	if (method === "PUT") return chalk.blueBright(method);
	if (method === "DELETE") return chalk.red(method);
	return chalk.grey(method);
};
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
