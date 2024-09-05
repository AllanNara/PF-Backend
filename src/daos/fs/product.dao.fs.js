import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "products.json";

const readProductsFile = readFile(FILE_NAME);
const saveProducts = writeFile(FILE_NAME);

export async function readProducts() {
	const products = await readProductsFile();
	return products;
}

export async function readMultipleById(arrayIds) {
	const products = await readProductsFile();
	const productsByIds = products.map((pr) => arrayIds.includes(pr.id));
	return productsByIds;
}

export async function readById(pid) {
	const products = await readProductsFile();
	const found = products.find((pr) => pr.id === pid);
	return found;
}

export async function readByCode(code) {
	const products = await readProductsFile();
	const found = products.find((pr) => pr.code === code);
	return found;
}

export async function create(obj) {
	const products = await readProductsFile();
	const newProduct = {
		...obj,
		id: products.length ? products[products.length - 1].id + 1 : 1
	};
	products.push(newProduct);
	await saveProducts(products);
	return newProduct;
}

export async function updateById(pid, obj) {
	const products = await readProductsFile();
	const result = products.some((pr) => pr.id === pid && Object.assign(pr, obj));
	await saveProducts(products);
	return result;
}

export async function deleteById(pid) {
	const products = await readProductsFile();
	const index = products.findIndex((p) => p.id === pid);
	const result = index !== -1 ? Boolean(products.splice(index, 1)) : false;
	await saveProducts(products);
	return result;
}
