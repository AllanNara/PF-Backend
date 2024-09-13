import * as CartService from "./carts.service.js";
import * as ProductService from "./products.service.js";
import * as TicketService from "./tickets.service.js";
import * as UserService from "./users.service.js";

const Services = {};
const getService = (service) => Services[service];

Services["User"] = UserService;
Services["Product"] = ProductService;
Services["Ticket"] = TicketService;
Services["Cart"] = CartService;

export default getService;
