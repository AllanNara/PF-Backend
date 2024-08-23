import passport from "passport";

export const passportCall = (strategy, options = {}) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, options, (err, user, info, status) => {
			if (!err) {
				if (!user) {
					return res
						.clearCookie("token")
						.status(status ?? 401)
						.json({ error: info.messages ? info.messages : info.toString() });
				}
				req.user = user;
				if (options.successRedirect)
					return res.redirect(options.successRedirect);
				return next();
			}
			if (status) err.status = status;
			next(err);
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
