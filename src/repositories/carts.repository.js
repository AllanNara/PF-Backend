import getDAO from "../daos/factory.js";
import logger from "../../lib/winston.js";

const CartDAO = getDAO("Cart");
const ProductDAO = getDAO("Product");

export async function fetchCart(cid) {
	if (Object.prototype.hasOwnProperty.call(CartDAO, "readAndPopulateCart")) {
		return await CartDAO.readAndPopulateCart(cid);
	}
	const cart = await CartDAO.readCart(cid);
	if (Boolean(cart) && cart.products.length) {
		const products = await ProductDAO.readMultipleById(
			cart.products.map((pr) => pr.product)
		);
		const productMap = new Map(products.map((p) => [p.id, p]));
		cart.products = cart.products.filter((productCart) => {
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
	let productExists = cart.products.find((pr) => {
		return pr.product.toString() === pid.toString();
	});
	if (!productExists) {
		productExists = { product: pid, quantity: 1 };
		cart.products.push(productExists);
	} else {
		productExists.quantity++;
	}
	await CartDAO.updateCart(cid, { products: cart.products });
	return productExists;
}

export async function updateProductQuantity(cid, pid, quantity) {
	return await CartDAO.updateItemCart(cid, pid, quantity);
}

export async function deleteCartProduct(cid, pid) {
	return await CartDAO.deleteItemCart(cid, pid);
}
