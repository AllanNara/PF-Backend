import { Router } from "express";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/carts", cartRouter);

router.use("*", (req, res) => {
	res.json({ error: "route not found" });
});

export default router;
