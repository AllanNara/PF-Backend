import { fakerAR as faker } from "@faker-js/faker";

export const fakeProduct = () => {
	const stock = faker.number.int({ min: 0, max: 100 });
	return {
		id: faker.database.mongodbObjectId(),
		title: faker.commerce.product(),
		description: faker.commerce.productDescription(),
		category: faker.commerce.department(),
		code: faker.string.nanoid(),
		price: faker.commerce.price(),
		stock,
		status: stock === 0 ? false : true,
		thumbnails: []
	};
};

export const generateFakeProducts = (iterations) => {
	let products = [];
	for (let i = 0; i < iterations; i++) {
		products.push(fakeProduct());
	}
	return products;
};
