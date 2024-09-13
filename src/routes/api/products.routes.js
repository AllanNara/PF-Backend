import { authorization, passportCall } from "../../middlewares/passport.js";
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
router.use(passportCall("jwt", { session: false }));

router.get("/", getAllProductsController);
router.post("/", authorization("ADMIN"), [...createProductController]);
router.get("/:pid", getProductByIdController);
router.put("/:pid", authorization("ADMIN"), updateProductController);
router.delete("/:pid", authorization("ADMIN"), deleteProductController);

export default router;
