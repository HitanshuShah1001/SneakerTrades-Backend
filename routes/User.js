const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const { GetAllUsers, FetchTotalUserCoins } = require("../FetchFactory/User");
const { DeleteUser } = require("../DeleteFactory/User");
const { UpdateUserCoins, DeductUserCoins } = require("../UpdateFactory/User");

router.post("/signUp", UserController.UserPhoto, CreateUser.SignUp);
router.post("/login", AuthController.Login);
router.get("/", GetAllUsers);
router.get("/fetchTotalUserCoins", AuthController.Protect, FetchTotalUserCoins);
router.delete("/delete", AuthController.Protect, DeleteUser);
router.patch("/increasecoins", AuthController.Protect, UpdateUserCoins);
router.patch("/decreasecoins", AuthController.Protect, DeductUserCoins);
module.exports = router;
