import mongoose from "mongoose";

export const connectMongoDB = async () => {
	const URI = "mongodb://127.0.0.1:27017/pf-backend";

	const { connection } = await mongoose.connect(URI);
	connection.on("connected", () => console.info("MongoDB connected!"));
	connection.on("error", (err) => console.error("Mongo Error: " + err));
	connection.on("close", () => console.info("MongoDB closed..."));
};
