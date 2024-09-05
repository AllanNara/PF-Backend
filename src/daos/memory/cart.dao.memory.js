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

export function updateCartById(cid, obj) {
	return carts.some((cart) => cart.id === cid && Object.assign(cart, obj));
}

export function deleteCartById(cid) {
	const index = carts.findIndex((c) => c.id === parseInt(cid));
	return index !== -1 ? Boolean(carts.splice(index, 1)) : false;
}
