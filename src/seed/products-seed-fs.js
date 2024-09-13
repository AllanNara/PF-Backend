import { createProduct } from "../daos/fs/product.dao.fs.js";
import { writeFile } from "../daos/fs/ManagerFileSystem.js";

const writeFileProducts = writeFile("products.json");

const seedProductsFile = async (data) => {
	console.info("Running seeders on files...");
	await writeFileProducts([]);
	try {
		for (let i = 0; i < data.length; i++) {
			await createProduct(data[i]);
		}
		console.info("FS: Products seeding completed!");
	} catch (err) {
		console.error("FS: Seeding products failed\n", err);
		process.exit(1);
	}
};

export default seedProductsFile;
