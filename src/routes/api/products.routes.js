import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductByIdController,
	updateProductController
} from "../../controllers/products.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllProductsController);
router.post("/", [...createProductController]);
router.get("/:pid", getProductByIdController);
router.put("/:pid", updateProductController);
router.delete("/:pid", deleteProductController);

export default router;
