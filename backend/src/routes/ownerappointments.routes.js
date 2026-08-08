import express from "express"
import { authMiddleWare } from "../middleware/auth.middleware";
import { roleMiddleWare } from "../middleware/role.middleware";




const router = express.router();

router.use(authMiddleWare);

router.get("/",roleMiddleWare("OWNER"));

router.post("/",roleMiddleWare("OWNER"));

router.put("/",roleMiddleWare("OWNER"));

router.delete("/",roleMiddleWare("OWNER"));

export default router;