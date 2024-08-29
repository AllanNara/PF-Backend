export const setCookie = (req, res, next) => {
	if (req.user.token) {
		res.cookie("token", req.user.token, {
			httpOnly: true,
			sameSite: "strict",
			signed: true
		});
		return next();
	}
	next("Token not found");
};
