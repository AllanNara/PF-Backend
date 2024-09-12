import { ticketModel } from "./models/ticket.model.js";

export async function createTicket(obj) {
	const newTicket = (await ticketModel.create(obj)).toObject();
	return newTicket;
}

export async function readTicket(tid) {
	return await ticketModel.findById(tid);
}
