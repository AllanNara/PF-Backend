import chalk from "chalk";

export const colorizeStatusCode = (statusCode) => {
	if (statusCode >= 100 && statusCode < 200) return chalk.grey(statusCode);
	if (statusCode >= 200 && statusCode < 300) return chalk.green(statusCode);
	if (statusCode >= 300 && statusCode < 400) return chalk.cyan(statusCode);
	if (statusCode >= 400 && statusCode < 500) return chalk.red(statusCode);
	if (statusCode >= 500) return chalk.yellow(statusCode);
	return statusCode;
};

export const colorizeMethodHttp = (method) => {
	if (method === "GET") return chalk.green(method);
	if (method === "POST") return chalk.yellow(method);
	if (method === "PUT") return chalk.blueBright(method);
	if (method === "DELETE") return chalk.red(method);
	return chalk.grey(method);
};
