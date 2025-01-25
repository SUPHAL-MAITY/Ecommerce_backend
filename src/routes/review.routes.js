import { Router } from "express";
import { createReviewController, deleteReviewController, getAllProductReviewsController,  updateReviewController } from "../controllers/review.controller.js";








const router=Router()


router.route("/create-review").post(createReviewController)
router.route("/update-review/:reviewId").put(updateReviewController)
router.route("/getall-review/:productId").get(getAllProductReviewsController)
router.route("/delete-review").delete(deleteReviewController)



export default router;