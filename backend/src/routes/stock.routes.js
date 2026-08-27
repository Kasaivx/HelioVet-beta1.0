import express from "express";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { addProduct, deleteProduct, editProduct, getProduct } from "../controller/stock.controller.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/", roleMiddleWare(["VET", "CLINIC"]), getProduct);

router.post("/", roleMiddleWare(["VET", "CLINIC"]), addProduct);

router.put("/:id", roleMiddleWare(["VET", "CLINIC"]), editProduct);

router.delete("/:id", roleMiddleWare(["VET", "CLINIC"]), deleteProduct);

export default router;
