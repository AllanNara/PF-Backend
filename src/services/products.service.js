import Joi from "joi";
import { PaginationDTO } from "../dtos/pagination.dto.js";
import { ProductDatabaseDTO } from "../dtos/productDatabase.dto.js";
import config from "../../config/index.js";
import getRepository from "../repositories/index.js";
import logger from "../../lib/winston.js";

const ProductRepository = getRepository("Product");

export async function bringProducts() {
	return await ProductRepository.fetchProducts();
}

export async function generateProductPagination(queryParams, currentUrl) {
	queryParams.sort = queryParams.sort && { price: queryParams.sort };
	const pagination = {};

	const result = await ProductRepository.fetchProducts(true, queryParams);

	if (Object.prototype.hasOwnProperty.call(result, "payload")) {
		Object.assign(pagination, result);
	} else {
		let { page, limit, sort, query } = queryParams;
		page = page ? parseInt(page) : 1;
		limit = limit ? parseInt(limit) : 10;

		const offset = limit * (page - 1);
		const processedData = filterAndSortProducts(result, { sort, query }).slice(
			offset,
			offset + limit
		);

		pagination.payload = processedData;
		pagination.page = page;
		pagination.totalPages = result.length
			? Math.ceil(result.length / limit)
			: 1;
		pagination.hasPrevPage = page > 1;
		pagination.hasNextPage = page < pagination.totalPages;
		pagination.prevPage = pagination.hasPrevPage ? page - 1 : null;
		pagination.nextPage = pagination.hasNextPage ? page + 1 : null;
	}
	const buildLink = (page) => {
		if (page === null) return page;
		const url = new URL(`${config.ORIGIN}${currentUrl}`);
		url.searchParams.set("page", page);
		return url.href;
	};

	pagination.prevLink = buildLink(pagination.prevPage);
	pagination.nextLink = buildLink(pagination.nextPage);
	pagination.payload = pagination.payload.map((product) =>
		ProductDatabaseDTO.generate(product)
	);
	return PaginationDTO.generate(pagination);
}

export async function addProduct(obj) {
	const codeExists = await ProductRepository.findProductByCode(obj.code);

	if (codeExists) {
		logger.verbose("Code '%s' already in use", obj.code);
		return null;
	}

	const newProduct = await ProductRepository.createProduct(obj);
	return ProductDatabaseDTO.generate(newProduct);
}

export async function findProduct(pid) {
	const productFound = await ProductRepository.getProduct(pid);
	if (!productFound) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	return ProductDatabaseDTO.generate(productFound);
}

export async function modifyProduct(pid, product) {
	const schemadProduct = Joi.object({
		title: Joi.string().min(2),
		description: Joi.string(),
		price: Joi.number().greater(0),
		stock: Joi.number().integer().positive().allow(0),
		category: Joi.string().min(1),
		status: Joi.boolean(),
		thumbnails: Joi.array().items(Joi.string())
	}).unknown(true);

	const { error, value } = schemadProduct.validate(product, {
		stripUnknown: true
	});

	if (error) throw new Error("Error to modify product: %s", error.message);

	const updated = await ProductRepository.updateProduct(pid, value);
	if (!updated) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	return updated;
}

export async function removeProduct(pid) {
	const removed = await ProductRepository.deleteProduct(pid);
	if (!removed) {
		logger.verbose("Product '%s' not found", pid);
		return null;
	}
	return removed;
}

export async function checkCodeAvailable(code) {
	return !(await ProductRepository.findProductByCode(code));
}

function filterAndSortProducts(products, { sort, query }) {
	let filtered = products;

	if (query) {
		const { status, category } = JSON.parse(query);
		filtered = filtered.filter(
			(doc) =>
				(typeof status !== "boolean" || doc.status === status) &&
				(!category || doc.category === category)
		);
	}

	if (sort) {
		filtered.sort((a, b) =>
			sort.price === "asc"
				? a.price - b.price
				: sort.price === "desc"
					? b.price - a.price
					: 0
		);
	}

	return filtered;
}
