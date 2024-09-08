import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "products.json";

const readProductsFile = readFile(FILE_NAME);
const saveProducts = writeFile(FILE_NAME);

export async function readProducts() {
	const products = await readProductsFile();
	return products;
}

export async function readMultipleById(arrayIds) {
	const arrayType = typeof arrayIds[0];
	const products = await readProductsFile();
	const productsByIds = products.filter((pr) => {
		return arrayIds.includes(arrayType === "string" ? pr.id.toString() : pr.id);
	});
	return productsByIds;
}

export async function readProduct(pid) {
	const products = await readProductsFile();
	const found = products.find((pr) => pr.id === pid);
	return found;
}

export async function readProductByCode(code) {
	const products = await readProductsFile();
	const found = products.find((pr) => pr.code === code);
	return found;
}

export async function createProduct(obj) {
	const products = await readProductsFile();
	const newProduct = {
		...obj,
		id: products.length ? products[products.length - 1].id + 1 : 1
	};
	products.push(newProduct);
	await saveProducts(products);
	return newProduct;
}

export async function updateProduct(pid, obj) {
	const products = await readProductsFile();
	const result = products.some((pr) => pr.id === pid && Object.assign(pr, obj));
	result && (await saveProducts(products));
	return result;
}

export async function deleteProduct(pid) {
	const products = await readProductsFile();
	const index = products.findIndex((p) => p.id === pid);
	const result = index !== -1 ? Boolean(products.splice(index, 1)) : false;
	index !== -1 && (await saveProducts(products));
	return result;
}
