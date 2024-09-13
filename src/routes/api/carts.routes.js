import {
	addProductToCartController,
	createCartController,
	deleteCartController,
	deleteCartProductController,
	getCartByIdController,
	purchaseCartController,
	updateCartEntireController,
	updateCartProductController
} from "../../controllers/carts.controllers.js";
import { authorization, passportCall } from "../../middlewares/passport.js";
import { Router } from "express";
import { parseParams } from "../../middlewares/parseParams.js";

const router = Router();

router.param("cid", parseParams);
router.param("pid", parseParams);
router.use(passportCall("jwt", { session: false }));

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

router.post(
	"/:cid/purchase",
	authorization(["USER", "OWN"]),
	purchaseCartController
);

export default router;
