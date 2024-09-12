const tickets = [];
let currentId = 0;

export function createTicket(ticketData) {
	const ticket = {
		...ticketData,
		id: ++currentId
	};

	tickets.push(ticket);
	return ticket;
}

export function readTicket(uid) {
	return tickets.find((user) => user.id === uid);
}
