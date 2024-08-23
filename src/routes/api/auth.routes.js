import { Router } from "express";
import { passportCall } from "../../middlewares/passport.js";

const router = Router();

router.get(
	"/github/callback",
	passportCall("github", { session: false }),
	(req, res) => res.json(req.user)
);

router.get("/github", passportCall("github", { scope: ["user:email"] }));

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
	(req, res) => {
		res.cookie("token", req.user.token, {
			httpOnly: true,
			sameSite: "strict",
			signed: true
		});
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
