import mongoose from "mongoose";

export const connectMongoDB = async () => {
	const URI = "mongodb://127.0.0.1:27017/pf-backend";

	mongoose.connection
		.on("connected", () => console.info("MongoDB connected!"))
		.on("disconnected", () => console.info("MongoDB closed..."))
		.on("error", (err) => {
			console.error("Mongo Error: " + err);
		});

	const { connection } = await mongoose.connect(URI);
	return connection;
};
