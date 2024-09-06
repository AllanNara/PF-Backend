import { Router } from "express";
import getService from "../../services/index.js";

const ProductService = getService("Product");
const router = Router();

router.get("/home", async (req, res) => {
	const products = await ProductService.generateProductPaginat(true);
	res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts");
});

export default router;
