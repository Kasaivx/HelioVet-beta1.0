import express from "express";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { addProduct, deleteProduct, editProduct, getProduct } from "../controller/stock.controller.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/", roleMiddleWare("VET"),getProduct);

router.post("/", roleMiddleWare("VET"),addProduct );

router.put("/:id", roleMiddleWare("VET"),editProduct );

router.delete("/:id", roleMiddleWare("VET"),deleteProduct );

export default router;
