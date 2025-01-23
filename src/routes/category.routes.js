import { Router } from "express";
import { createCategoryController } from "../controllers/category.controller.js";








const router=Router()




router.route("/create-category").post(createCategoryController)



export default router;