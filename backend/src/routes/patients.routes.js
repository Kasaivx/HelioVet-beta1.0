import express from "express"
import {getPatients,deletePatients, creatPatient, vetCreatPatient, patientProfile, editPaitent} from "../controller/patients.controller.js";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleWare);




router.get("/", roleMiddleWare(["VET", "CLINIC"]), getPatients);

router.get('/:cuid', roleMiddleWare(["VET", "CLINIC"]),patientProfile)

router.post("/vet", roleMiddleWare(["VET", "CLINIC"]) ,vetCreatPatient);


router.patch("/:cuid", roleMiddleWare(["VET", "CLINIC"]), editPaitent);

router.delete("/:cuid", roleMiddleWare(["VET",'CLINIC']), deletePatients);

router.post("/", roleMiddleWare(["OWNER"]), creatPatient);


export default router;
