import express from "express";
import { OwnerRegisterCtrlr, loginCtrlr, clinicRegisterCtrlr } from "../controller/auth.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const router = express.Router()

router.post('/register/clinic',clinicRegisterCtrlr )


router.post("/register/owner", OwnerRegisterCtrlr);

router.post('/login',loginCtrlr)

router.get('/me', authMiddleWare,(req,res)=>
{res.json(req.user);
})
export default router;
