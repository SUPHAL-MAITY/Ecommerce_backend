import { Router } from "express";
import { adminDashBoardController, authCheckController } from "../controllers/admin.controller.js";




const router=Router()


router.route("/admin-details").get(adminDashBoardController )
router.route("/auth").get(authCheckController)


export default router;