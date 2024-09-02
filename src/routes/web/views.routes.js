import { Router } from "express";
import getDAO from "../../daos/factory.js";

const ProductDAO = getDAO("Product");
const router = Router();

router.get("/home", async (req, res) => {
	const products = await ProductDAO.getProducts(true);
	res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts");
});

export default router;
