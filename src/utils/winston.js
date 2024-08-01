import winston from "winston";

const customLevelsOptions = {
	levels: { error: 0, warn: 1, info: 2, http: 3, debug: 4 },
	colors: {
		error: "red",
		warn: "yellow",
		info: "green",
		http: "magenta",
		debug: "cyan"
	}
};

winston.addColors(customLevelsOptions.colors);

const { combine, timestamp, printf, colorize, splat } = winston.format;
const logFormat = ({ timestamp, level, message, ...meta }) => {
	const extra = Object.keys(meta).length
		? `|\n${JSON.stringify(meta, null, 2)}\n\n`
		: "";
	return `${timestamp} [${level.toUpperCase()}]: ${message} ${extra}`;
};

const format = combine(
	timestamp(),
	splat(),
	printf(logFormat),
	colorize({ all: true })
);

const loggerDev = winston.createLogger({
	levels: customLevelsOptions.levels,
	transports: [
		new winston.transports.Console({
			level: "debug",
			format
		}),
		new winston.transports.File({
			level: "warn",
			filename: "./error.log",
			format: winston.format.json()
		})
	]
});

let logger = loggerDev;

export default logger;
