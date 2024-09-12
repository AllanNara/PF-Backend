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

export const authorization = (roles) => {
	if (!Array.isArray(roles)) roles = [roles];

	return (req, res, next) => {
		const { user } = req;
		if (!user)
			return res.status(401).json({ message: "User not authenticated" });

		if (!roles.includes(user.role)) {
			logger.verbose("User role not allowed in this route", {
				info: { allowedRoles: roles, userRole: user.role }
			});
			return res.status(403).json({ message: "User role not allowed" });
		}

		if (roles.includes("OWN")) {
			if (user.id !== req.params.pid || user.cart !== req.params.cid) {
				logger.verbose("User ID or Cart ID not match with params", {
					uid: user.id,
					cid: user.cart,
					params_uid: req.params.uid,
					params_cid: req.params.cid
				});
				return res
					.status(400)
					.json({ message: "User ID or Cart ID does not match" });
			}
		}
		next();
	};
};
