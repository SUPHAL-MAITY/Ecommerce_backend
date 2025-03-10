import { Router } from "express";
import {getAddressController, addAddressController, createUserController, deleteUserController, editUserController, getAllUsersController, getOwnUserController, loginUserController, searchUserController, uploadUserImage, getProfileImageController, logoutController, checkAuthController } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtToken,isAdmin } from "../middlewares/auth.middleware.js";






const router=Router()

router.route("/profile-image").get(getProfileImageController)
router.route("/get-user-address").get(verifyJwtToken,getAddressController)
router.route("/get-all-users").get(getAllUsersController)
router.route("/get-own-details").get(getOwnUserController)
router.route("/search-user").get(searchUserController)
router.route("/check-auth").get(checkAuthController)
router.route("/logout").get(logoutController)

router.route("/signup").post(createUserController)
router.route("/login").post(loginUserController)
router.route("/edit").post(editUserController)
router.route("/delete").delete(verifyJwtToken,isAdmin,deleteUserController)
router.route("/upload-user").post(upload.single('user'),uploadUserImage)



router.route("/add-address").post(verifyJwtToken,addAddressController)









export default router;