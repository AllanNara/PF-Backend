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
	try {
		const options = req.query;
		const currentUrl = req.originalUrl;
		const pagination = await generateProductPagination(options, currentUrl);
		res.json({ status: "success", ...pagination });
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
	try {
		const pid = req.params.pid;
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
	try {
		const pid = req.params.pid;
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
