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

export async function replaceCartProducts(cid, productsIds) {
	return await CartDAO.updateCartById(cid, { products: productsIds });
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
	await CartDAO.updateCartById(cid, { products: cart.products });
}

export async function updateProductQuantity(cid, pid, quantity) {
	const cart = await CartDAO.readCart(cid);
	if (!cart) return null;
	const productCart = cart.products.find((pr) => pr.product === pid);
	if (!productCart) {
		logger.warn("Product not found in cart", {
			info: { pid }
		});
		return null;
	}
	productCart.quantity = quantity;
	return await CartDAO.updateCartById(cid, { products: cart.products });
}

export async function deleteCartProduct(cid, pid) {
	const cart = await CartDAO.readCart(cid);
	if (!cart) return null;
	return await CartDAO.updateCartById(cid, {
		products: cart.products.filter((pr) => pr.product !== pid)
	});
}
