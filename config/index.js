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
		SECRET: env.SECRET_SESSION
	},
	DISPLAY: options.display
};

config.ORIGIN = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;

export default config;
