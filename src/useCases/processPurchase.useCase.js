import getRepository from "../repositories/index.js";
import getService from "../services/index.js";
import logger from "../../lib/winston.js";

const CartRepository = getRepository("Cart");
const ProductRepository = getRepository("Product");

const ProductService = getService("Product");
const TicketService = getService("Ticket");

export async function processPurchase(cid, userEmail) {
	const cart = await CartRepository.fetchCart(cid);
	if (!cart.products.length) {
		logger.warn("Cart '%s' is empty", cid);
		return null;
	}

	const itemsAvailable = [];
	const itemsNotAvailable = [];

	for (const item of cart.products) {
		const response = await ProductService.availableForPurchase(
			item.product,
			item.quantity
		);

		if (response === null) {
			logger.warn("Cart contains a non-existing product", {
				info: { pid: item.product }
			});
			continue;
		}

		if (response.isAvailable) {
			await ProductRepository.updateProduct(item.product, {
				stock: response.remainingStock
			});
			itemsAvailable.push(item);
		} else {
			itemsNotAvailable.push(item);
		}
	}

	if (itemsNotAvailable.length && !itemsAvailable.length) {
		logger.warn("Cart '%s' contains products that are not available", cid);
		return null;
	}
	await CartRepository.replaceCartProducts(cid, itemsNotAvailable);

	const purchaseTicket = await TicketService.generateTicket(
		userEmail,
		itemsAvailable
	);

	return {
		ticket: purchaseTicket,
		purchased_products: itemsAvailable,
		not_available: Boolean(itemsNotAvailable.length),
		products_not_available: itemsNotAvailable
	};
}
