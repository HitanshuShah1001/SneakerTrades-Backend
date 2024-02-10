const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const { GetAllUsers } = require("../FetchFactory/User");
const { DeleteUser } = require("../DeleteFactory/User");
const { UpdateUserCoins } = require("../UpdateFactory/User");

router.post("/signUp", UserController.UserPhoto, CreateUser.SignUp);
router.post("/login", AuthController.Login);
router.get("/", GetAllUsers);
router.delete("/delete", AuthController.Protect, DeleteUser);
router.patch("/increasecoins", AuthController.Protect, UpdateUserCoins);
module.exports = router;
