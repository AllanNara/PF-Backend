const products = [];
let currentId = 0;

export function readProducts() {
	return products;
}

export function readMultipleById(arrayIds) {
	return products.filter((pr) => arrayIds.includes(pr.id));
}

export function readById(pid) {
	return products.find((pr) => pr.id === pid);
}

export function readByCode(code) {
	return products.find((pr) => pr.code === code);
}

export function create(obj) {
	const newProduct = {
		...obj,
		id: ++currentId
	};
	products.push(newProduct);
	return newProduct;
}

export function updateById(pid, obj) {
	return products.some((pr) => pr.id === pid && Object.assign(pr, obj));
}

export function deleteById(pid) {
	const index = products.findIndex((p) => p.id === pid);
	return index !== -1 ? Boolean(products.splice(index, 1)) : false;
}
