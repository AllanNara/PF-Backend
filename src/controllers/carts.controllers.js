import getManager from "../dao/factory.js";

const {
	addCart,
	getCartById,
	addProductToCart,
	emptyCart,
	updateEntireCart,
	deleteCartProduct,
	updateCartProduct
} = getManager("Cart");

export const createCartController = async (req, res, next) => {
	try {
		const newCart = await addCart();
		res.json({ status: "success", payload: newCart });
	} catch (error) {
		next(error);
	}
};

export const getCartByIdController = async (req, res, next) => {
	try {
		const cid = req.params.cid;
		const cart = await getCartById(cid);

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
	try {
		const cid = req.params.cid;
		const products = req.body.products;
		const result = await updateEntireCart(cid, products);
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
	try {
		const cid = req.params.cid;
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
	try {
		const { cid, pid } = req.params;
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
	try {
		const { cid, pid } = req.params;
		const quantity = req.body.quantity;
		const result = await updateCartProduct(cid, pid, quantity);

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
	try {
		const { cid, pid } = req.params;
		const result = await deleteCartProduct(cid, pid);

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
