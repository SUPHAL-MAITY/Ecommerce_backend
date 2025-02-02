import { Router } from "express";
import { createCheckoutSession, verifyController } from "../controllers/stripe.controller.js";







const router=Router()




router.route("/create-checkout-session").post(createCheckoutSession)
router.route("/verify-payment").get(verifyController)






export default router;