import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductByIdController,
	updateProductController
} from "../../controllers/products.controllers.js";
import { Router } from "express";
import { authorization } from "../../middlewares/passport.js";
import { parseParams } from "../../middlewares/parseParams.js";

const router = Router();

router.param("pid", parseParams);

router.get("/", getAllProductsController);
router.post("/", authorization("ADMIN"), [...createProductController]);
router.get("/:pid", getProductByIdController);
router.put("/:pid", authorization("ADMIN"), updateProductController);
router.delete("/:pid", authorization("ADMIN"), deleteProductController);

export default router;
