import { Router } from "express";
import apiRoutes from "./api/index.js";
import webRoutes from "./web/index.js";

const router = Router();

router.use("/api", apiRoutes);
router.use("/", webRoutes);

export default router;
