import { Router } from "express";
import cartsRouter from "./carts.routes.js";
import productsRouter from "./products.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

router.use("*", (req, res) => {
	res.json({ error: "route not found" });
});

export default router;
