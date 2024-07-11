import { ProductManager } from "../dao/factory.js";

export const checkProductExists = async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const productFound = await ProductManager.getProductById(pid);

		if (!productFound) {
			return res
				.status(404)
				.json({ status: "error", message: "Product not found" });
		}

		next();
	} catch (error) {
		next(error);
	}
};

export const checkMultiProducts = async (req, res, next) => {
	try {
		const products = req.body.products;
		const allProductIds = products.map((pr) => pr.product);

		for (const identifier of allProductIds) {
			const productFound = await ProductManager.getProductById(identifier);
			if (!productFound) {
				return res.status(404).json({
					status: "error",
					message: `Product with id ${identifier} not found`
				});
			}
		}
		next();
	} catch (error) {
		next(error);
	}
};
