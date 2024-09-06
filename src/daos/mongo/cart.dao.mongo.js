import { cartModel } from "./models/cart.model.js";

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
	const updated = await cartModel.updateOne(
		{ _id: cid, "products._id": pid },
		{ $set: { "products.$.quantity": quantity } }
	);
	return Boolean(updated);
}

export async function deleteItemCart(cid, pid) {
	const updated = await cartModel.updateOne(
		{ _id: cid },
		{ $pull: { products: { _id: pid } } },
		{ new: true }
	);
	return Boolean(updated);
}
