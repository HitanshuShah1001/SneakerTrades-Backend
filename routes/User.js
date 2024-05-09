const express = require("express");
const router = express.Router();

const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const {
  GetAllUsers,
  CheckIfUserNameEmailPhoneExists,
} = require("../FetchFactory/User");
const { DeleteUser } = require("../DeleteFactory/User");
const { UpdateUser, ResetPassword } = require("../UpdateFactory/User");

router.route("/signUp").post(UserController.UserPhoto, CreateUser.SignUp);

router.post("/login", AuthController.Login);
router.get("/", GetAllUsers);
router.post("/usernameemailphoneexists", CheckIfUserNameEmailPhoneExists);
router.delete("/delete", AuthController.Protect, DeleteUser);
router.patch(
  "/update",
  AuthController.Protect,
  UserController.UserPhoto,
  UpdateUser
);
router.patch("/resetpassword", ResetPassword);
router.route("/sendemail").post(AuthController.emailService);
module.exports = router;
