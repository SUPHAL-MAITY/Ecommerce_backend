import { Router } from "express";
import { createCheckoutSession, webhookController } from "../controllers/stripe.controller.js";

import bodyParser from "body-parser";





const router=Router()




router.route("/create-checkout-session").post(createCheckoutSession)
router.route("/webhook").post(bodyParser.raw({ type: "application/json" }), webhookController)



export default router;