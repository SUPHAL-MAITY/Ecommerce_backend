import { Router } from "express";
import { addAddressController, createUserController, deleteUserController, editUserController, getAllUsersController, getOwnUserController, loginUserController, searchUserController, uploadUserImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtToken,isAdmin } from "../middlewares/auth.middleware.js";






const router=Router()


router.route("/get-all-users").get(verifyJwtToken,isAdmin,getAllUsersController)
router.route("/get-own-details").get(getOwnUserController)
router.route("/search").get(searchUserController)

router.route("/signup").post(createUserController)
router.route("/login").post(loginUserController)
router.route("/edit").post(editUserController)
router.route("/delete").delete(verifyJwtToken,isAdmin,deleteUserController)
router.route("/upload-user").post(upload.single('user'),uploadUserImage)

router.route("/add-address").post(verifyJwtToken,addAddressController)






export default router;