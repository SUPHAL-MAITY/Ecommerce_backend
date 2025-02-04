import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtToken,isAdmin } from "../middlewares/auth.middleware.js";








const router=Router()




router.route("/create-category").post(verifyJwtToken,isAdmin, upload.single('image'),createCategoryController)
router.route("/get-all-category").get(verifyJwtToken,isAdmin,getAllCategoriesController)
router.route("/update-category").put(verifyJwtToken,isAdmin,updateCategoryController)
router.route("/delete-category").delete(verifyJwtToken,isAdmin,deleteCategoryController)


export default router;