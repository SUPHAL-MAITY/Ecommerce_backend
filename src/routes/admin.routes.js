import { Router } from "express";
import { adminAuthCheckController, adminDashBoardController } from "../controllers/admin.controller.js";




const router=Router()


router.route("/admin-details").get(adminDashBoardController )
router.route("/admin-auth").get(adminAuthCheckController)


export default router;