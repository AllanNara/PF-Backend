import getDAO from "../daos/factory.js";
import { nanoid } from "nanoid";

const TicketDAO = getDAO("Ticket");

export async function addTicket(newTicket) {
	return await TicketDAO.createTicket({
		...newTicket,
		code: nanoid(),
		purchase_datetime: new Date()
	});
}

export async function getTicketById(id) {
	return await TicketDAO.readTicket(id);
}
