import { cartModel } from "./models/cart.model.js";

export async function addCart() {
	const response = await cartModel.create({});
	return response;
}

export async function getCartById(cid) {
	const doc = await cartModel.findById(cid).lean();
	return doc;
}

export async function addProductToCart(cid, pid) {
	const cartDoc = await cartModel.findById(cid);
	if (!cartDoc) {
		console.error("Cart	not found");
		return null;
	}
	const productFound = cartDoc.products.find(
		(pr) => pr.product.toString() === pid
	);
	if (productFound) productFound.quantity++;
	else cartDoc.products.push({ product: pid });
	await cartDoc.save();

	return cartDoc;
}
