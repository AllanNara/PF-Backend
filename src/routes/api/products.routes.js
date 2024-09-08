import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductByIdController,
	updateProductController
} from "../../controllers/products.controllers.js";
import { Router } from "express";
import { parseParams } from "../../middlewares/parseParams.js";

const router = Router();

router.param("pid", parseParams);
router.get("/", getAllProductsController);
router.post("/", [...createProductController]);
router.get("/:pid", getProductByIdController);
router.put("/:pid", updateProductController);
router.delete("/:pid", deleteProductController);

export default router;
