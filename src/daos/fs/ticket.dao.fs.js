import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "tickets.json";

const readTicketsFile = readFile(FILE_NAME);
const saveTickets = writeFile(FILE_NAME);

export async function createTicket(ticketData) {
	const tickets = await readTicketsFile();
	const ticket = {
		...ticketData,
		id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1
	};

	tickets.push(ticket);
	await saveTickets(tickets);
	return ticket;
}

export async function readTicket(uid) {
	const tickets = await readTicketsFile();
	return tickets.find((user) => user.id === uid);
}
