import { Strategy as GithubStrategy } from "passport-github2";
// import { UserManager } from "../../dao/factory.js";
import config from "../../../config/index.js";
import logger from "../../../lib/winston.js";

export const githubLogin = new GithubStrategy(
	{
		clientID: config.GITHUB.CLIENT_ID,
		clientSecret: config.GITHUB.CLIENT_SECRET,
		callbackURL: config.GITHUB.CALLBACK_URL
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			// const user = await userModel.findOne({ email: profile._json.email });
			// const user = await UserManager.getUserByGithub(profile);
			// console.log({
			// accessToken,
			// refreshToken
			// profile
			// });
			// :: Crear usuario si no existe y enviar el token de acceso
			done(null, profile);
		} catch (error) {
			logger.warn("Error login user", { info: error.message ?? error });
			done(error);
		}
	}
);
