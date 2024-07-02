import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "products.json";

const readProductsFile = readFile(FILE_NAME);
const saveProducts = writeFile(FILE_NAME);

export async function getProducts() {
	return await readProductsFile();
}

export async function addProduct(product) {
	const products = await readProductsFile();

	const { title, description, code, price, stock, category } = product;
	if (isNaN(parseInt(stock)) || isNaN(parseInt(price))) {
		throw new Error("Invalid values");
	}

	const status = product.status || true;
	const thumbnails = product.thumbnails || [];

	if (!title || !description || !code || !price || !stock || !category) {
		console.error("Missing fields");
		return null;
	}

	const findCode = products.find((pr) => pr.code === code);
	if (findCode) {
		console.error("Code alredy in use");
		return null;
	}

	const id = products.length ? products[products.length - 1].id + 1 : 1;

	const newProduct = {
		id,
		title,
		description,
		code,
		price,
		stock,
		category,
		status,
		thumbnails
	};

	products.push(newProduct);
	await saveProducts(products);
	return newProduct;
}

export async function getProductById(pid) {
	const products = await readProductsFile();
	const productFound = products.find((pr) => pr.id === parseInt(pid));

	if (!productFound) {
		console.warn("Product not found");
		return null;
	}

	return productFound;
}

export async function updateProduct(pid, obj) {
	const products = await readProductsFile();
	const productIndex = products.findIndex((pr) => pr.id === parseInt(pid));

	if (productIndex < 0) {
		console.warn("Product not found");
		return null;
	}

	if (obj.id) delete obj.id;
	products[productIndex] = { ...products[productIndex], ...obj };
	await saveProducts(products);
	return products[productIndex];
}

export async function deleteProduct(pid) {
	const products = await readProductsFile();
	const productIndex = products.findIndex((pr) => pr.id === parseInt(pid));

	if (productIndex < 0) {
		console.warn("Product not found");
		return null;
	}

	products.splice(productIndex, 1);
	await saveProducts(products);
	return true;
}
