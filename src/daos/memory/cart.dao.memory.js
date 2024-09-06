const carts = [];
let currentId = 0;

export function readCart(cid) {
	return carts.find((cart) => cart.id === cid);
}

export function create() {
	const newCart = {
		id: ++currentId,
		products: []
	};
	carts.push(newCart);
	return newCart;
}

export function updateCart(cid, obj) {
	return carts.some((cart) => cart.id === cid && Object.assign(cart, obj));
}

export function deleteCart(cid) {
	const index = carts.findIndex((c) => c.id === cid);
	return index !== -1 ? Boolean(carts.splice(index, 1)) : false;
}

export function updateItemCart(cid, pid, quantity) {
	const cart = carts.find((cart) => cart.id === cid);
	const product = cart.products.find((p) => p.id === pid);
	if (!cart || !product) return false;
	product.quantity = quantity;
	return true;
}

export function deleteItemCart(cid, pid) {
	const prevLength = carts.length;
	const cart = carts.find((cart) => cart.id === cid);
	cart.products = cart.products.filter((p) => p.id !== pid);
	return prevLength !== carts.length;
}
