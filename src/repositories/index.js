import * as CartRepository from "./carts.repository.js";
import * as ProductRepository from "./products.repository.js";
import * as TicketRepository from "./tickets.repository.js";
import * as UserRepository from "./users.repository.js";

const Repositories = {};
const getRepository = (entity) => Repositories[entity];

Repositories["Cart"] = CartRepository;
Repositories["User"] = UserRepository;
Repositories["Product"] = ProductRepository;
Repositories["Ticket"] = TicketRepository;

export default getRepository;
