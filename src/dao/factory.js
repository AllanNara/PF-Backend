import * as CartManagerFS from "./fs/CartManager.js";
import * as CartManagerMongo from "./mongo/CartManager.js";
import * as ProductManagerFS from "./fs/ProductManager.js";
import * as ProductManagerMongo from "./mongo/ProductManager.js";
import { connectMongoDB } from "../utils/mongoose.js";

let CartManager = CartManagerFS;
let ProductManager = ProductManagerFS;
if (process.env.NODE_ENV === "production") {
	connectMongoDB();
	CartManager = CartManagerMongo;
	ProductManager = ProductManagerMongo;
}

export { CartManager, ProductManager };