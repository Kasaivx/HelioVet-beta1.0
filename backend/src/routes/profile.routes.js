import express from "express"
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { getProfile } from "../controller/profile.controller.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/me", authMiddleWare,getProfile);


export default router;
