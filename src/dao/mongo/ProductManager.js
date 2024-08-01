import { PaginationParameters } from "mongoose-paginate-v2";
import logger from "../../utils/winston.js";
import { productModel } from "./models/product.model.js";

export async function checkCodeExists(code) {
	const doc = await productModel.findOne({ code });
	if (doc) logger.warn("Code '%s' already in use", code);
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
	try {
		const response = await productModel.create(product);
		return response;
	} catch (error) {
		const warning = error?.errors?.code.message || error.message;
		logger.warn(warning);
		return null;
	}
}

export async function getProductById(pid) {
	try {
		const doc = await productModel.findById(pid);
		return doc;
	} catch (error) {
		if (error?.message.includes("Cast to ObjectId failed")) {
			logger.warn("Product '%s' not found", pid);
			return null;
		}
		throw error;
	}
}

export async function updateProduct(pid, obj) {
	const updated = await productModel.findByIdAndUpdate(
		pid,
		{ $set: obj },
		{ new: true }
	);
	if (!updated) logger.warn("Product '%s' not found", pid);
	return updated;
}

export async function deleteProduct(pid) {
	const deleted = await productModel.findByIdAndDelete(pid);
	if (!deleted) logger.warn("Product '%s' not found", pid);
	return deleted;
}
