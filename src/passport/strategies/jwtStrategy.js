import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UserManager } from "../../dao/factory.js";
import config from "../../../config/index.js";
import logger from "../../../lib/winston.js";

export const jwtLogin = new JwtStrategy(
	{
		secretOrKey: config.JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
	},
	async (jwtPayload, done) => {
		try {
			const user = await UserManager.getUserById(jwtPayload.data.uid);
			if (!user) {
				logger.verbose("User not found");
				return done(null, false, { message: "User not found" });
			}
			done(null, user);
		} catch (error) {
			logger.warn("Error login user", { info: error.message ?? error });
			done(error);
		}
	}
);
function cookieExtractor(req) {
	let token = null;
	if (req && req.signedCookies) {
		token = req.signedCookies["token"];
	}
	return token;
}
