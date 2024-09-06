import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "carts.json";

const readCartFile = readFile(FILE_NAME);
const saveCarts = writeFile(FILE_NAME);

export async function readCart(cid) {
	const carts = await readCartFile();
	return carts.find((cart) => cart.id === cid);
}

export async function createCart() {
	const carts = await readCartFile();
	const newCart = {
		id: carts.length ? carts[carts.length - 1].id + 1 : 1,
		products: []
	};
	carts.push(newCart);
	await saveCarts(carts);
	return newCart;
}

export async function updateCart(cid, obj) {
	const carts = await readCartFile();
	const result = carts.some(
		(cart) => cart.id === cid && Object.assign(cart, obj)
	);
	result && (await saveCarts(carts));
	return result;
}

export async function deleteCart(cid) {
	const carts = await readCartFile();
	const index = carts.findIndex((c) => c.id === cid);
	const result = index !== -1 ? Boolean(carts.splice(index, 1)) : false;
	index !== -1 && (await saveCarts(carts));
	return result;
}

export async function updateItemCart(cid, pid, quantity) {
	const carts = await readCartFile();
	const cart = carts.find((cart) => cart.id === cid);
	const product = cart.products.find((p) => p.id === pid);
	if (!cart || !product) return false;
	product.quantity = quantity;
	await saveCarts(carts);
	return true;
}

export async function deleteItemCart(cid, pid) {
	const carts = await readCartFile();
	const cart = carts.find((cart) => cart.id === cid);
	const index = cart.products.findIndex((p) => p.id === pid);
	if (index === -1) return false;
	cart.products.splice(index, 1);
	await saveCarts(carts);
	return true;
}
