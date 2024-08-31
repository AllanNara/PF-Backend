import { passportCall } from "../middlewares/passport.js";
import { setCookie } from "../middlewares/setCookie.js";

export const successController = (req, res) => {
	res.json({ message: "Operation successful" });
};

export const failureController = (req, res) => {
	res.status(401).json({ message: "Operation failed" });
};

export const logoutController = (req, res) => {
	if (!req.signedCookies["token"]) return res.redirect("/api/auth/login");
	res.clearCookie("token");
	res.send("Logout successful");
};

export const registerController = passportCall("register", {
	session: false,
	successRedirect: "/api/auth/success",
	failureRedirect: "/api/auth/failure"
});

export const loginController = [
	passportCall("login", {
		session: false,
		failureRedirect: "/api/auth/failure"
	}),
	setCookie,
	(req, res) => {
		res.json({ message: "Login successful" });
	}
];

export const currentController = [
	passportCall("jwt", { session: false }),
	(req, res) => res.json(req.user)
];

export const googleAuth = passportCall("google", {
	scope: ["profile", "email"]
});

export const googleCallback = [
	passportCall("google", { session: false }),
	setCookie,
	(req, res) => {
		res.send("Google login successful");
	}
];

export const githubAuth = passportCall("github", { scope: ["user:email"] });

export const githubCallback = [
	passportCall("github", { session: false }),
	setCookie,
	(req, res) => {
		res.send("Github login successful");
	}
];
