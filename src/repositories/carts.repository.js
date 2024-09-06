import getDAO from "../daos/factory.js";
import logger from "../../lib/winston.js";

const CartDAO = getDAO("Cart");
const ProductDAO = getDAO("Product");

export async function fetchCart(cid) {
	if (Object.prototype.hasOwnProperty.call(CartDAO, "readAndPopulateCart")) {
		return await CartDAO.readAndPopulateCart(cid);
	}
	const cart = await CartDAO.readCart(cid);
	if (Boolean(cart) && !cart.products.length) {
		const productIds = cart.products.map((pr) => pr.product);
		const products = await ProductDAO.getProductsByIds(productIds);
		const productMap = new Map(products.map((p) => [p.id, p]));
		cart.products = cart.products.map((productCart) => {
			const productFound = productMap.get(productCart.product);
			if (productFound) {
				productCart.product = productFound;
				return productCart;
			}
			logger.warn("The cart contains a non-existing product", {
				info: { pid: productCart }
			});
		});
	}
	return cart;
}

export async function createCart() {
	return await CartDAO.create();
}

export async function replaceCartProducts(cid, listProducts) {
	return await CartDAO.updateCart(cid, { products: listProducts });
}

export async function addProductToCart(cid, pid) {
	const cart = await CartDAO.readCart(cid);
	if (!cart) return null;
	const productExists = cart.products.find((pr) => pr.product === pid);
	if (!productExists) {
		cart.products.push({ product: pid, quantity: 1 });
	} else {
		productExists.quantity++;
	}
	await CartDAO.updateCart(cid, { products: cart.products });
}

export async function updateProductQuantity(cid, pid, quantity) {
	return await CartDAO.updateItemCart(cid, pid, quantity);
}

export async function deleteCartProduct(cid, pid) {
	return await CartDAO.deleteItemCart(cid, pid);
}
