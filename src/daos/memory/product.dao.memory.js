const products = [];
let currentId = 0;

export function readProducts() {
	return products;
}

export function readMultipleById(arrayIds) {
	return products.filter((pr) => arrayIds.includes(pr.id));
}

export function readProduct(pid) {
	return products.find((pr) => pr.id === pid);
}

export function readProductByCode(code) {
	return products.find((pr) => pr.code === code);
}

export function createProduct(obj) {
	const newProduct = {
		...obj,
		id: ++currentId
	};
	products.push(newProduct);
	return newProduct;
}

export function updateProduct(pid, obj) {
	return products.some((pr) => pr.id === pid && Object.assign(pr, obj));
}

export function deleteProduct(pid) {
	const index = products.findIndex((p) => p.id === pid);
	return index !== -1 ? Boolean(products.splice(index, 1)) : false;
}
