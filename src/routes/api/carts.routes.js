import { CartManager } from "../../dao/factory.js";
import { Router } from "express";
import checkProductExists from "../../middlewares/checkProductExists.js";

const router = Router();
const {
	addCart,
	getCartById,
	addProductToCart,
	emptyCart,
	updateEntireCart,
	deleteCartProduct,
	updateCartProduct
} = CartManager;

router.post("/", async (req, res, next) => {
	try {
		const newCart = await addCart();
		res.json({ status: "success", payload: newCart });
	} catch (error) {
		next(error);
	}
});

router.get("/:cid", async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const cart = await getCartById(cid);

		if (!cart) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: cart });
	} catch (error) {
		next(error);
	}
});

router.put("/:cid", async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const products = req.body.products;
		const result = await updateEntireCart(cid, products);
		if (!result) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
});

router.delete("/:cid", async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const result = await emptyCart(cid);
		if (!result) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
});

router.use("/:cid/product/:pid", checkProductExists);

router.post("/:cid/product/:pid", async (req, res, next) => {
	try {
		const { cid, pid } = req.params;
		const response = await addProductToCart(cid, pid);

		if (!response) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: response });
	} catch (error) {
		next(error);
	}
});

router.put("/:cid/product/:pid", async (req, res, next) => {
	try {
		const { cid, pid } = req.params;
		const quantity = req.body.quantity;
		const result = await updateCartProduct(cid, pid, quantity);

		if (!result) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
});

router.delete("/:cid/product/:pid", async (req, res, next) => {
	try {
		const { cid, pid } = req.params;
		const result = await deleteCartProduct(cid, pid);

		if (!result) {
			return res.status(404).json({
				status: "error",
				message: "Cart with id " + cid + " not found"
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
});

export default router;
