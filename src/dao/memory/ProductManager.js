import logger from "../../../lib/winston.js";
import paginateDocs from "../../utils/paginate.js";

const products = [];
let currentId = 0;

const checkCodeExists = (code) => products.some((pr) => pr.code === code);
export function getProducts(options) {
	return paginateDocs(products, options);
}

export function addProduct(product) {
	const { title, description, code, price, stock, category } = product;

	const status = product.status || true;
	const thumbnails = product.thumbnails || [];

	if (checkCodeExists(code, products)) return null;
	const id = ++currentId;

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
	return newProduct;
}

export function getProductById(pid) {
	const productFound = products.find((pr) => pr.id === parseInt(pid));
	if (!productFound) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	return productFound;
}

export function updateProduct(pid, obj) {
	const productIndex = products.findIndex((pr) => pr.id === parseInt(pid));
	if (productIndex < 0) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	products[productIndex] = { ...products[productIndex], ...obj };
	return true;
}

export function deleteProduct(pid) {
	const productIndex = products.findIndex((pr) => pr.id === parseInt(pid));
	if (productIndex < 0) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	products.splice(productIndex, 1);
	return true;
}
