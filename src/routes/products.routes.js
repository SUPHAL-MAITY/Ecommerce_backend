import { Router } from "express";
import {createProductController, deleteProductController, filteredProductsController, getAllProductsController, getAllProductsWithReviewController, searchedProductsController, singleProductController, updateProductController } from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";







const router=Router()


router.route("/get-all-products-with-review").get(getAllProductsWithReviewController)
router.route("/filter").get(filteredProductsController)
router.route("/search").get(searchedProductsController)
router.route("/create-product").post( upload.array("images",4) ,createProductController)
router.route("/get-all-products").get( getAllProductsController)
router.route("/get-single-product/:productId").get(singleProductController)
router.route("/update/:productId").put(verifyJwtToken,isAdmin,updateProductController)
router.route("/delete").delete(verifyJwtToken,isAdmin,deleteProductController)







export default router;