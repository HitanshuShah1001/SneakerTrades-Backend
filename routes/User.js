const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const { GetAllUsers, CheckIfUserNameExists } = require("../FetchFactory/User");
const { DeleteUser } = require("../DeleteFactory/User");
const { PaginateQuery } = require("../Utils/Pagination");
const { UpdateUser } = require("../UpdateFactory/User");

router.post("/signUp", UserController.UserPhoto, CreateUser.SignUp);
router.post("/login", AuthController.Login);
router.get("/", GetAllUsers);
router.post("/usernameexists", CheckIfUserNameExists);
router.delete("/delete", AuthController.Protect, DeleteUser);
router.patch(
  "/update",
  AuthController.Protect,
  UserController.UserPhoto,
  UpdateUser
);
module.exports = router;
