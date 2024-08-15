import { Router } from "express";
import passport from "passport";

const router = Router();

// Ruta current
router.get(
	"/current",
	async (req, res, next) => {
		const passportStrategy = passport.authenticate(
			"jwt",
			{ session: false },
			(err, user, info) => {
				if (err) return next(err);
				if (!user) {
					return res
						.clearCookie("jwt")
						.status(401)
						.json({ error: info.messages ? info.messages : info.toString() });
				}
				req.user = user;
				next();
			}
		);
		passportStrategy(req, res, next);
	},
	(req, res) => {
		res.json(req.user);
	}
);

// Ruta para Login
router.post(
	"/login",
	passport.authenticate("login", {
		session: false,
		failureRedirect: "/api/auth/failure" // Redirige a esta ruta si la autenticación falla
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
	passport.authenticate("register", {
		session: false,
		successRedirect: "/api/auth/success", // Redirige a esta ruta si el registro es exitoso
		failureRedirect: "/api/auth/failure" // Redirige a esta ruta si el registro falla
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
