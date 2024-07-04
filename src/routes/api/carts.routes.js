import { CartManager } from "../../dao/factory.js";
import { Router } from "express";
import checkProductExists from "../../middlewares/checkProductExists.js";

const router = Router();
const { addCart, getCartById, addProductToCart } = CartManager;

router.post("/", async (req, res) => {
	const newCart = await addCart();
	res.json({ status: "success", payload: newCart });
});

router.get("/:cid", async (req, res) => {
	const cid = req.params.cid;
	const cart = await getCartById(cid);

	if (!cart) {
		return res.status(404).json({
			status: "error",
			message: "Cart with id " + cid + " not found"
		});
	}
	res.json({ status: "success", payload: cart });
});

router.post("/:cid/product/:pid", checkProductExists, async (req, res) => {
	const { cid, pid } = req.params;
	const result = await addProductToCart(cid, pid);

	if (!result) {
		return res
			.status(404)
			.json({ status: "error", message: "Cart with id " + cid + " not found" });
	}
	res.json({ status: "success", payload: result });
});

export default router;
