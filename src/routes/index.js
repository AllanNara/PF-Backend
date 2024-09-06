import { Router } from "express";
import apiRoutes from "./api/index.js";
import { parseParams } from "../middlewares/parseParams.js";
// import testRoutes from "./test/index.js";
import webRoutes from "./web/index.js";

const router = Router();

// router.use("/testing", testRoutes);
router.use("/", parseParams);
router.use("/api", apiRoutes);
router.use("/", webRoutes);

export default router;
