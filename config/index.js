import "../lib/dotenv.js";
import options from "./command-line.js";
const { env } = process;

const config = {
	NODE_ENV: env.NODE_ENV,
	MONGO_URI: env.MONGO_URI || "mongodb://127.0.0.1:27017/pf-backend",
	PORT: env.PORT ? Number(env.PORT) : 8080,
	HOST: env.HOST || "127.0.0.1",
	PROTOCOL: env.PROTOCOL || "http",
	DAO: options.dao,
	DEBUG: options.debug,
	SESSION: {
		STORE: options.sstorage,
		SECRET: env.SECRET_SESSION || "S3cR3t$3z0n"
	},
	DISPLAY: options.display,
	JWT_SECRET: env.JWT_SECRET || "S3cR3tJWtT0k3n",
	COOKIE_SECRET: env.COOKIE_SECRET || "S3cR3tC0okIe",
	GITHUB: {
		CLIENT_ID: env.GITHUB_CLIENT_ID,
		CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
		CALLBACK_URL: env.GITHUB_CALLBACK_URL
	}
};

config.ORIGIN = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;

export default config;
