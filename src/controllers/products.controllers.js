import config from "../../config/index.js";
import getDAO from "../daos/factory.js";
import { productUpload } from "../middlewares/multer.js";
import validateProductFields from "../middlewares/validateProductFields.js";

const {
	addProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} = getDAO("Product");

export const getAllProductsController = async (req, res, next) => {
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

export const createProductController = [
	productUpload.array("thumbnails"),
	validateProductFields,
	async (req, res, next) => {
		try {
			const response = await addProduct(req.product);

			if (!response) {
				return res
					.status(409)
					.json({ status: "error", message: "Code already exists" });
			}
			res.json({ status: "success", payload: response });
		} catch (error) {
			next(error);
		}
	}
];

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
