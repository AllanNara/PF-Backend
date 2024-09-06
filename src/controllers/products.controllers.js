import getService from "../services/index.js";
import { productUpload } from "../middlewares/multer.js";
import validateProductFields from "../middlewares/validateProductFields.js";

const {
	generateProductPagination,
	addProduct,
	findProduct,
	modifyProduct,
	removeProduct
} = getService("Product");

export const getAllProductsController = async (req, res, next) => {
	const options = req.query;
	const currentUrl = req.originalUrl;

	try {
		const pagination = await generateProductPagination(options, currentUrl);
		res.json({ status: "success", ...pagination });
	} catch (error) {
		next(error);
	}
};

export const createProductController = [
	validateProductFields,
	productUpload.array("thumbnails"),
	async (req, res, next) => {
		const { product } = req;
		product.thumbnails = req.files
			? req.files.map((file) => `/uploads/products/${file.filename}`)
			: [];

		try {
			const response = await addProduct(product);
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
	const pid = req.params.pid;

	try {
		const product = await findProduct(pid);
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
	const pid = req.params.pid;

	try {
		const updated = await modifyProduct(pid, req.body);

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
	const pid = req.params.pid;

	try {
		const deleted = await removeProduct(pid);

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
