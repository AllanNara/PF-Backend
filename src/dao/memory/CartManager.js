import { getProductById } from "./ProductManager.js";
import logger from "../../../lib/winston.js";

const carts = [];
let currentId = 0;

const searchCart = (cid) => {
	const cart = carts.find((cart) => cart.id === parseInt(cid));
	if (!cart) {
		logger.verbose("Cart '%s' not found", cid);
		return false;
	}
	return cart;
};

export function addCart() {
	const newCart = {
		id: ++currentId,
		products: []
	};
	carts.push(newCart);
	return newCart;
}

export function getCartById(cid) {
	const cart = searchCart(cid);
	if (!cart) return null;

	for (const object of cart.products) {
		const productFound = getProductById(object.product);
		if (productFound) object.product = productFound;
	}

	return cart;
}

export function addProductToCart(cid, pid) {
	const cart = searchCart(cid);
	if (!cart) return null;

	const productExists = cart.products.find(
		(pr) => pr.product === parseInt(pid)
	);

	if (!productExists) {
		cart.products.push({ product: parseInt(pid), quantity: 1 });
	} else {
		productExists.quantity++;
	}
	return cart;
}

export function updateEntireCart(cid, products) {
	const cart = searchCart(cid);
	if (!cart) return null;

	const newCartProducts = [...products];
	for (let i = 0; i < newCartProducts.length; i++) {
		const { product } = newCartProducts[i];
		newCartProducts[i].product = parseInt(product);
	}

	cart.products = newCartProducts;
	return cart;
}

export function emptyCart(cid) {
	const cart = searchCart(cid);
	if (!cart) return null;

	cart.products = [];
	return cart;
}

export function updateCartProduct(cid, pid, quantity) {
	const cart = searchCart(cid);
	if (!cart) return null;

	let success = false;
	cart.products.forEach((pr) => {
		if (pr.product === parseInt(pid)) {
			pr.quantity = quantity;
			success = true;
		}
	});

	if (!success) {
		cart.products.push({ product: parseInt(pid), quantity });
	}

	return cart;
}

export function deleteCartProduct(cid, pid) {
	const cart = searchCart(cid);
	if (!cart) return null;

	const indexProduct = cart.products.findIndex(
		(pr) => pr.product === parseInt(pid)
	);

	cart.products.splice(indexProduct, 1);
	return cart;
}
