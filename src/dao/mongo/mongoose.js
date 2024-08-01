import logger from "../../utils/winston.js";
import mongoose from "mongoose";

export const connectMongoDB = async () => {
	const URI = "mongodb://127.0.0.1:27017/pf-backend";

	mongoose.connection
		.on("connected", () => logger.info("MongoDB connected!"))
		.on("disconnected", () => logger.info("MongoDB closed..."))
		.on("error", (err) => {
			logger.error("Mongo Error", { info: err.message || err });
		});

	const { connection } = await mongoose.connect(URI);
	return connection;
};
