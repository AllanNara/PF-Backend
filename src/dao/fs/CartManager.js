import { readFile, writeFile } from "./ManagerFileSystem.js";
import { getProductById } from "./ProductManager.js";

const FILE_NAME = "carts.json";

const readCartFile = readFile(FILE_NAME);
const saveCarts = writeFile(FILE_NAME);

export async function addCart() {
	const carts = await readCartFile();
	const newCart = {
		id: carts.length ? carts[carts.length - 1].id + 1 : 1,
		products: []
	};
	carts.push(newCart);
	await saveCarts(carts);
	return newCart;
}

export async function getCartById(cid) {
	const carts = await readCartFile();
	const cartFound = carts.find((cart) => cart.id === parseInt(cid));

	if (!cartFound) {
		console.warn("Cart not found");
		return null;
	}

	for (const object of cartFound.products) {
		const productFound = await getProductById(object.product);
		if (productFound) object.product = productFound;
	}

	return cartFound;
}

export async function addProductToCart(cid, pid) {
	const carts = await readCartFile();
	const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid));

	if (cartIndex < 0) {
		console.warn("Cart not found");
		return null;
	}

	const productExists = carts[cartIndex].products.find(
		(pr) => pr.product === pid
	);

	if (!productExists) {
		carts[cartIndex].products.push({ product: parseInt(pid), quantity: 1 });
	} else {
		productExists.quantity++;
	}
	await saveCarts(carts);
	return carts[cartIndex];
}

export async function updateEntireCart(cid, products) {
	const carts = await readCartFile();
	const cart = carts.find((cart) => cart.id === parseInt(cid));

	if (!cart) {
		console.warn("Cart not found");
		return null;
	}

	cart.products = [...products];
	await saveCarts(carts);
	return cart;
}

export async function emptyCart(cid) {
	const carts = await readCartFile();
	const cart = carts.find((cart) => cart.id === parseInt(cid));

	if (!cart) {
		console.warn("Cart not found");
		return null;
	}

	cart.products = [];
	await saveCarts(carts);
	return cart;
}

export async function updateCartProduct(cid, pid, quantity) {
	const carts = await readCartFile();
	const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid));

	if (cartIndex === -1) {
		console.warn("Cart not found");
		return null;
	}

	carts[cartIndex].products.forEach((pr) => {
		if (pr.product === parseInt(pid)) pr.quantity = quantity;
	});

	await saveCarts(carts);
	return carts[cartIndex];
}

export async function deleteCartProduct(cid, pid) {
	const carts = await readCartFile();
	const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid));

	if (cartIndex === -1) {
		console.warn("Cart not found");
		return null;
	}

	const indexProduct = carts[cartIndex].products.findIndex(
		(pr) => pr.product === pid
	);

	carts[cartIndex].products.splice(indexProduct, 1);
	await saveCarts(carts);
	return carts[cartIndex];
}
