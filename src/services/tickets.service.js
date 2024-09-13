import { TicketDTO } from "../dtos/ticket.dto.js";
import getRepository from "../repositories/index.js";

const TicketRepository = getRepository("Ticket");
const ProductRepository = getRepository("Product");

export async function generateTicket(userEmail, products) {
	let amount = 0;
	for (const item in products) {
		const productPrice = await ProductRepository.getProduct(item.id);
		amount += productPrice.price * item.quantity;
	}

	const ticket = await TicketRepository.addTicket({
		purchaser: userEmail,
		amount
	});

	return TicketDTO.generate(ticket);
}
