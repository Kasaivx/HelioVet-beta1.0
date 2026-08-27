import express from "express"
import {getPatients,deletePatients, editPaitent,creatPatient, vetCreatPatient,} from "../controller/patients.controller.js";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleWare);




router.get("/", roleMiddleWare(["VET", "CLINIC"]), getPatients);

router.post("/vet", roleMiddleWare(["VET", "CLINIC"]), vetCreatPatient);

router.put("/:cui", roleMiddleWare(["VET", "CLINIC"]), editPaitent);

router.delete("/:cui", roleMiddleWare(["VET",'CLINIC']), deletePatients);

router.post("/", roleMiddleWare(["OWNER"]), creatPatient);


export default router;
