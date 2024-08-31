import {
	currentController,
	failureController,
	githubAuth,
	githubCallback,
	googleAuth,
	googleCallback,
	loginController,
	logoutController,
	registerController,
	successController
} from "../../controllers/auth.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/login", [...loginController]);
router.post("/register", registerController);
router.post("/logout", logoutController);

// Current user
router.get("/current", [...currentController]);

router.get("/success", successController);
router.get("/failure", failureController);

// Auth with Github
router.get("/github", githubAuth);
router.get("/github/callback", [...githubCallback]);

// Auth with Google
router.get("/google", googleAuth);
router.get("/google/callback", [...googleCallback]);

export default router;
