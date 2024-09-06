import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../../config/index.js";
import { generateJwt } from "../../utils/jwt.js";
import getService from "../../services/index.js";
import logger from "../../../lib/winston.js";

const UserService = getService("User");

export const googleLogin = new GoogleStrategy(
	{
		clientID: config.GOOGLE.CLIENT_ID,
		clientSecret: config.GOOGLE.CLIENT_SECRET,
		callbackURL: config.GOOGLE.CALLBACK_URL
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			let token;
			const email = profile._json.email;
			const user = await UserService.checkEmailAvailable(email);
			if (!user) {
				const [first_name, last_name] = profile._json.name.split(" ");
				const newUser = await UserService.register({
					first_name,
					last_name,
					email,
					age: null,
					password: null
				});
				token = await generateJwt(newUser);
			} else {
				token = await generateJwt(user);
			}
			done(null, { token });
		} catch (error) {
			logger.warn("Error login user with Google", {
				info: error.message ?? error
			});
			done(error);
		}
	}
);
