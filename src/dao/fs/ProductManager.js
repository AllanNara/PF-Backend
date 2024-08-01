import { readFile, writeFile } from "./ManagerFileSystem.js";
import logger from "../../utils/winston.js";
import paginateDocs from "./lib/paginate.js";

const FILE_NAME = "products.json";

const readProductsFile = readFile(FILE_NAME);
const saveProducts = writeFile(FILE_NAME);

export async function checkCodeExists(code, data = []) {
	let products = data;
	if (!products.length) {
		products = await readProductsFile();
	}
	const findCode = products.find((pr) => pr.code === code);
	if (findCode) logger.warn("Code '%s' already in use", code);
	return Boolean(findCode);
}

export async function getProducts(options) {
	const products = await readProductsFile();
	return paginateDocs(products, options);
}

export async function addProduct(product) {
	const products = await readProductsFile();

	const { title, description, code, price, stock, category } = product;

	const status = product.status || true;
	const thumbnails = product.thumbnails || [];

	if (await checkCodeExists(code, products)) return null;
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
		logger.warn("Product '%s' not found", pid);
		return null;
	}

	return productFound;
}

export async function updateProduct(pid, obj) {
	const products = await readProductsFile();
	const productIndex = products.findIndex((pr) => pr.id === parseInt(pid));

	if (productIndex < 0) {
		logger.warn("Product '%s' not found", pid);
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
		logger.warn("Product '%s' not found", pid);
		return null;
	}

	products.splice(productIndex, 1);
	await saveProducts(products);
	return true;
}
