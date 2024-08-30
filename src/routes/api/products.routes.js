import {
	createProduct,
	deleteProductController,
	getAllProducts,
	getProductByIdController,
	updateProductController
} from "../../controllers/products.controllers.js";
import { Router } from "express";
import { productUpload } from "../../middlewares/multer.js";
import validateProductFields from "../../middlewares/validateProductFields.js";

const router = Router();

router.get("/", getAllProducts);
router.post(
	"/",
	productUpload.array("thumbnails"),
	validateProductFields,
	createProduct
);
router.get("/:pid", getProductByIdController);
router.put("/:pid", updateProductController);
router.delete("/:pid", deleteProductController);

export default router;
