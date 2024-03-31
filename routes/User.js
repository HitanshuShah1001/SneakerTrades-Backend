const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const { GetAllUsers, FetchTotalUserCoins } = require("../FetchFactory/User");
const { DeleteUser } = require("../DeleteFactory/User");
const { UpdateUserCoins, DeductUserCoins } = require("../UpdateFactory/User");
const { PaginateQuery } = require("../Utils/Pagination");

router.post("/signUp", UserController.UserPhoto, CreateUser.SignUp);
router.post("/login", AuthController.Login);
router.get("/", PaginateQuery, GetAllUsers);
router.delete("/delete", AuthController.Protect, DeleteUser);
module.exports = router;
