import {Router } from "express";
import { createOrderItemsControler } from "../controllers/orderItems.controller.js";


const router=Router();



router.route("/create-order-items").post(createOrderItemsControler)

export default router;



