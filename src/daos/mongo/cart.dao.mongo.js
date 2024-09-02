import { cartModel } from "./models/cart.model.js";
import logger from "../../../lib/winston.js";

export async function addCart() {
	const response = await cartModel.create({});
	return response;
}

export async function getCartById(cid) {
	const doc = await cartModel.findById(cid).lean();
	if (!doc) logger.verbose("Cart '%s' not found", cid);
	doc.id = doc._id;
	delete doc._id;
	delete doc.__v;
	return doc;
}

export async function addProductToCart(cid, pid) {
	let cartWithProduct = await cartModel.findOneAndUpdate(
		{ _id: cid, "products.product": pid },
		{ $inc: { "products.$.quantity": 1 } },
		{ new: true }
	);

	if (!cartWithProduct) {
		cartWithProduct = await cartModel.findOneAndUpdate(
			{ _id: cid },
			{ $push: { products: { product: pid } } },
			{ new: true }
		);

		if (!cartWithProduct) {
			logger.verbose("Cart '%s' not found", cid);
			return null;
		}
	}

	return cartWithProduct;
}

export async function updateEntireCart(cid, products) {
	const updatedCart = await cartModel.findByIdAndUpdate(
		cid,
		{ $set: { products } },
		{ new: true }
	);

	if (!updatedCart) {
		logger.verbose("Cart '%s' not found", cid);
		return null;
	}

	return updatedCart;
}

export async function emptyCart(cid) {
	const cartDoc = await cartModel.findById(cid);

	if (!cartDoc) {
		logger.verbose("Cart '%s' not found", cid);
		return null;
	}

	cartDoc.products = [];
	cartDoc.save();

	return cartDoc;
}

export async function updateCartProduct(cid, pid, quantity) {
	let cartWithProduct = await cartModel.findOneAndUpdate(
		{ _id: cid, "products.product": pid },
		{ $set: { "products.$.quantity": quantity } },
		{ new: true }
	);

	if (!cartWithProduct) {
		cartWithProduct = await cartModel.findOneAndUpdate(
			{ _id: cid },
			{ $addToSet: { products: { product: pid, quantity } } },
			{ new: true }
		);

		if (!cartWithProduct) logger.verbose("Cart '%s' not found", cid);
	}

	return cartWithProduct;
}

export async function deleteCartProduct(cid, pid) {
	const cartWithProduct = await cartModel.findOneAndUpdate(
		{ _id: cid },
		{ $pull: { products: { product: pid } } },
		{ new: true }
	);

	if (!cartWithProduct) logger.verbose("Cart '%s' not found", cid);
	return cartWithProduct;
}
