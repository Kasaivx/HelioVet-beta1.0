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

router.get("/", roleMiddleWare("VET"),getMedicalRec)
router.post("/",roleMiddleWare("VET"),creatMedRecCntrlr)
router.put("/:id",roleMiddleWare("VET"),editMedRec)
router.delete("/:id",roleMiddleWare("VET"),deleteMrec) 






export default router;






























