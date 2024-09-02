import { addProduct } from "../daos/fs/ProductDAO.js";
import { cartModel } from "../daos/mongo/models/cart.model.js";
import { connectMongoDB } from "../utils/mongoose.js";
import fs from "fs/promises";
import { join } from "path";
import mongoose from "mongoose";
import { productModel } from "../daos/mongo/models/product.model.js";
import { writeFile } from "../daos/fs/DAOFileSystem.js";

const writeFileProducts = writeFile("products.json");

const readMockFile = async () => {
	try {
		const pathFile = join(import.meta.dirname, "json", "MOCK_PRODUCTS.json");
		const json = await fs.readFile(pathFile, "utf-8");
		const data = JSON.parse(json);
		return data;
	} catch (err) {
		console.error("Read mock file failed\n", err);
	}
};

export const clearFile = async () => writeFileProducts([]);

export const seedProductsFile = async () => {
	console.info("Running seeders on files...");
	try {
		const data = await readMockFile();
		for (let i = 0; i < data.length; i++) {
			await addProduct(data[i]);
		}
		console.info("FS: Products seeding completed!");
	} catch (err) {
		console.error("FS: Seeding products failed\n", err);
		process.exit(1);
	}
};

export const seedProductsMongo = async () => {
	console.info("Running seeders in mongo...");
	try {
		const conn = await connectMongoDB();
		// Limpiar la colección de productos y carritos
		await productModel.deleteMany({});
		await cartModel.deleteMany({});

		const data = await readMockFile();
		await productModel.create(data);

		console.info("MONGOOSE: Products seeding comlpeted!");
		conn.close();
	} catch (err) {
		console.error("MONGOOSE: Seeding products failed\n", err);
		mongoose.connection.close();
		process.exit(1);
	}
};
