import * as CartManagerFS from "./fs/CartManager.js";
import * as CartManagerMongo from "./mongo/CartManager.js";
import * as ProductManagerFS from "./fs/ProductManager.js";
import * as ProductManagerMongo from "./mongo/ProductManager.js";
import * as UserManagerMongo from "./mongo/UserManager.js";
import config from "../../config/index.js";

let CartManager, ProductManager, UserManager;

UserManager = UserManagerMongo;
if (config.DAO === "mongo") {
	CartManager = CartManagerMongo;
	ProductManager = ProductManagerMongo;
} else {
	CartManager = CartManagerFS;
	ProductManager = ProductManagerFS;
}

export { CartManager, ProductManager, UserManager };
