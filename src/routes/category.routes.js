import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";







const router=Router()




router.route("/create-category").post(upload.single('image'),createCategoryController)
router.route("/get-all-category").get(getAllCategoriesController)
router.route("/update-category").put(updateCategoryController)
router.route("/delete-category").delete(deleteCategoryController)


export default router;