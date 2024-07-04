import { ProductManager } from "../dao/factory.js";

const checkProductExists = async (req, res, next) => {
	const pid = req.params.pid;
	const productFound = await ProductManager.getProductById(pid);

	if (!productFound) {
		return res
			.status(404)
			.json({ status: "error", message: "Product not found" });
	}

	next();
};

export default checkProductExists;
