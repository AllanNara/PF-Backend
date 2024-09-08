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
	return await productModel.find({ _id: { $in: arrayIds } });
}

export async function readProduct(pid) {
	const result = await productModel.findById(pid);
	return result ? result.toObject() : result;
}

export async function readProductByCode(code) {
	const produce = await productModel.findOne({ code });
	return produce;
}

export async function createProduct(obj) {
	const newProduct = (await productModel.create(obj)).toObject();
	return newProduct;
}

export async function updateProduct(pid, obj) {
	const updated = await productModel.findByIdAndUpdate(pid, { $set: obj });
	return Boolean(updated);
}

export async function deleteProduct(pid) {
	const deleted = await productModel.findByIdAndDelete(pid);
	return Boolean(deleted);
}
