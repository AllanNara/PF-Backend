import { Strategy as LocalStrategy } from "passport-local";
import { generateJwt } from "../../utils/jwt.js";
import getDAO from "../../daos/factory.js";
import logger from "../../../lib/winston.js";

const UserDAO = getDAO("User");

export const localRegister = new LocalStrategy(
	{
		usernameField: "email",
		passReqToCallback: true
	},
	async (req, userEmail, password, done) => {
		try {
			const userExists = await UserDAO.getUserByEmail(userEmail);
			if (userExists) {
				logger.verbose("Email '%s' is already in use", userEmail);
				return done(null, false, { message: "Email already in use" });
			}

			const { first_name, last_name, email, age } = req.body;
			const user = await UserDAO.createUser({
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
			const user = await UserDAO.getUserByEmail(userEmail);

			if (user && (await user.validatePassword(password))) {
				const token = await generateJwt(user);
				return done(null, { token });
			}

			logger.verbose("Invalid credentials");
			done(null, false, { message: "Invalid credentials" });
		} catch (error) {
			logger.warn("Error login user", { info: error.message ?? error });
			done(error);
		}
	}
);
