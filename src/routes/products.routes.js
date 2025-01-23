import { Router } from "express";
import {createProductController, deleteProductController, filteredProductsController, getAllProductsController, searchedProductsController, singleProductController, updateProductController } from "../controllers/products.controller.js";







const router=Router()



router.route("/filter").get(filteredProductsController)

router.route("/search").get(searchedProductsController)
router.route("/create-product").post(createProductController)
router.route("/get-all-products").get(getAllProductsController)
router.route("/get-single-product/:productId").get(singleProductController)


router.route("/update/:productId").put(updateProductController)
router.route("/delete").delete(deleteProductController)







export default router;