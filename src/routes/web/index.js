import { Router } from "express";
import viewsRouter from "./views.routes.js";

const router = Router();

router.use("/", viewsRouter);

export default router;
