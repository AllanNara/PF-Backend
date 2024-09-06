import { PaginationParameters } from "mongoose-paginate-v2";
import { productModel } from "./models/product.model.js";

export async function getPaginateProducts(query) {
	const parameters = new PaginationParameters({ query });
	return await productModel.paginate(...parameters.get());
}

export async function readProducts() {
	return await productModel.find({});
}

export async function readMultipleById(arrayIds) {
	return await productModel.find({ id: { $in: arrayIds } });
}

export async function readProduct(pid) {
	return await productModel.findById(pid);
}

export async function readProductByCode(code) {
	return await productModel.findOne({ where: { code } });
}

export async function createProduct(obj) {
	return await productModel.create(obj);
}

export async function updateProduct(pid, obj) {
	const updated = await productModel.findByIdAndUpdate(pid, { $set: obj });
	return Boolean(updated);
}

export async function deleteProduct(pid) {
	const deleted = await productModel.findByIdAndDelete(pid);
	return Boolean(deleted);
}
