import { cartModel } from "./models/cart.model.js";

export async function readCart(cid) {
	return await cartModel.findById(cid);
}

export async function create() {
	return await cartModel.create({});
}

export async function updateCartById(cid, obj) {
	const updated = await cartModel.findByIdAndUpdate(cid, { $set: obj });
	return Boolean(updated);
}

export async function deleteCartById(cid) {
	const deleted = await cartModel.findByIdAndDelete(cid);
	return Boolean(deleted);
}
