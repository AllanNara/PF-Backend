import * as CartRepository from "./carts.repository.js";
import * as ProductRepository from "./products.repository.js";
import * as UserRepository from "./users.repository.js";

const Repositories = {};
const getRepository = (entity) => Repositories[entity];

Repositories["Cart"] = CartRepository;
Repositories["User"] = UserRepository;
Repositories["Product"] = ProductRepository;

export default getRepository;

// ProductRepository
// .fetchProducts(queryParams);
// .createProduct(obj);
// .getProduct(pid);
// .getProductsById(ids);
// .updateProduct(pid, value);
// .deleteProduct(pid);
// .findProductByCode(obj.code);
