import { Router } from "express";
import {createOrderController } from "../controllers/order.controller.js";




const router=Router()


router.route("/create-order").post(createOrderController )


export default router;









