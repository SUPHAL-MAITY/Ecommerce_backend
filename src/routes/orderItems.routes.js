import {Router } from "express";
import { createOrderItemsControler, getRecentOrdersController, getSearchRecentorderController } from "../controllers/orderItems.controller.js";


const router=Router();


router.route("/get-recent-orders").get(getRecentOrdersController)
router.route("/search-orders").get(getSearchRecentorderController)
router.route("/create-order-items").post(createOrderItemsControler)

export default router;



