import { Strategy as GithubStrategy } from "passport-github2";
import { UserManager } from "../../dao/factory.js";
import config from "../../../config/index.js";
import { generateJwt } from "../../utils/jwt.js";
import logger from "../../../lib/winston.js";

export const githubLogin = new GithubStrategy(
	{
		clientID: config.GITHUB.CLIENT_ID,
		clientSecret: config.GITHUB.CLIENT_SECRET,
		callbackURL: config.GITHUB.CALLBACK_URL
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			let token;
			const email = profile._json.email;
			const user = await UserManager.getUserByEmail(email);
			if (!user) {
				const [first_name, last_name] = profile._json.name.split(" ");
				const newUser = await UserManager.createUser({
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
			logger.warn("Error login user with Github", {
				info: error.message ?? error
			});
			done(error);
		}
	}
);
