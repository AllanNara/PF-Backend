import { MONGO_URI } from "../../config/index.js";
import logger from "../../lib/winston.js";
import mongoose from "mongoose";

// Variable para almacenar la conexión singleton;
let cachedConnection = null;

export const connectMongoDB = async () => {
	if (cachedConnection) {
		return cachedConnection;
	}

	mongoose.connection
		.on("connected", () => logger.info("MongoDB connected successfully"))
		.on("disconnected", () => logger.info("MongoDB closed..."));

	try {
		const connection = await mongoose.connect(MONGO_URI);
		cachedConnection = connection;
		return connection;
	} catch (error) {
		logger.error("Error connecting to MongoDB", {
			info: error.message || error
		});
		throw error;
	}
};

export const closeMongoDB = async () => {
	if (cachedConnection) {
		await mongoose.disconnect();
		cachedConnection = null;
	}
};
