import { Strategy as LocalStrategy } from "passport-local";
import { UserManager } from "../../dao/factory.js";
import { generateJwt } from "../../utils/jwt.js";
import logger from "../../../lib/winston.js";

export const localRegister = new LocalStrategy(
	{
		usernameField: "email",
		passReqToCallback: true
	},
	async (req, userEmail, password, done) => {
		try {
			const userExists = await UserManager.getUserByEmail(userEmail);
			if (userExists) {
				logger.verbose("Email '%s' is already in use", userEmail);
				return done(null, false);
			}

			const { first_name, last_name, email, age } = req.body;
			const user = await UserManager.createUser({
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
			const user = await UserManager.getUserByEmail(userEmail);

			if (user && (await user.validatePassword(password))) {
				const token = await generateJwt(user);
				return done(null, { token });
			}

			logger.verbose("Invalid credentials");
			done(null, false);
		} catch (error) {
			logger.warn("Error login user", { info: error.message ?? error });
			done(error);
		}
	}
);
