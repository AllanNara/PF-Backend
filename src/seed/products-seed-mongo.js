import MongoSingleton from "../utils/mongoose.js";
import mongoose from "mongoose";
import { productModel } from "../daos/mongo/models/product.model.js";

const seedProductsMongo = async (data) => {
	console.info("Running seeders in mongo...");
	try {
		await MongoSingleton.connect();

		// Clean the product collection
		await productModel.deleteMany({});
		await productModel.create(data);

		console.info("MONGOOSE: Products seeding completed!");
		await MongoSingleton.close();
	} catch (err) {
		console.error("MONGOOSE: Seeding products failed\n", err);
		mongoose.connection.close();
		process.exit(1);
	}
};

export default seedProductsMongo;
