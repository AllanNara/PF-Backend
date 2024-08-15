import logger from "../../lib/winston.js";

export const loggers = (req, res, next) => {
	req.logger = logger;
	next();
};
