import express from "express";
import { vetRegisterCtrlr, OwnerRegisterCtrlr, loginCtrlr } from "../controller/auth.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const router = express.Router()

router.post('/register/vet',vetRegisterCtrlr )


router.post("/register/owner", OwnerRegisterCtrlr);

router.post('/login',loginCtrlr)

router.get('/me', authMiddleWare,(req,res)=>
{res.json(req.user);
})
export default router;
