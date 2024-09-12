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
import { authorization } from "../../middlewares/passport.js";
import { parseParams } from "../../middlewares/parseParams.js";

const router = Router();

router.param("cid", parseParams);
router.param("pid", parseParams);

router.post("/", createCartController);
router.get("/:cid", authorization(["USER", "OWN"]), getCartByIdController);
router.put("/:cid", authorization(["USER", "OWN"]), updateCartEntireController);
router.delete("/:cid", authorization(["USER", "OWN"]), deleteCartController);

router.post(
	"/:cid/product/:pid",
	authorization(["USER", "OWN"]),
	addProductToCartController
);
router.put(
	"/:cid/product/:pid",
	authorization(["USER", "OWN"]),
	updateCartProductController
);
router.delete(
	"/:cid/product/:pid",
	authorization(["USER", "OWN"]),
	deleteCartProductController
);

export default router;
