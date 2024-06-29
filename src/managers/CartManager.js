import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "carts.json";

const readCartFile = readFile(FILE_NAME);
const saveCart = writeFile(FILE_NAME);

export async function addCart() {
	const carts = await readCartFile();
	const newCart = {
		id: carts.length ? carts[carts.length - 1].id + 1 : 1,
		products: []
	};
	carts.push(newCart);
	await saveCart(carts);
	return newCart;
}

export async function getCartById(cid) {
	const carts = await readCartFile();
	const cartFound = carts.find((cart) => cart.id === parseInt(cid));

	if (!cartFound) {
		console.warn("Cart not found");
		return null;
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
		carts[cartIndex].products.push({ product: pid, quantity: 1 });
	} else {
		productExists.quantity++;
	}
	await saveCart(carts);
	return carts[cartIndex];
}
