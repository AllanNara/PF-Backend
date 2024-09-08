import { cartModel } from "./models/cart.model.js";

export async function readAndPopulateCart(cid) {
	const cartDetail = await cartModel
		.findById(cid)
		.populate("products.product")
		.lean();
	return cartDetail.toObject();
}

export async function readCart(cid) {
	return await cartModel.findById(cid);
}

export async function create() {
	return await cartModel.create({});
}

export async function updateCart(cid, obj) {
	const updated = await cartModel.findByIdAndUpdate(cid, {
		$set: { products: obj.products }
	});
	return Boolean(updated);
}

export async function deleteCart(cid) {
	const deleted = await cartModel.findByIdAndDelete(cid);
	return Boolean(deleted);
}

export async function updateItemCart(cid, pid, quantity) {
	const updated = await cartModel.findOneAndUpdate(
		{ _id: cid, "products.product": pid },
		{ $set: { "products.$.quantity": quantity } }
	);
	return Boolean(updated);
}

export async function deleteItemCart(cid, pid) {
	const updated = await cartModel.findOneAndUpdate(
		{ _id: cid, "products.product": pid },
		{ $pull: { products: { product: pid } } }
	);
	return Boolean(updated);
}
