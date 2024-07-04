import { Router } from "express";
import { getProducts } from "../../dao/fs/ProductManager.js";

const router = Router();

router.get("/home", async (req, res) => {
	const products = await getProducts();
	res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts");
});

export default router;
