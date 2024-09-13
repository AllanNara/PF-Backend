import { CartDTO } from "../dtos/cart.dto.js";
import { ProductDatabaseDTO } from "../dtos/productDatabase.dto.js";
import getRepository from "../repositories/index.js";
import logger from "../../lib/winston.js";

const CartRepository = getRepository("Cart");
const ProductRepository = getRepository("Product");

export async function findCartDetails(cid) {
	const cart = await CartRepository.fetchCart(cid, { populate: true });

	if (!cart) {
		logger.verbose("Cart '%s' not found", cid);
		return null;
	}
	if (cart.products.length) {
		cart.products = cart.products.map((item) => {
			return {
				quantity: item.quantity,
				product: ProductDatabaseDTO.generate(item.product)
			};
		});
	}
	return CartDTO.generate(cart);
}

export async function addCart() {
	return CartDTO.generate(await CartRepository.createCart());
}

export async function modifyCart(cid, list) {
	const searchProducts = await ProductRepository.getProductsById(
		list.map((item) => item.product)
	);
	const productSet = new Set(searchProducts.map((pr) => pr.id.toString()));

	const products = list.filter((item) => {
		if (productSet.has(item.product)) {
			productSet.delete(item.product);
			return item;
		}
		logger.warn("The cart to add contains a non-existing product", {
			info: { pid: item.product }
		});
	});
	const updated = await CartRepository.replaceCartProducts(cid, products);
	if (!updated) {
		logger.verbose("Cart '%s' not found", cid);
		return null;
	}
	return updated;
}

export async function emptyCart(cid) {
	const deleted = await CartRepository.replaceCartProducts(cid, []);
	if (!deleted) logger.verbose("Cart '%s' not found", cid);
	return deleted;
}

export async function addProductToCart(cid, pid) {
	const productExists = await ProductRepository.getProduct(pid);
	if (!productExists) {
		logger.verbose("Product to add to the cart '%s' does not exist", pid);
		return null;
	}
	const updated = await CartRepository.addProductToCart(cid, pid);
	if (!updated) logger.verbose("Cart '%s' not found", cid);
	return updated;
}

export async function modifyProductQuantity(cid, pid, q) {
	const updated = await CartRepository.updateProductQuantity(cid, pid, q);
	if (!updated) {
		logger.verbose(
			"Cart '%s' not found or product '%s' not exists in cart",
			cid,
			pid
		);
	}
	return updated;
}

export async function removeProductFromCart(cid, pid) {
	const removed = await CartRepository.deleteCartProduct(cid, pid);
	if (!removed)
		logger.verbose(
			"Cart '%s' not found or product '%s' not exists in cart",
			cid,
			pid
		);
	return removed;
}
