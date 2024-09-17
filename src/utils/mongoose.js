import config from "../../config/index.js";
import logger from "../../lib/winston.js";
import mongoose from "mongoose";

class MongoSingleton {
	constructor() {
		if (!MongoSingleton.instance) {
			MongoSingleton.instance = this;
			this.cachedConnection = null;
		}
		return MongoSingleton.instance;
	}

	async connect() {
		if (this.cachedConnection) {
			return this.cachedConnection;
		}

		mongoose.connection
			.on("connected", () => logger.info("MongoDB connected successfully"))
			.on("disconnected", () => logger.info("MongoDB closed..."));

		try {
			const connection = await mongoose.connect(config.MONGO_URI);
			this.cachedConnection = connection;
			return connection;
		} catch (error) {
			logger.error("Error connecting to MongoDB", {
				info: error.message || error
			});
			throw error;
		}
	}

	async close() {
		if (this.cachedConnection) {
			await mongoose.disconnect();
			this.cachedConnection = null;
			return true;
		}
	}
}

export default new MongoSingleton();
