import { Strategy as LocalStrategy } from "passport-local";
import { generateJwt } from "../../utils/jwt.js";
import getService from "../../services/index.js";
import logger from "../../../lib/winston.js";

const UserService = getService("User");

export const localRegister = new LocalStrategy(
	{
		usernameField: "email",
		passReqToCallback: true
	},
	async (req, userEmail, password, done) => {
		try {
			const { first_name, last_name, email, age } = req.body;

			const user = await UserService.register({
				first_name,
				last_name,
				email,
				password,
				age
			});

			done(null, user);
		} catch (error) {
			logger.warn("Error register user", { info: error.message ?? error });
			done(error);
		}
	}
);

export const localLogin = new LocalStrategy(
	{ usernameField: "email" },
	async (userEmail, password, done) => {
		try {
			const user = await UserService.login({ email: userEmail, password });

			if (!user) done(null, false, { message: "Invalid credentials" });

			const token = await generateJwt(user);
			return done(null, { token });
		} catch (error) {
			logger.warn("Error login user", { info: error.message ?? error });
			done(error);
		}
	}
);
