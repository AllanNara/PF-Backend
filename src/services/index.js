import * as CartService from "./carts.service.js";
import * as ProductService from "./products.service.js";
import * as UserService from "./users.service.js";

const Services = {};
const getService = (service) => Services[service];

Services["Cart"] = CartService;
Services["User"] = UserService;
Services["Product"] = ProductService;

export default getService;
