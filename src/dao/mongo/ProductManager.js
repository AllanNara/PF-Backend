import { PaginationParameters } from "mongoose-paginate-v2";
import { productModel } from "./models/product.model.js";

export async function checkCodeExists(code) {
	const doc = await productModel.findOne({ code });
	if (doc) console.error("Code already in use");
	return Boolean(doc);
}

export async function getProducts(query) {
	if (query.sort) query.sort = { price: `${query.sort}` };
	const parameters = new PaginationParameters({ query });
	const docs = await productModel.paginate(...parameters.get());
	Object.prototype.hasOwnProperty.call(docs, "offset") && delete docs.offset;
	docs.payload.forEach((product) => {
		delete product._id;
		delete product.__v;
	});
	return docs;
}

export async function addProduct(product) {
	const response = await productModel.create(product);
	return response;
}

export async function getProductById(pid) {
	const doc = await productModel.findById(pid);
	return doc;
}

export async function updateProduct(pid, obj) {
	const updated = await productModel.findByIdAndUpdate(
		pid,
		{ $set: obj },
		{ new: true }
	);
	return updated;
}

export async function deleteProduct(pid) {
	const deleted = await productModel.findByIdAndDelete(pid);
	return deleted;
}
