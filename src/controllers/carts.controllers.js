import getService from "../services/index.js";

const {
	findCartDetails,
	addCart,
	modifiCart,
	emptyCart,
	addProductToCart,
	modifiProductQuantity,
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
		const result = await modifiCart(cid, products);
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
				message: `Cart with id '${cid}' not found`
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
		const result = await modifiProductQuantity(cid, pid, quantity);

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

export const deleteCartProductController = async (req, res, next) => {
	const { cid, pid } = req.params;

	try {
		const result = await removeProductFromCart(cid, pid);

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
