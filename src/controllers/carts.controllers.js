import getService from "../services/index.js";
import { processPurchase } from "../useCases/processPurchase.useCase.js";

const {
	findCartDetails,
	addCart,
	modifyCart,
	emptyCart,
	addProductToCart,
	modifyProductQuantity,
	removeProductFromCart
} = getService("Cart");

export const createCartController = async (req, res, next) => {
	try {
		const newCart = await addCart();
		res.json({ status: "success", payload: newCart });
	} catch (error) {
		next(error);
	}
};

export const getCartByIdController = async (req, res, next) => {
	const cid = req.params.cid;

	try {
		const cart = await findCartDetails(cid);

		if (!cart) {
			return res.status(404).json({
				status: "error",
				message: `Cart with id '${cid}' not found`
			});
		}
		res.json({ status: "success", payload: cart });
	} catch (error) {
		next(error);
	}
};

export const updateCartEntireController = async (req, res, next) => {
	const cid = req.params.cid;
	const products = req.body.products;

	try {
		const result = await modifyCart(cid, products);
		if (!result) {
			return res.status(404).json({
				status: "error",
				message: `Cart with id '${cid}' not found`
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
};

export const deleteCartController = async (req, res, next) => {
	const cid = req.params.cid;

	try {
		const result = await emptyCart(cid);
		if (!result) {
			return res.status(404).json({
				status: "error",
				message: `Cart with id '${cid}' not found`
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
};

export const addProductToCartController = async (req, res, next) => {
	const { cid, pid } = req.params;

	try {
		const response = await addProductToCart(cid, pid);

		if (!response) {
			return res.status(404).json({
				status: "error",
				message: `Cart '${cid}' or product '${pid}' not found`
			});
		}
		res.json({ status: "success", payload: response });
	} catch (error) {
		next(error);
	}
};

export const updateCartProductController = async (req, res, next) => {
	const { cid, pid } = req.params;
	const quantity = req.body.quantity;

	try {
		const result = await modifyProductQuantity(cid, pid, quantity);

		if (!result) {
			return res.status(404).json({
				status: "error",
				message: `Cart ${cid} not found or product ${pid} not exists in cart`
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
};

export const deleteCartProductController = async (req, res, next) => {
	const { cid, pid } = req.params;

	try {
		const result = await removeProductFromCart(cid, pid);

		if (!result) {
			return res.status(404).json({
				status: "error",
				message: `Cart ${cid} not found or product ${pid} not exists in cart`
			});
		}
		res.json({ status: "success", payload: result });
	} catch (error) {
		next(error);
	}
};

export const purchaseCartController = async (req, res, next) => {
	const { cid } = req.params;
	const { email } = req.user;

	try {
		const result = await processPurchase(cid, email);
		if (!result) {
			return res.status(400).json({
				status: "error",
				message: "Cart is empty or contains products that are not available"
			});
		}

		res.json({ status: "success", ...result });
	} catch (error) {
		next(error);
	}
};
