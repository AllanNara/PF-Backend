import { Router } from "express";
import authRouter from "./auth.routes.js";
import cartsRouter from "./carts.routes.js";
import productsRouter from "./products.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

router.use("*", (req, res) => {
	req.logger.warn("Route " + req.originalUrl + " not found");
	res.status(404).json({ error: "route not found" });
});

export default router;
