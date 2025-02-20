import { Router } from "express";
import { adminDashBoardController } from "../controllers/admin.controller.js";




const router=Router()


router.route("/admin-details").get(adminDashBoardController )


export default router;