const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");
const CreateUser = require("../CreateFactory/User");
const { GetAllUsers } = require("../FetchFactory/User");

router.post("/signUp", UserController.UserPhoto, CreateUser.SignUp);
router.post("/login", AuthController.Login);
router.get("/", GetAllUsers);
module.exports = router;
