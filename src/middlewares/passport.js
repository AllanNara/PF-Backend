import logger from "../../lib/winston.js";
import passport from "passport";

export const passportCall = (strategy, options = {}) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, options, (err, user, info, status) => {
			if (err) return next({ ...err, status });
			if (!user) {
				logger.warn(info.message ?? "User not found", {
					info: JSON.stringify(info)
				});
				return res
					.clearCookie("token")
					.status(status ?? 401)
					.json({ error: info.message ? info.message : info.toString() });
			}

			req.user = user;
			return options.successRedirect
				? res.redirect(options.successRedirect)
				: next();
		})(req, res, next);
	};
};

export const authorization = (role) => {
	return async (req, res, next) => {
		const { user } = req;
		if (!user) return res.status(401).json({ error: "Unauthorized" });
		if (!role.includes(user.role)) {
			return res.status(403).json({ error: "Forbidden" });
		}
		next();
	};
};
