import { Router } from "express";
import {createOrderController } from "../controllers/order.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";




const router=Router()


router.route("/create-order").post(verifyJwtToken,  createOrderController )


export default router;









