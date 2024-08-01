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
const loggerDev = winston.createLogger({
	levels: customLevelsOptions.levels,
	transports: [
		new winston.transports.Console({
			level: "debug",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message, ...meta }) => {
					const extra = Object.keys(meta).length
						? `|\n ${JSON.stringify(meta, null, 2)}`
						: "";
					return `${timestamp} [${level.toUpperCase()}]: ${message} ${extra}`;
				}),
				winston.format.colorize({ all: true })
			)
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
