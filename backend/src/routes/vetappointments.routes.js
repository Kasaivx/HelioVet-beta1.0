import express from "express"
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { roleMiddleWare } from "../middleware/role.middleware.js";
import { createAppoinments, deletappoinments, editAppointments, getappointments } from "../controller/appointments.controller.js";




const router = express.Router();

router.use(authMiddleWare);

router.get("/", roleMiddleWare(["VET", "CLINIC"]), getappointments);

router.post("/",roleMiddleWare(["VET",'CLINIC']),createAppoinments);

router.put("/:id", roleMiddleWare(["VET", "CLINIC"]), editAppointments);

router.delete("/:id", roleMiddleWare(["VET", "CLINIC"]), deletappoinments);

export default router;