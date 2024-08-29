import { Router } from "express";
import { passportCall } from "../../middlewares/passport.js";
import { setCookie } from "../../middlewares/setCookie.js";

const router = Router();

router.get(
	"/github/callback",
	passportCall("github", { session: false }),
	setCookie,
	(req, res) => res.json({ message: "Github login successful" })
);

router.get("/github", passportCall("github", { scope: ["user:email"] }));

router.get(
	"/google/callback",
	passportCall("google", { session: false }),
	setCookie,
	(req, res) => res.json({ message: "Google login successful" })
);

router.get("/google", passportCall("google", { scope: ["profile", "email"] }));

// Ruta current
router.get("/current", passportCall("jwt", { session: false }), (req, res) =>
	res.json(req.user)
);

// Ruta para Login
router.post(
	"/login",
	passportCall("login", {
		session: false,
		failureRedirect: "/api/auth/failure"
	}),
	setCookie,
	(req, res) => {
		res.json({ message: "Login successful" });
	}
);

// Ruta para Registro
router.post(
	"/register",
	passportCall("register", {
		session: false,
		successRedirect: "/api/auth/success",
		failureRedirect: "/api/auth/failure"
	})
);

// Ruta para Logout
router.post("/logout", (req, res) => {
	if (!req.signedCookies["token"]) return res.redirect("/api/auth/login");
	res.clearCookie("token");
	res.send("Logout successful");
});

// Ruta para éxito en autenticación o registro
router.get("/success", (req, res) => {
	res.json({ message: "Operation successful" });
});

// Ruta para fallo en autenticación o registro
router.get("/failure", (req, res) => {
	res.status(401).json({ message: "Operation failed" });
});

export default router;
