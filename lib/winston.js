import { addColors, createLogger, format, transports } from "winston";
import { NODE_ENV } from "../config/index.js";
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

switch (NODE_ENV || "development") {
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
		logger.debug("----------------------");
		logger.debug("--- **DEBUG MODE** ---");
		logger.debug("----------------------");
		break;
	case "production":
		logger.format = combine(timestamp(), splat(), json());
		logger.add(
			new transports.File({
				level: "error",
				filename: resolve(process.cwd(), "logs", "errors.log")
			})
		);
		logger.add(
			new transports.File({
				level: "http",
				filename: resolve(process.cwd(), "logs", "combined.log")
			})
		);
		break;
}

export default logger;

// :: Extra: Crear 3 tests en ApiDog (correctas, incorrectas, invalidas) separado en products y carts
