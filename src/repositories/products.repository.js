import getDAO from "../daos/factory.js";

const ProductDAO = getDAO("Product");

export async function fetchProducts(queryParams) {
	if (Object.prototype.hasOwnProperty.call(ProductDAO, "getPaginateProducts")) {
		return await ProductDAO.getPaginateProducts(queryParams);
	}
	return await ProductDAO.readProducts();
}

export async function createProduct(obj) {
	return await ProductDAO.createProduct(obj);
}

export async function getProduct(pid) {
	return await ProductDAO.readProduct(pid);
}

export async function getProductsById(ids) {
	return await ProductDAO.readMultipleById(ids);
}

export async function updateProduct(pid, obj) {
	return await ProductDAO.updateProduct(pid, obj);
}

export async function deleteProduct(pid) {
	return await ProductDAO.deleteProduct(pid);
}

export async function findProductByCode(code) {
	return Boolean(await ProductDAO.readProductByCode(code));
}
