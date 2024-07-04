import { productModel } from "./models/product.model.js";

export async function getProducts() {
	const docs = await productModel.find({});
	return docs;
}

export async function addProduct(product) {
	const codeExists = await productModel.findOne({ code: product.code });
	if (codeExists) return null;
	const response = await productModel.create(product);
	return response;
}

export async function getProductById(pid) {
	const doc = await productModel.findById(pid);
	return doc;
}

export async function updateProduct(pid, obj) {
	const updated = await productModel.findByIdAndUpdate(pid, { $set: obj });
	return updated;
}

export async function deleteProduct(pid) {
	const deleted = await productModel.findByIdAndDelete(pid);
	return deleted;
}
