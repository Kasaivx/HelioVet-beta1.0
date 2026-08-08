import express from "express"
import {getPatients,deletePatients, editPaitent,creatPatient,} from "../controller/patients.controller.js";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleWare);

router.get("/", roleMiddleWare("VET"), getPatients);

router.post("/", roleMiddleWare("VET"), creatPatient);

router.put("/:id", roleMiddleWare("VET"), editPaitent);

router.delete("/:id", roleMiddleWare("VET"), deletePatients);

export default router;
