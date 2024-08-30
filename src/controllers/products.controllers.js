import { ProductManager } from "../dao/factory.js";
import config from "../../config/index.js";

const {
	addProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} = ProductManager;

export const getAllProducts = async (req, res, next) => {
	try {
		const { query: options } = req;
		options.page = options.page ? parseInt(options.page) : 1;
		options.limit = options.limit ? parseInt(options.limit) : 10;

		let response = await getProducts(options);

		const buildLink = (page) => {
			const url = new URL(`${config.ORIGIN}${req.originalUrl}`);
			url.searchParams.set("page", page);
			return url.href;
		};

		response.prevLink = response.hasPrevPage
			? buildLink(response.prevPage)
			: null;
		response.nextLink = response.hasNextPage
			? buildLink(response.nextPage)
			: null;

		res.json({ status: "success", ...response });
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const newProduct = {
			title: req.body.title,
			description: req.body.description,
			code: req.body.code,
			price: req.body.price,
			stock: req.body.stock,
			category: req.body.category,
			status: req.body.status,
			thumbnails: req.files
				? req.files.map((file) => `/uploads/products/${file.filename}`)
				: []
		};

		const response = await addProduct(newProduct);

		if (!response) {
			return res
				.status(409)
				.json({ status: "error", message: "Code already exists" });
		}
		res.json({ status: "success", payload: response });
	} catch (error) {
		next(error);
	}
};

export const getProductByIdController = async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const product = await getProductById(pid);
		if (!product) {
			return res.status(404).json({
				status: "error",
				message: `Product with id '${pid}' not found`
			});
		}
		res.json({ status: "success", payload: product });
	} catch (error) {
		next(error);
	}
};

export const updateProductController = async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const updated = await updateProduct(pid, req.body);

		if (!updated) {
			return res.status(404).json({
				status: "error",
				message: `Product with id '${pid}' not found`
			});
		}
		res.json({ status: "success", payload: updated });
	} catch (error) {
		next(error);
	}
};

export const deleteProductController = async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const deleted = await deleteProduct(pid);

		if (!deleted) {
			return res.status(404).json({
				status: "error",
				message: `Product with id '${pid}' not found`
			});
		}
		res.json({ status: "success", payload: deleted });
	} catch (error) {
		next(error);
	}
};
