import { localLogin, localRegister } from "./strategies/localStrategy.js";
import { githubLogin } from "./strategies/githubStrategy.js";
import { googleLogin } from "./strategies/googleStrategy.js";
import { jwtLogin } from "./strategies/jwtStrategy.js";
import passport from "passport";

const initializePassport = () => {
	passport.use("register", localRegister);
	passport.use("login", localLogin);
	passport.use("jwt", jwtLogin);
	passport.use("google", googleLogin);
	passport.use("github", githubLogin);
};

export default initializePassport;
