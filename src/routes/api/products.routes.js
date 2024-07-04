import { ProductManager } from "../../dao/factory.js";
import { Router } from "express";
import { productUpload } from "../../utils/multer.js";
import validateProductFields from "../../middlewares/validateProductFields.js";

const router = Router();
const {
	addProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} = ProductManager;

router.get("/", async (req, res, next) => {
	try {
		const { limit } = req.query;
		let products = await getProducts();
		if (limit) products = products.slice(0, parseInt(limit));
		res.json({ limit: limit || null, products });
	} catch (error) {
		next(error);
	}
});

router.post(
	"/",
	productUpload.array("thumbnails"),
	validateProductFields,
	async (req, res, next) => {
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
					.status(400)
					.json({ status: "error", message: "Code alredy exists" });
			}
			res.json({ status: "success", payload: response });
		} catch (error) {
			next(error);
		}
	}
);

router.get("/:pid", async (req, res, next) => {
	try {
		const { pid } = req.params;
		const product = await getProductById(pid);
		if (!product) {
			return res.status(404).json({
				status: "error",
				message: "Product with id " + pid + " not found"
			});
		}
		res.json({ status: "success", payload: product });
	} catch (error) {
		next(error);
	}
});

router.put("/:pid", async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const updated = await updateProduct(pid, req.body);

		if (!updated) {
			return res.status(404).json({
				status: "error",
				message: "Product with id " + pid + " not found"
			});
		}
		res.json({ status: "success", payload: updated });
	} catch (error) {
		next(error);
	}
});

router.delete("/:pid", async (req, res, next) => {
	try {
		const pid = req.params.pid;
		const deleted = await deleteProduct(pid);

		if (!deleted) {
			return res.status(404).json({
				status: "error",
				message: "Product with id " + pid + " not found"
			});
		}
		res.json({ status: "success", payload: deleted });
	} catch (error) {
		next(error);
	}
});

export default router;
