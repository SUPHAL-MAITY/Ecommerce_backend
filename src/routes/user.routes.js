import { Router } from "express";
import { createUserController, deleteUserController, editUserController, getAllUsersController, getOwnUserController, loginUserController, searchUserController } from "../controllers/user.controller.js";







const router=Router()


router.route("/get-all-users").get(getAllUsersController)
router.route("/get-own-details").get(getOwnUserController)
router.route("/search").get(searchUserController)

router.route("/signup").post(createUserController)
router.route("/login").post(loginUserController)
router.route("/edit").post(editUserController)
router.route("/delete").delete(deleteUserController)






export default router;