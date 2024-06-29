import {
	addProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} from "../managers/ProductManager.js";
import { Router } from "express";
import validateProductFields from "../middlewares/validateProductFields.js";

const router = Router();

router.get("/", async (req, res) => {
	const { limit } = req.query;
	let products = await getProducts();
	if (limit) products = products.slice(0, parseInt(limit));
	res.json({ limit: limit || null, products });
});

router.post("/", validateProductFields, async (req, res) => {
	const newProduct = {
		title: req.body.title,
		description: req.body.description,
		code: req.body.code,
		price: req.body.price,
		stock: req.body.stock,
		category: req.body.category,
		status: req.body.status,
		thumbnails: req.body.thumbnails
	};
	const response = await addProduct(newProduct);

	if (!response) {
		return res
			.status(400)
			.json({ status: "error", message: "Code alredy exists" });
	}
	res.json({ status: "success", payload: response });
});

router.get("/:pid", async (req, res) => {
	const { pid } = req.params;
	const product = await getProductById(pid);

	if (!product) {
		return res.status(404).json({
			status: "error",
			message: "Product with id " + pid + " not found"
		});
	}
	res.json({ status: "success", payload: product });
});

router.put("/:pid", async (req, res) => {
	const pid = req.params.pid;
	const updated = await updateProduct(pid, req.body);

	if (!updated) {
		return res.status(404).json({
			status: "error",
			message: "Product with id " + pid + " not found"
		});
	}
	res.json({ status: "success", payload: updated });
});

router.delete("/:pid", async (req, res) => {
	const pid = req.params.pid;
	const deleted = await deleteProduct(pid);

	if (!deleted) {
		return res.status(404).json({
			status: "error",
			message: "Product with id " + pid + " not found"
		});
	}
	res.json({ status: "success", payload: deleted });
});

export default router;
