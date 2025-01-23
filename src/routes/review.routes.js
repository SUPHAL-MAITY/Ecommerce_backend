import { Router } from "express";
import { createReviewController, deleteReviewController, getAllReviewsController, updateReviewController } from "../controllers/review.controller.js";








const router=Router()


router.route("/create-review").post(createReviewController)
router.route("/update-review/:reviewId").put(updateReviewController)
router.route("/getall-review").get(getAllReviewsController)
router.route("/delete-review").delete(deleteReviewController)



export default router;