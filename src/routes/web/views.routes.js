import { Router } from "express";
import getManager from "../../dao/factory.js";

const ProductManager = getManager("Product");
const router = Router();

router.get("/home", async (req, res) => {
	const products = await ProductManager.getProducts(true);
	res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts");
});

export default router;
