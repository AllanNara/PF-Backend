import {
	addProductToCartController,
	createCartController,
	deleteCartController,
	deleteCartProductController,
	getCartByIdController,
	updateCartEntireController,
	updateCartProductController
} from "../../controllers/carts.controllers.js";
import { Router } from "express";
import { parseParams } from "../../middlewares/parseParams.js";

const router = Router();

router.param("cid", parseParams);
router.param("pid", parseParams);
router.post("/", createCartController);
router.get("/:cid", getCartByIdController);
router.put("/:cid", updateCartEntireController);
router.delete("/:cid", deleteCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/product/:pid", updateCartProductController);
router.delete("/:cid/product/:pid", deleteCartProductController);

export default router;
