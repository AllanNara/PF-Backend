import "../../lib/dotenv.js";
import session, { MemoryStore } from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import config from "../../config/index.js";
import logger from "../../lib/winston.js";
import path from "path";

let store;
switch (config.SESSION.STORE) {
	case "fs": {
		const FileStoreSession = FileStore(session);
		store = new FileStoreSession({
			path: path.join(process.cwd(), "src", "sessions"),
			retries: 2,
			ttl: 10 * 60,
			reapInterval: 5 * 60,
			reapAsync: true,
			logFn: (message) => {
				logger.verbose(message);
			}
		});
		break;
	}
	case "mongo":
		store = MongoStore.create({
			mongoUrl: config.MONGO_URI,
			mongoOptions: { retryWrites: true },
			dbName: "ecommercy",
			ttl: 10 * 60
		});
		break;
	case "redis":
		logger.warn("Redis store for sessions is not implemented yet");
		process.exit();
	// eslint-disable-next-line
	default: {
		logger.warn("Session Storage not defined, MemoryStore initialized");
		store = new MemoryStore();
	}
}

const optionSession = {
	store,
	secret: config.SESSION.SECRET || "S3cRét $ezzi0n",
	resave: false,
	saveUninitialized: false,
	unset: "destroy",
	name: "sid",
	cookie: { sameSite: "strict" }
	// rolling: true,
	// cookie: { maxAge: 10 * 60 * 1000 }
};

export default optionSession;
