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

const router = Router();

router.post("/", createCartController);
router.get("/:cid", getCartByIdController);
router.put("/:cid", updateCartEntireController);
router.delete("/:cid", deleteCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/product/:pid", updateCartProductController);
router.delete("/:cid/product/:pid", deleteCartProductController);

export default router;
