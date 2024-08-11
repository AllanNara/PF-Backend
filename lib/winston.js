import "winston-daily-rotate-file";
import { addColors, createLogger, format, transports } from "winston";
import { resolve } from "path";

const customLevelsOptions = {
	levels: { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5 },
	colors: {
		error: "red",
		warn: "yellow",
		info: "green",
		http: "magenta",
		verbose: "white",
		debug: "cyan"
	}
};

addColors(customLevelsOptions.colors);

const { combine, timestamp, printf, colorize, splat, json } = format;
const logFormat = ({ timestamp, level, message, ...meta }) => {
	const extra = Object.keys(meta).length
		? `|\n${JSON.stringify(meta, null, 2)}\n\n`
		: "";
	return `${timestamp} [${level.toUpperCase()}]: ${message} ${extra}`;
};

const logger = createLogger({
	levels: customLevelsOptions.levels,
	format: combine(
		timestamp(),
		splat(),
		printf(logFormat),
		colorize({ all: true })
	)
});

switch (process.env.NODE_ENV || "development") {
	case "development":
		logger.add(
			new transports.Console({
				level: "verbose"
			})
		);
		break;
	case "test":
		logger.add(
			new transports.Console({
				level: "debug"
			})
		);
		break;
	case "production":
		logger.format = combine(timestamp(), splat(), json());
		logger.add(
			new transports.DailyRotateFile({
				level: "error",
				filename: "error-%DATE%.log",
				datePattern: "YYYY-MM-DD",
				zippedArchive: true,
				maxSize: "7m",
				maxFiles: "1d",
				dirname: resolve(process.cwd(), "logs")
			})
		);
		logger.add(
			new transports.DailyRotateFile({
				level: "http",
				filename: "combined-%DATE%.log",
				datePattern: "YYYY-MM-DD",
				zippedArchive: true,
				maxSize: "5m",
				maxFiles: "1d",
				dirname: resolve(process.cwd(), "logs")
			})
		);
		break;
}

export default logger;
