import express from "express"
import { authMiddleWare } from "../middleware/auth.middleware.js"
import { roleMiddleWare } from "../middleware/role.middleware.js"
import { creatMedRecCntrlr, deleteMrec, editMedRec, getMedicalRec } from "../controller/medical.controller.js"





const router = express.Router()

router.use((req, res, next) => {
  console.log("MEDREC HIT");
  console.log(req.body);
  next();
});


router.use(authMiddleWare)

router.get("/", roleMiddleWare(["VET", "CLINIC"]), getMedicalRec);
router.post("/", roleMiddleWare(["VET", "CLINIC"]), creatMedRecCntrlr);
router.put("/:id", roleMiddleWare(["VET", "CLINIC"]), editMedRec);
router.delete("/:id", roleMiddleWare(["VET", "CLINIC"]), deleteMrec); 






export default router;






























